<template>
    <q-card
        class="row q-pa-sm flex flex-center"
        :style="
            this.hero.favorite
                ? 'background-color: #1f4d7a; border-radius: 6px;'
                : 'background-color: #e8e8e8; border-radius: 6px;'
        "
    >
        <q-img
            class="col-12 col-md-5 flex flex-center"
            :src="this.hero.image.url"
            placeholder-src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F49.media.tumblr.com%2F6e286965a31b6bd600c4a6c83b63835f%2Ftumblr_ndz4z8v0mD1qj4315o1_500.gif&f=1&nofb=1"
            style="max-width: 720px; height: 368px; border-radius: 6px;"
        >
            <template v-slot:loading>
                <div class="text-subtitle text-white">Loading...</div>
            </template>
            <template v-slot:error>
                <div
                    class="absolute-full flex flex-center bg-primary text-white"
                >
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
                <q-page-sticky style="border-radius: 6px;">
                    <q-btn
                        fab
                        icon="favorite"
                        :color="this.hero.favorite ? 'negative' : 'primary'"
                        @click="onAddRemoveFavHero()"
                    />
                </q-page-sticky>
            </template>
        </q-img>

        <q-card
            class="col-12 col-md-7 flex-center q-pt-xl q-pb-xl"
            style="border-radius: 6px;"
        >
            <div class="row">
                <div class="col">
                    <h4
                        class="text-bold text-center"
                        style="
                            margin-block-start: 0.6em;
                            margin-block-end: 0.7em;
                        "
                    >
                        {{ this.hero.name }}
                    </h4>
                    <div class="no-wrap text-center">
                        <q-rating
                            class="items-center"
                            size="25px"
                            v-model="
                                this.hero.powerstars[
                                    this.hero.powerstars.length - 1
                                ].value.rounded
                            "
                            readonly
                            :max="6"
                            color="primary"
                            icon="star_border"
                            icon-selected="star"
                            icon-half="star_half"
                        />
                        <span class="text-grey q-ml-sm q-mt-sm">{{
                            this.hero.powerstars[
                                this.hero.powerstars.length - 1
                            ].value.precise
                        }}</span>
                    </div>

                    <div style="padding-top: 22px;" class="flex-center">
                        <div
                            class="col no-wrap items-center flex-center"
                            v-for="powerstar in this.hero.powerstars"
                            v-bind:key="powerstar.name + '-powerstat'"
                            style="padding-top: 3px;"
                        >
                            <div class="row" v-if="powerstar.name !== 'total'">
                                <div class="col-12 col-sm-4">
                                    <div class="row">
                                        <div class="col-2 col-sm-7"></div>
                                        <div class="col">
                                            {{ powerstar.name.toString() }}:
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-8 flex flex-center">
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

        <q-card class="col q-pa-sm q-mt-sm" style="border-radius: 6px;">
            <div
                v-for="(value, name, index) in hero"
                v-bind:key="index + value + '-details'"
            >
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
                    <div
                        class="col-12 col-md-2"
                        style="background-color: #e8e8e8; padding: 10px;"
                    >
                        <b>{{ name }}:</b>
                    </div>

                    <div
                        class="col"
                        style="
                            padding: 10px;
                            border-bottom: solid #e8e8e8 10px;
                        "
                    >
                        <div
                            class="row"
                            v-for="(value, name, index) in value"
                            v-bind:key="index + name + '-detailed-details'"
                        >
                            <div class="col-12 col-sm-4 col-md-3">
                                <b>{{ name }}:</b>
                            </div>

                            <div class="col-12 col-sm-8 col-md-9">
                                <div
                                    v-if="
                                        typeof value === 'string' ||
                                        typeof value === 'number'
                                    "
                                    class="col-6 col-md-4"
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
        </q-card>
    </q-card>
</template>

<script>
import store from '../store/old-module/index';

export default {
    name: 'HeroDetails',
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
    methods: {
        onAddRemoveFavHero() {
            this.hero.favorite = !this.hero.favorite;
            store.dispatch('addRemoveFavHero', { ...this.hero });
        }
    }
};
</script>

<style lang="sass" scoped></style>
