<template>
    <q-item clickable exact :to="link">
        <q-item-section v-if="icon" avatar>
            <q-icon :name="icon" />
        </q-item-section>

        <q-item-section>
            <q-item-label>
                {{ title }}

                <q-badge
                    v-if="title === 'Search' && hero.length"
                    align="middle"
                    color="primary"
                >
                    <b>
                        {{ hero.length }}
                    </b>
                </q-badge>

                <q-badge
                    v-if="title === 'Favorites' && favoriteHeroes.length"
                    align="middle"
                    color="primary"
                >
                    <b>
                        {{ favoriteHeroes.length }}
                    </b>
                </q-badge>
            </q-item-label>
            <!-- <q-item-label caption>
        {{ caption }}
      </q-item-label>-->
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
