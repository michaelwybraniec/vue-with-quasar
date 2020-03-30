<template>
  <q-page class="q-pa-lg bg-grey-2">
    <div class="row">
      <div class="col-12 q-pa-xs">
        <form @submit.prevent.stop="onSubmit">
          <q-select
            :disable="buttons.search.loading"
            ref="search"
            use-input
            hide-selected
            fill-input
            clearable
            no-error-icon
            dense
            clear-icon="close"
            input-debounce="0"
            name="List"
            :rules="[
              val => !!val || 'Required *',
              val => val.length <= 15 || 'Max 15 character allowed.']"
            lazy-rules
            v-model="input.search"
            :options="this.filter.options"
            label="Search"
            label-color="primary"
            options-selected-class="text-deep-primary bg-info"
            @filter="filterFn"
            @new-value="newValue"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
            <template v-slot:after>
              <q-btn
                v-if="!buttons.search.loading"
                :loading="buttons.search.loading"
                :color="buttons.search.color"
                icon="search"
                label="Search"
                unelevated
                @click="onSubmit()"
              />
            </template>
          </q-select>
        </form>
      </div>
    </div>
    <div v-if="hero && !loading">
      <div v-if="hero.response !== 'success' && hero.length !== 1">
        <div v-if="hero.length" class="row flex flex-center">
          <div
            class="col-4 q-pa-sm flex flex-center"
            style="background-color: #E8E8E8; border-radius: 5px;"
          >
            <div class="row">
              <div class="col-12 text-center q-pb-sm">
                Last searched phrase:
                <b>'{{this.input.previousSearch}}'</b>,
                heroes found:
                <b>{{this.hero.length}}</b>
              </div>

              <div class="col-12 text-center flex flex-center">
                <q-pagination
                  v-model="pagination.currentPage"
                  :max="this.pagination.chunkedHeroes.length"
                  :input="true"
                ></q-pagination>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-center q-mt-lg">
          <div
            v-for="(hero, index) in this.pagination.chunkedHeroes[this.pagination.currentPage]"
            v-bind:key="index + hero"
          >
            <HeroCard :hero="hero" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row justify-center q-mt-lg">
          <div style="width: 700px; max-width: 80vw;">
            <HeroDetails :hero="hero[0]" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="no-hero absolute-center">
      <div class="text-h2 text-center">
        <q-spinner color="primary" size="3em" :thickness="2" />
      </div>
    </div>

    <div v-if="apiError && !loading" class="no-hero absolute-center">
      <div class="bg-negative text text-center text-white">
        <div>
          <p v-if="apiError">
            API err:
            <span class="bg-dark q-pa-sm q-ml-sm">{{ apiError }}</span>
          </p>
          <p v-if="this.message.error" class="g-ml-sm">
            &nbsp;&nbsp;Customized err:
            <span class="bg-dark q-pa-sm q-ml-sm">
              {{
              this.message.error
              }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import store from "../store/old-module/index";
import HeroCard from "components/HeroCard";
import HeroDetails from "components/HeroDetails";

import data from "../shared/db.json";

export default {
  name: "Search",
  components: { HeroCard, HeroDetails },
  data() {
    return {
      search: null,
      loading: false,
      filter: {
        options: data.db.heroList.map(h => h.name),
        list: data.db.heroList.map(h => h.name)
      },
      buttons: {
        search: {
          loading: false,
          color: "primary"
        }
      },
      message: {
        info: undefined,
        error: undefined,
        success: undefined
      },
      input: {
        search: null,
        previousSearch: null
      },
      favorites: {
        data: [],
        length: 0
      },
      pagination: {
        currentPage: 1,
        chunkedHeroes: []
      }
    };
  },
  watch: {
    apiError(errNew) {
      switch (errNew) {
        case "access denied":
          this.message.error = "Api access denied, try later pls !";
          break;
        case "character with given name not found":
          //! err is falling to the 2nd test on the action level, refactor function.
          this.message.error = "Hero with a given id or name not found :-(";
          break;
        default:
          this.message.error = errNew;
      }
    },
    hero(newHero) {
      let index = 0;
      for (index = 0; index < newHero.length; index += 16) {
        let myChunk = newHero.slice(index, index + 16);
        this.pagination.chunkedHeroes.push(myChunk);
      }
    }
  },
  computed: {
    hero() {
      return store.getters.getAvailableHero;
    },
    apiError() {
      return store.getters.getApiErrorMsg;
    }
  },
  methods: {
    async onSubmit() {
      this.$refs.search.validate();
      if (this.$refs.search.hasError) {
        this.formHasError = true;
      } else {
        console.log("Input:", this.input.search);
        this.input.previousSearch = this.input.search;
        if (this.input.search !== "") {
          this.message.info = "Loading...";
          this.loading = true;
          this.buttons.search.loading = true;
          this.buttons.search.disabled = true;
          this.buttons.search.color = "negative";
          await store.dispatch("getHeroAction", this.input.search);
          this.message.info = undefined;
          this.hero ? (this.message.error = undefined) : null;
          this.loading = false;
          this.buttons.search.loading = false;
          this.buttons.search.color = "primary";
        } else {
          this.message.error = "Input empty, I cannot read minds yet!";
        }
      }
    },
    filterFn(val, update, abort) {
      update(() => {
        if (val === "") {
          this.filter.options = this.filter.list;
        } else {
          const needle = val.toLowerCase();
          this.filter.options = this.filter.list.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    newValue(val, done) {
      if (val.length >= 1) {
        if (!this.filter.options.includes(val)) {
          done(val, "add-unique");
          this.input.confirm = true;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.no-hero {
  opacity: 0.8;
}
</style>
