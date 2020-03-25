<template>
  <div class="justify-center q-pl-sm q-pb-sm">
    <q-card>
      <q-card-section>
        <div class="text-bold q-mb-xs">
          {{ this.clonedHero.name }}
        </div>
        <div class="row no-wrap items-center">
          <q-rating size="15px" v-model="stars" :max="5" color="primary" />
          <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
        </div>
      </q-card-section>

      <q-img :src="this.pic" style="height: 250px; max-width: 400px">
        <template v-slot:loading>
          <div class="text-subtitle1 text-white">
            Loading...
          </div>
        </template>
      </q-img>

      <q-card-actions>
        <q-btn
          icon="favorite"
          :color="this.favorite.color"
          @click="onAddToFavorites()"
        />
        <q-btn icon="visibility" color="primary" @click="heroDetails = true" />
      </q-card-actions>
    </q-card>

    <q-dialog full-width v-model="heroDetails">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ this.clonedHero.name }}
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
      stars: 3,
      clonedHero: {},
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
  async mounted() {
    await this.cloneHero();
  },
  methods: {
    async cloneHero() {
      this.clonedHero = { ...this.hero };
      console.log("cloneHero", this.clonedHero.name, this.clonedHero);
      this.favorite.status = this.clonedHero.liked;
      this.pic = this.clonedHero.image.url;
      this.favorite.color = this.clonedHero.liked ? "negative" : "primary";
      // if (this.clonedHero.liked) this.favorite.color = "success";
      // else this.favorite.color = "light";
    },
    loadPicture() {},
    onAddToFavorites() {
      this.favorite.status = !this.favorite.status;
      if (this.favorite.status) this.favorite.color = "negative";
      else this.favorite.color = "primary";
      store.dispatch("addFavoriteHero", this.clonedHero);
    },
    onEdit() {
      this.edit = !this.edit;
    },
    onDetails() {
      this.details = !this.details;
    },
    cancelHero() {
      this.$emit("cancel");
    },
    async saveHero() {
      this.$emit("save", this.clonedHero);
    }
  }
};
</script>

<style lang="sass" scoped></style>
