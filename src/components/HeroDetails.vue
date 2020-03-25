<template>
  <q-card class="row">
    <div class="col-sm-4">
      <q-img :src="this.pic" style="max-height: 700px; max-width: 500px">
        <template v-slot:loading>
          <div class="text-subtitle1 text-white">
            Loading...
          </div>
        </template>
      </q-img>
    </div>

    <div class="col-sm-8">
      <!-- <div class="q-pt-md q-pb-md"> -->
      <div v-for="(value, name, index) in hero" v-bind:key="index + name">
        <div
          v-if="
            index !== 0 &&
              name !== 'name' &&
              name !== 'id' &&
              name !== 'image' &&
              name !== 'liked'
          "
          class="row"
        >
          <div class="col-4 ">
            <b>{{ name }}:</b>
          </div>

          <div class="col-8">
            <div
              class="row"
              v-for="(value, name, index) in value"
              v-bind:key="index + name"
            >
              <div class="col-3">
                <b>{{ name }}:</b>
              </div>

              <div class="col">
                <div
                  v-if="typeof value === 'string' || typeof value === 'number'"
                  class="col-4"
                >
                  {{ value }}
                </div>
                <div
                  v-else
                  v-for="(value, name, index) in value"
                  v-bind:key="index + value"
                  class="col pl-3 mr-1"
                >
                  <span v-if="typeof value === 'string'">
                    {{ value }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>

    <q-separator />

    <!-- <q-card-actions> -->
    <!-- <q-btn flat round icon="event" />
      <q-btn flat>
        5:30PM
      </q-btn>
      <q-btn flat>
        7:00PM
      </q-btn>
      <q-btn flat color="primary">
        Reserve
      </q-btn> -->
    <!-- </q-card-actions> -->
  </q-card>
</template>

<script>
// import store from "@/store/index";
import { dataService } from "../shared/data.service";
export default {
  name: "HeroDetails",
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
      tableData: [],
      expanded: false,
      favorite: {
        status: false,
        color: undefined
      },
      edit: false,
      details: false,
      message: "",
      picLoaded: undefined,
      pic: undefined,
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
      this.tableData = dataService.jsonToTable({ ...this.hero });
      this.pic = this.hero.image.url;
      this.favorite.status = this.hero.liked;
      if (this.hero.liked) this.favorite.color = "success";
      else this.favorite.color = "light";
    },
    onAddToFavorites() {
      this.favorite.status = !this.favorite.status;
      if (this.favorite.status) this.favorite.color = "success";
      else this.favorite.color = "light";
      store.dispatch("addRemoveFavHero", {
        ...this.hero
      });
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

<style lang="sass" scoped>
.my-card
  width: 1000px;
  max-width: 100vw;
</style>
