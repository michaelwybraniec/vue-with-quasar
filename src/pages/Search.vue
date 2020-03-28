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
            @new-value="submitSearch"
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
      <div v-if="hero.response !== 'success'">
        <div class="row justify-center q-mt-lg">
          <div v-for="(hero, index) in hero" v-bind:key="index + hero">
            <HeroCard :hero="hero" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row justify-center q-mt-lg">
          <HeroCard :hero="hero" />
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
import data from "../shared/db.json";

export default {
  name: "Heroes",
  components: {
    HeroCard
  },
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
        search: null
      },
      favorites: {
        data: [],
        length: 0
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
    submitSearch(val, done) {
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
