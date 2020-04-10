<template>
    <q-layout view="hHh Lpr fFf" style="height: 300px" class="shadow-2">
        <q-header elevated reveal class="bg-dark">
            <q-toolbar>
                <q-btn flat @click="drawer = !drawer" round dense icon="menu" />

                <div
                    class="text-right fit row wrap justify-end items-start content-start q-px-lg q-pt-sm  "
                >
                    <div class="col-12 col-md-5 col-lg-8 q-pr-sm q-mt-sm">
                        <img
                            style="height: 40px; max-width: 400px"
                            src="statics/icons/inova-heroes.png"
                            alt="INOVA-HEROES."
                        />
                        <div style="color: #787878; font-size: 10px">
                            A Quasar-with-vue framework, single-page,
                            mobile-ready WebApp
                        </div>
                    </div>
                    <div class="col-12  col-md-7 col-lg-4 q-pt-sm">
                        <SearchBar />
                    </div>
                </div>
            </q-toolbar>
        </q-header>

        <q-footer flat reveal class="bg-dark">
            <div class="q-pa-sm">Copyright © {{ todaysDate }} ver 2.0</div>
        </q-footer>

        <q-drawer
            v-model="drawer"
            show-if-above
            :mini="miniState"
            @mouseover="miniState = false"
            @mouseout="miniState = true"
            mini-to-overlay
            :width="200"
            :breakpoint="400"
            bordered
            content-class="bg-grey-4"
        >
            <q-scroll-area class="fit">
                <q-list padding>
                    <div v-for="linkObj in standardLinks" :key="linkObj.title">
                        <q-separator v-if="linkObj.separator" />
                        <StandardLink v-bind="linkObj" />
                    </div>

                    <q-separator />

                    <EssentialLink
                        v-for="linkObj in essentialLinks"
                        :key="linkObj.title"
                        v-bind="linkObj"
                    />
                </q-list>
            </q-scroll-area>

            <q-img
                class="absolute-bottom avatar-image"
                src="../statics/black-square.jpg"
                style="height: 36px;"
            >
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
import SearchBar from '../components/SearchBar';

export default {
    name: 'MainLayout',

    components: {
        StandardLink,
        EssentialLink,
        SearchBar
    },

    data() {
        return {
            drawer: false,
            miniState: true,
            essentialLinks: [
                {
                    title: 'BitBucket',
                    caption: '/vue-with-quasar',
                    icon: 'bitbucket',
                    link:
                        'https://bitbucket.org/michaelwybraniec/vue-with-quasar/src/master/',
                    separator: false
                },
                {
                    title: 'Github',
                    caption: '/michaelwybraniec',
                    icon: 'github',
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
                    //caption: 'by a letter or select one.',
                    icon: 'search',
                    link: '/',
                    separator: false
                },
                {
                    title: 'Favorites',
                    //caption: 'list of your selection..',
                    icon: 'favorite',
                    link: '/favorites',
                    separator: false
                }
            ]
        };
    },
    computed: {
        todaysDate() {
            let timeStamp = Date.now();
            return date.formatDate(timeStamp, 'YYYY');
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
