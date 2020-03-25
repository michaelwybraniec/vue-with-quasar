<template>
  <q-layout view="lHh Lpr lFf">
    <q-header flat class="bg-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Heroes</div>
        <div class="text-subtitle2">
          A Quassar-Vue Framework App.
        </div>
      </div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="400"
    >
      <q-scroll-area
        style="height: calc(100% - 185px); margin-top: 185px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item-label header>
            Essential Links
          </q-item-label>

          <EssentialLink
            v-for="linkObj in essentialLinks"
            :key="linkObj.title"
            v-bind="linkObj"
          />

          <q-separator />

          <q-item-label header>
            Menu
          </q-item-label>

          <div v-for="linkObj in standardLinks" :key="linkObj.title">
            <q-separator v-if="linkObj.separator" />
            <StandardLink v-bind="linkObj" />
          </div>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top avatar-image"
        src="statics/black-square.jpg"
        style="height: 185px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="statics/avatar.jpeg" />
          </q-avatar>
          <div class="text-weight-bold">Michael Wybraniec</div>
          <div>@michaelwybraniec</div>
        </div>
      </q-img>
    </q-drawer>

    <!-- <div class="text-subtitle2">{{ todaysDate }}</div> -->

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";
import EssentialLink from "components/EssentialLink";
import StandardLink from "components/StandardLink";

export default {
  name: "MainLayout",

  components: {
    EssentialLink,
    StandardLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Github",
          caption: "/michaelwybraniec",
          icon: "code",
          link: "https://github.com/michaelwybraniec",
          separator: true
        }
      ],
      standardLinks: [
        {
          title: "Search",
          icon: "search",
          link: "/",
          separator: false
        },
        {
          title: "Favorites",
          icon: "favorite",
          link: "/favorites",
          separator: false
        }
        // {
        //   title: "Help",
        //   icon: "help",
        //   link: "/help",
        //   separator: true
        // }
      ]
    };
  },
  computed: {
    todaysDate() {
      let timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM");
    }
  }
};
</script>

<style lang="scss">
.avatar-image {
  height: 100%;
  z-index: -1;
}
</style>
