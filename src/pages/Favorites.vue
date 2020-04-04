<template>
    <q-page class="q-pa-lg bg-grey-2">
        <div v-if="this.heroes.data.length">
            <div class="text-center q-pb-sm">Favorites:</div>

            <div class="row flex flex-center">
                <div
                    class="col-10 q-pa-md flex flex-center"
                    style="background-color: #e8e8e8; border-radius: 5px;"
                >
                    <q-btn-group unelevated>
                        <q-btn
                            unelevated
                            label="Name"
                            @click="onSort('name')"
                            :color="
                                this.sort.attribute === 'name'
                                    ? 'negative'
                                    : 'primary'
                            "
                        >
                            <div v-if="this.sort.attribute === 'name'">
                                <q-icon
                                    v-if="this.sort.inverse"
                                    name="keyboard_arrow_up"
                                />
                                <q-icon
                                    v-if="!this.sort.inverse"
                                    name="keyboard_arrow_down"
                                />
                            </div>
                        </q-btn>

                        <q-btn
                            unelevated
                            label="Stars"
                            @click="onSort('stars')"
                            :color="
                                this.sort.attribute === 'stars'
                                    ? 'negative'
                                    : 'primary'
                            "
                        >
                            <div v-if="this.sort.attribute === 'stars'">
                                <q-icon
                                    v-if="this.sort.inverse"
                                    name="keyboard_arrow_up"
                                />
                                <q-icon
                                    v-if="!this.sort.inverse"
                                    name="keyboard_arrow_down"
                                />
                            </div>
                        </q-btn>
                    </q-btn-group>

                    <!-- {{this.sort}} -->
                </div>
            </div>

            <div class="row justify-center q-mt-lg">
                <div
                    v-for="(hero, index) in heroes.data"
                    v-bind:key="index + hero"
                >
                    <HeroCard :hero="hero" />
                </div>
            </div>
        </div>

        <div
            v-if="!this.heroes.data.length"
            class="no-favorite-heroes absolute-center"
        >
            <div class="text-h6 text-primary text-center">
                Click
                <q-btn
                    class="q-ml-sm q-mr-sm"
                    color="primary"
                    unelevated
                    icon="search"
                    to="/"
                    >Search</q-btn
                >to keep your first hero!
            </div>
        </div>
    </q-page>
</template>

<script>
import store from '../store/old-module/index';
import HeroCard from '../components/HeroCard';
export default {
    name: 'Heroes',
    data() {
        return {
            heroes: {
                data: []
            },
            sort: {
                attribute: 'name',
                inverse: false
            }
        };
    },
    components: {
        HeroCard
    },
    watch: {
        favoriteHeroes(newFav, oldFav) {
            this.heroes.data = newFav ? newFav : oldFav;
        }
    },
    computed: {
        favoriteHeroes() {
            return this.getFavoriteHeroes(store.getters.getFavoriteHeroes);
        }
    },
    methods: {
        getFavoriteHeroes(storedFavHeroes) {
            this.heroes.data = storedFavHeroes;
        },
        onSort(attribute) {
            console.log(
                'before',
                this.heroes.data.map((h) => h.id)
            );
            this.sort.attribute = attribute;
            this.sort.inverse = !this.sort.inverse;
            this.heroes.data = this.sortByAttribute(
                this.heroes.data,
                attribute,
                this.sort.inverse
            );
            console.log(
                'after',
                this.heroes.data.map((h) => h.id)
            );
        },
        sortByAttribute(array, attribute, inverse) {
            if (attribute === 'name') {
                return array.sort(function (a, b) {
                    return a.name === b.name
                        ? 0
                        : inverse
                        ? +(a.name > b.name) || -1
                        : +(a.name < b.name) || -1;
                });
            } else if (attribute === 'stars') {
                return array.sort(function (a, b) {
                    return a.powerstars[6].value.rounded ===
                        b.powerstars[6].value.rounded
                        ? 0
                        : inverse
                        ? +(
                              a.powerstars[6].value.rounded <
                              b.powerstars[6].value.rounded
                          ) || -1
                        : +(
                              a.powerstars[6].value.rounded >
                              b.powerstars[6].value.rounded
                          ) || -1;
                });
            }
        }
    }
};
</script>

<style lang="scss">
// .my-card {
//   height: 10px;
//   max-width: 350px;
// }
.no-favorite-heroes {
    opacity: 0.6;
}
</style>
