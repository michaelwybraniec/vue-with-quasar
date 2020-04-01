<template>
  <div class="justify-center q-pl-xs q-pb-xs q-pt-xs q-pr-xs">
    <q-card
      :style="
        this.hero.favorite
          ? 'border: solid 0.12rem #1f4d7a; border-radius: 5px;'
          : 'border: solid 0.12rem white; border-radius: 5px;'
      "
    >
      <q-card-section>
        <div class="text-bold text-center q-mb-xs">{{ this.hero.name }}</div>
        <div class="row no-wrap items-center">
          <q-rating
            size="25px"
            v-model="this.hero.powerstars[this.hero.powerstars.length - 1].value.rounded"
            readonly
            :max="6"
            color="primary"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
          />
          <span
            class="text-grey q-ml-sm q-mt-sm"
          >{{ this.hero.powerstars[this.hero.powerstars.length - 1].value.precise }}</span>
        </div>
      </q-card-section>
      <q-img
        :src="this.hero.image.url"
        style="
        height: 200px; 
        max-width: 210px;
        border-radius: 5px;
        margin: 8px
        "
        placeholder-src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F49.media.tumblr.com%2F6e286965a31b6bd600c4a6c83b63835f%2Ftumblr_ndz4z8v0mD1qj4315o1_500.gif&f=1&nofb=1"
      >
        <template v-slot:loading>
          <div class="text-subtitle text-white">Loading...</div>
        </template>
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-primary text-white">No image :-(</div>
        </template>
      </q-img>

      <q-card-actions>
        <q-btn
          icon="favorite"
          unelevated
          :color="this.hero.favorite ? 'negative' : 'primary'"
          @click="onAddRemoveFavHero()"
        />
        <q-btn icon="visibility" unelevated color="primary" @click="heroDetails = true" />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="heroDetails">
      <q-card style="width: 750px; max-width: 100vw;">
        <q-card-section>
          <div class="text-h6">Details for: {{ this.hero.name }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <HeroDetails :hero="hero" />
        </q-card-section>
        <q-card-actions align="center" class="q-mb-md">
          <q-btn class="q-pa-ms" label="OK" color="primary" v-close-popup />
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
  methods: {
    onAddRemoveFavHero() {
      this.hero.favorite = !this.hero.favorite;
      store.dispatch("addRemoveFavHero", { ...this.hero });
    },
    onDetails() {
      this.details = !this.details;
    }
  }
};
</script>

<style lang="sass" scoped></style>
