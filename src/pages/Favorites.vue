<template>
  <q-page class="q-pa-lg bg-grey-2">
    <div v-if="this.heroes.data">
      <div class="row justify-center q-mt-lg">
        <div v-for="(hero, index) in heroes.data" v-bind:key="index + hero">
          <HeroCard :hero="hero" />
        </div>
      </div>
    </div>

    <div v-if="!this.heroes.data.length" class="no-favorite-heroes absolute-center">
      <div class="text-h6 text-primary text-center">
        Click
        <q-btn class="q-ml-sm q-mr-sm" color="primary" unelevated icon="search" to="/">Search</q-btn>to keep your first hero!
      </div>
    </div>
  </q-page>
</template>

<script>
import store from "../store/old-module/index";
import HeroCard from "components/HeroCard";
export default {
  name: "Heroes",
  data() {
    return {
      heroes: {
        data: []
      }
    };
  },
  components: {
    HeroCard
  },
  watch: {
    favoriteHeroes(newFav, oldFav) {
      this.heroes.data = newFav ? newFav : oldFav;
    }
  },
  computed: {
    favoriteHeroes() {
      this.getFavoriteHeroes(store.getters.getFavoriteHeroes);
      return store.getters.getFavoriteHeroes;
    }
  },
  methods: {
    getFavoriteHeroes(storedFavHeroes) {
      this.heroes.data = storedFavHeroes;
    }
  }
};
</script>

<style lang="scss">
.my-card {
  height: 10px;
  max-width: 350px;
}
.no-favorite-heroes {
  opacity: 0.6;
}
</style>
