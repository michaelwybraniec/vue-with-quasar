<template>
  <div class="justify-center q-pl-md q-pb-md">
    <q-card>
      <q-card-section>
        <div class="text-bold text-center q-mb-xs">
          {{ this.hero.name }}
        </div>
        <div class="row no-wrap items-center">
          <q-rating
            size="25px"
            v-model="stars.rounded"
            :max="6"
            color="primary"
          />
          <span class=" text-grey q-ml-sm q-mt-sm">{{ stars.precise }}</span>
        </div>
      </q-card-section>
      <q-img :src="this.hero.image.url" style="height: 250px; max-width: 400px">
        <template v-slot:loading>
          <div class="text-subtitle1 text-white">
            Loading...
          </div>
        </template>
      </q-img>
      <q-card-actions>
        <q-btn
          icon="favorite"
          :color="
            this.hero.favorite
              ? 'negative'
              : this.favorite.status
              ? 'negative'
              : 'primary'
          "
          @click="onAddRemoveFavHero()"
        />
        <q-btn icon="visibility" color="primary" @click="heroDetails = true" />
      </q-card-actions>
    </q-card>
    <q-dialog full-width v-model="heroDetails">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ this.hero.name }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <HeroDetails :hero="hero" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import store from "../store/old-module/index";
import HeroDetails from "./HeroDetails";
export default {
  name: "HeroCard",
  components: {
    HeroDetails
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    hero: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      stars: {
        rounded: 0,
        precise: 0
      },
      heroDetails: false,
      expanded: false,
      favorite: {
        status: false,
        color: undefined
      },
      edit: false,
      details: false,
      message: "",
      picLoaded: undefined,
      pic: "",
      mainProps: {
        center: true,
        width: 200
      }
    };
  },
  watch: {
    loadStars(newStars) {
      this.stars = newStars;
    }
  },
  computed: {
    loadStars() {
      return this.getStars();
    }
  },
  methods: {
    getStars() {
      let starValue = 100 / 6;
      let total = 0;
      for (let power in this.hero.powerstats) {
        let value = this.hero.powerstats[power];
        let average = isNaN(value) ? 0 : value / starValue;
        total += average;
      }
      this.stars.rounded = Math.round(total / 6);
      this.stars.precise = (total / 6).toFixed(2);
    },
    onAddRemoveFavHero() {
      this.favorite.status = !this.favorite.status;
      store.dispatch("addRemoveFavHero", { ...this.hero });
    },
    onDetails() {
      this.details = !this.details;
    }
  }
};
</script>

<style lang="sass" scoped></style>
