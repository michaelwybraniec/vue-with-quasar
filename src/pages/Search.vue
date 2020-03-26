<template>
  <q-page class="q-pa-lg bg-grey-2">
    <div v-if="!loading" class="q-pt-sm" style="col">
      <form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class="q-gutter-md"
      >
        <q-input
          dense
          ref="search"
          clearable
          clear-icon="close"
          v-model="input.search"
          hint="Name or ID"
          label="Search"
          :rules="[val => val.length < 20 || 'Max 20 character allowed.']"
          lazy-rules
        >
          <template v-slot:after>
            <q-btn
              v-if="input.search"
              :loading="buttons.search.loading"
              :disable="buttons.search.loading"
              :color="buttons.search.color"
              icon="search"
              label="Search"
              unelevated
              @click="onSubmit()"
            />
          </template>
        </q-input>
      </form>
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
        <div class="row justify-center  q-mt-lg">
          <HeroCard :hero="hero" />
        </div>
      </div>
    </div>

    <div v-if="loading" class="no-hero absolute-center ">
      <div class="text-h2 text-center">
        <q-spinner color="primary" size="3em" :thickness="2" />
      </div>
    </div>

    <div v-if="apiError && !loading" class="no-hero absolute-center ">
      <div class="bg-negative text-h6 text-center text-white">
        <div>
          <p v-if="apiError">
            API err:
            <span class="bg-dark q-pa-sm q-ml-sm">{{ apiError }}</span>
          </p>
          <p v-if="this.message.error" class="g-ml-sm">
            &nbsp;&nbsp;Customized err:
            <span class="bg-dark q-pa-sm q-ml-sm">{{
              this.message.error
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import store from "../store/old-module/index";
import HeroCard from "components/HeroCard";
export default {
  name: "Heroes",
  components: {
    HeroCard
  },
  data() {
    return {
      search: null,
      loading: false,
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
    // favoriteHeroes(newFav) {
    //   this.favorites.data = newFav;

    // },
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
    // favoriteHeroes() {
    //   return store.getters.getFavoriteHeroes;
    // },
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
    }
  }
};
</script>

<style lang="scss">
.no-hero {
  opacity: 0.8;
}
</style>
