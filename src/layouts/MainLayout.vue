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
                <div
                    class="text-right fit col wrap justify-end items-start content-start q-px-lg q-pt-sm q-mb-md"
                >
                    <div class="text-h3">Heroes</div>
                    <div class="text-subtitle2">
                        A Quasar-With-Vue, Single-page, Mobile-ready WebApp.
                    </div>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            :width="250"
            :breakpoint="400"
        >
            <q-scroll-area
                style="
                    height: calc(100% - 95px);
                    margin-top: 95px;
                    border-right: 1px solid #ddd;
                "
            >
                <q-list padding>
                    <q-item-label header>Essential</q-item-label>

                    <EssentialLink
                        v-for="linkObj in essentialLinks"
                        :key="linkObj.title"
                        v-bind="linkObj"
                    />

                    <q-separator />

                    <q-item-label header>App</q-item-label>

                    <div v-for="linkObj in standardLinks" :key="linkObj.title">
                        <q-separator v-if="linkObj.separator" />
                        <StandardLink v-bind="linkObj" />
                    </div>
                </q-list>
            </q-scroll-area>


                <q-img
                    class="absolute-top avatar-image"
                    src="statics/black-square.jpg"
                    style="height: 95px;"
                >
                    <div class="absolute-bottom bg-transparent">
                        <q-avatar size="22px" class="q-mb-sm">
                            <img src="statics/avatar.jpeg" />
                        </q-avatar>
                        <div class="text-weight-bold">Michael Wybraniec</div>
                        <div style="font-size: 10px">@michaelwybraniec</div>
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

import { date } from 'quasar';
import EssentialLink from '../components/EssentialLink';
import StandardLink from '../components/StandardLink';

export default {
    name: 'MainLayout',

    components: {
        EssentialLink,
        StandardLink
    },

    data() {
        return {
            leftDrawerOpen: false,
            essentialLinks: [
                {
                    title: 'Github',
                    caption: '/michaelwybraniec',
                    icon: 'code',
                    link: 'https://github.com/michaelwybraniec',
                    separator: false
                },
                {
                    title: 'Info',
                    caption: '/technology',
                    icon: 'info',
                    link: '/info',
                    separator: false
                }
            ],
            standardLinks: [
                {
                    title: 'Search',
                    icon: 'search',
                    link: '/',
                    separator: false
                },
                {
                    title: 'Favorites',
                    icon: 'favorite',
                    link: '/favorites',
                    separator: false
                },

            ]
        };
    },
    computed: {
        todaysDate() {
            let timeStamp = Date.now();
            return date.formatDate(timeStamp, 'dddd D MMMM');
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
