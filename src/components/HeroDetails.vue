<template>
  <q-card style=" background-color: #E8E8E8; border-radius: 5px;">
    <div class="row" style="margin: 6px; margin-top: 10px ">
      <q-card
        class="justify-center col q-mt-sm"
        :style="this.hero.favorite
          ? 'border: solid 0.12rem #1f4d7a; border-radius: 5px;'
          : 'border: solid 0.12rem white; border-radius: 5px;'
          "
      >
        <q-img
          :src="this.hero.image.url"
          style="max-width: 400px; height: 350px;"
          placeholder-src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F49.media.tumblr.com%2F6e286965a31b6bd600c4a6c83b63835f%2Ftumblr_ndz4z8v0mD1qj4315o1_500.gif&f=1&nofb=1"
        >
          <template v-slot:loading>
            <div class="text-subtitle text-white">Loading...</div>
          </template>
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-primary text-white">
              No image :-(
              <q-btn
                fab
                icon="favorite"
                glossy
                :color="this.hero.favorite ? 'negative' : 'primary'"
                @click="onAddRemoveFavHero()"
              />
            </div>
          </template>
          <template>
            <q-page-sticky position="top-left" :offset="[-230, 120]">
              <q-btn
                fab
                icon="favorite"
                :color="this.hero.favorite ? 'negative' : 'primary'"
                @click="onAddRemoveFavHero()"
              />
            </q-page-sticky>
          </template>
        </q-img>
      </q-card>

      <q-card class="col-6 q-mt-sm" style=" margin-left: 8px">
        <div class="row">
          <div class="col">
            <h4
              class="text-bold text-center"
              style="margin-block-start: 1.2em; margin-block-end: 0em"
            >{{ this.hero.name }}</h4>
            <div class="no-wrap text-center">
              <q-rating
                class="items-center"
                size="25px"
                v-model="this.hero.powerstars[this.hero.powerstars.length -1].value.rounded"
                readonly
                :max="6"
                color="primary"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half"
              />
              <span
                class="text-grey q-ml-sm q-mt-sm"
              >{{ this.hero.powerstars[this.hero.powerstars.length -1].value.precise }}</span>
            </div>

            <div style="padding-top: 22px">
              <div
                class="col no-wrap items-center"
                v-for="powerstar in this.hero.powerstars"
                v-bind:key="powerstar.name + '-powerstat'"
                style="padding-top: 3px"
              >
                <div class="row" v-if="powerstar.name !== 'total'">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-4"></div>
                      <div class="col">{{powerstar.name.toString()}}:</div>
                    </div>
                  </div>
                  <div class="col-6 text-left">
                    <q-rating
                      size="20px"
                      v-model="powerstar.value"
                      readonly
                      :max="6"
                      color="primary"
                      icon="star_border"
                      icon-selected="star"
                      icon-half="star_half"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <div class="row">
      <q-card
        class="col q-pa-sm"
        style=" margin-left: 6px; margin-right: 6px; margin-top: 2px; margin-bottom: 7px; "
      >
        <div v-for="(value, name, index) in hero" v-bind:key="index +'-details'">
          <div
            v-if="
            index !== 0 &&
              name !== 'name' &&
              name !== 'id' &&
              name !== 'image' &&
              name !== 'liked' &&
              name !== 'powerstats' && 
              name !== 'favorite' &&
              name !== 'powerstars'
          "
            class="row"
          >
            <div class="col-2" style="background-color: #E8E8E8; padding: 10px;  ">
              <b>{{ name }}:</b>
            </div>

            <div class="col" style=" padding: 10px;  border-bottom: solid #E8E8E8 10px;">
              <div
                class="row"
                v-for="(value, name, index) in value"
                v-bind:key="index + name + '-detailed-details'"
              >
                <div class="col-3">
                  <b>{{ name }}:</b>
                </div>

                <div class="col">
                  <div
                    v-if="typeof value === 'string' || typeof value === 'number'"
                    class="col-4"
                  >{{ value }}</div>
                  <div
                    v-else
                    v-for="(value, name, index) in value"
                    v-bind:key="index + value"
                    class="col pl-3 mr-1"
                  >
                    <span v-if="typeof value === 'string'">{{ value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <q-separator />
  </q-card>
</template>

<script>
// import HeroCard from "components/HeroCard";

import store from "../store/old-module/index";

import { dataService } from "../shared/data.service";
export default {
  name: "HeroDetails",
  components: {
    // HeroCard
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
      clonedHero: {},
      expanded: false,
      favorite: {
        status: false,
        color: undefined
      },
      edit: false,
      details: false,
      message: "",
      picLoaded: undefined,
      mainProps: {
        center: true,
        width: 200
      }
    };
  },
  mounted() {
    this.cloneHero();
  },
  methods: {
    cloneHero() {
      this.tableData = dataService.jsonToTable({ ...this.hero }); //example of using data.service
      this.clonedHero = { ...this.hero };
    },
    onAddRemoveFavHero() {
      this.hero.favorite = !this.hero.favorite;
      store.dispatch("addRemoveFavHero", { ...this.hero });
    }
  }
};
</script>

<style lang="sass" scoped>
</style>
