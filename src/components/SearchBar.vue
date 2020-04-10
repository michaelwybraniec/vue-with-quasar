<template>
    <form @submit.prevent.stop="onSubmit">
        <div class="row q-pt-sm">
            <div class="col-12 col-sm-8 col-md-9 col-lg-10 q-pa-sm">
                <q-linear-progress
                    v-if="buttons.search.loading"
                    indeterminate
                />
                <q-linear-progress v-if="!buttons.search.loading" value="102" />
                <q-select
                    dark
                    dense
                    borderless
                    text-color="white"
                    :disable="buttons.search.loading"
                    ref="search"
                    use-input
                    hide-selected
                    fill-input
                    clearable
                    no-error-icon
                    clear-icon="close"
                    input-debounce="0"
                    name="List"
                    :rules="[
                        val => !!val || 'Required *',
                        val => val.length <= 15 || 'Max 15 character allowed.'
                    ]"
                    lazy-rules
                    v-model="input.search"
                    :options="this.filter.options"
                    label="Search"
                    label-color="primary"
                    options-selected-class="text-deep-primary bg-info"
                    @filter="filterFn"
                    @new-value="newValue"
                    class="col"
                >
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                No results
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </div>
            <div class="col-12 col-sm-4 col-md-3 col-lg-2 q-pa-sm q-pb-lg">
                <q-btn
                    style="padding: 5px; background-color: #e8e8e8; border-radius: 1px;"
                    class="full-width"
                    :loading="loading"
                    :disable="buttons.search.loading"
                    :color="buttons.search.color"
                    icon="search"
                    unelevated
                    @click="onSubmit()"
                />
            </div>
        </div>
    </form>
</template>

<script>
import store from '../store/old-module/index';
import data from '../shared/db.json';

export default {
    name: 'Search',
    data() {
        return {
            search: null,
            loading: false,
            filter: {
                options: data.db.heroList.map(h => h.name),
                list: data.db.heroList.map(h => h.name)
            },
            buttons: {
                search: {
                    loading: false,
                    color: 'primary'
                }
            },
            message: {
                info: undefined,
                error: undefined,
                success: undefined
            },
            input: {
                search: null,
                previousSearch: null
            },
            favorites: {
                data: [],
                length: 0
            },
            pagination: {
                currentPage: 1,
                itemsPerPageOptions: [5, 10, 50],
                chunkedHeroes: []
            },
            itemsPerPage: 20,
            sort: {
                attribute: 'name',
                inverse: false
            }
        };
    },
    watch: {
        apiError(errNew) {
            switch (errNew) {
                case 'access denied':
                    this.message.error = 'Api access denied, try later pls !';
                    break;
                case 'character with given name not found':
                    //! err is falling to the 2nd test on the action level, refactor function.
                    this.message.error =
                        'Hero with a given id or name not found :-(';
                    break;
                default:
                    this.message.error = errNew;
            }
        },
        heroes(newHero) {
            let index = 0;
            for (
                index = 0;
                index < newHero.length;
                index += this.itemsPerPage
            ) {
                let myChunk = newHero.slice(index, index + this.itemsPerPage);
                this.pagination.chunkedHeroes.push(myChunk);
            }
        },
        itemsPerPage(newItemsPerPage) {
            let index = 0;
            let newChunkedArray = [];
            for (
                index = 0;
                index < this.heroes.length;
                index += newItemsPerPage
            ) {
                let myChunk = this.heroes.slice(index, index + newItemsPerPage);
                newChunkedArray.push(myChunk);
            }
            this.pagination.chunkedHeroes = newChunkedArray;
        }
    },
    computed: {
        heroes() {
            return store.getters.getAvailableHero;
        },
        apiError() {
            return store.getters.getApiErrorMsg;
        }
    },
    methods: {
        async onSubmit() {
            this.$refs.search.validate();
            if (this.$refs.search.hasError) {
            } else {
                console.log('Input:', this.input.search);
                this.input.previousSearch = this.input.search;
                if (this.input.search !== '') {
                    this.message.info = 'Loading...';
                    this.loading = true;
                    this.buttons.search.loading = true;
                    this.buttons.search.disabled = true;
                    this.buttons.search.color = 'grey-8';
                    await store.dispatch('getHeroAction', this.input.search);
                    this.message.info = undefined;
                    this.heroes ? (this.message.error = undefined) : null;
                    this.loading = false;
                    this.buttons.search.loading = false;
                    this.buttons.search.color = 'primary';
                } else {
                    this.message.error =
                        'Input empty, I cannot read minds yet!';
                }
            }
        },
        filterFn(val, update) {
            update(() => {
                if (val === '') {
                    this.filter.options = this.filter.list;
                } else {
                    const needle = val.toLowerCase();
                    this.filter.options = this.filter.list.filter(
                        v => v.toLowerCase().indexOf(needle) > -1
                    );
                }
            });
        },
        newValue(val, done) {
            if (val.length >= 1) {
                if (!this.filter.options.includes(val)) {
                    done(val, 'add-unique');
                    this.input.confirm = true;
                }
            }
        },
        onSort(attribute) {
            this.sort.attribute = attribute;
            this.sort.inverse = !this.sort.inverse;
            this.pagination.chunkedHeroes[
                this.pagination.currentPage
            ] = this.sortByAttribute(
                this.pagination.chunkedHeroes[this.pagination.currentPage],
                attribute,
                this.sort.inverse
            );
        },
        sortByAttribute(array, attribute, inverse) {
            if (attribute === 'name') {
                return array.sort(function(a, b) {
                    return a.name === b.name
                        ? 0
                        : inverse
                        ? +(a.name > b.name) || -1
                        : +(a.name < b.name) || -1;
                });
            } else if (attribute === 'stars') {
                return array.sort(function(a, b) {
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
.no-hero {
    opacity: 0.8;
}
</style>
