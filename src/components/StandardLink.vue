<template>
    <q-item clickable exact :to="link">
        <q-item-section v-if="icon" avatar>
            <q-icon :name="icon" />
            <q-badge
                v-if="title === 'Search' && hero.length"
                align="middle"
                color="white"
                text-color="black"
                floating
            >
                <b>
                    {{ hero.length }}
                </b>
            </q-badge>

            <q-badge
                v-if="title === 'Favorites' && favoriteHeroes.length"
                align="middle"
                color="white"
                text-color="black"
                floating
            >
                <b>
                    {{ favoriteHeroes.length }}
                </b>
            </q-badge>
        </q-item-section>

        <q-item-section>
            <q-item-label>
                {{ title }}
            </q-item-label>
            <div style="padding: 0; font-size: 10px; color: gray">
                {{ caption }}
            </div>
        </q-item-section>
    </q-item>
</template>

<script>
import store from '../store/old-module/index';

export default {
    name: 'EssentialLink',
    computed: {
        hero() {
            return store.getters.getAvailableHero;
        },
        favoriteHeroes() {
            return store.getters.getFavoriteHeroes;
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },

        caption: {
            type: String,
            default: ''
        },

        link: {
            type: String,
            default: '#'
        },

        icon: {
            type: String,
            default: ''
        }
    }
};
</script>
