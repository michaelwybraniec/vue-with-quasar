<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
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
        <div class="text-subtitle2">{{ todaysDate }}</div>
      </div>
      <q-img src="statics/heroes.jpg" class="headder-image absolute-top" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="height: calc(100% - 206px); margin-top: 206px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item-label header class="text-grey-8">
            Essential Links
          </q-item-label>

          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
          <q-item-label header class="text-grey-8">
            Menu
          </q-item-label>

          <StandardLink
            v-for="link in standardLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="statics/heroes.jpg"
        style="height: 206px"
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
          link: "https://github.com/michaelwybraniec"
        }
      ],
      standardLinks: [
        {
          title: "Search",
          icon: "search",
          link: "/"
        },
        {
          title: "Favorites",
          icon: "favorite",
          link: "/favorites"
        },
        {
          title: "Help",
          icon: "help",
          link: "/help"
        }
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
.headder-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
</style>
