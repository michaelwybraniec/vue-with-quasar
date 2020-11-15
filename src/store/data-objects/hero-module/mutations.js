// import Vue from 'vue';
// import { isNil } from 'lodash';
// import { MutationTree } from 'vuex';
// import { HeroTypes } from './types';
// export const ADD_HERO = 'addHero';
// export const CLEAR_HERO = 'clearHero'
// export const API_ERROR = 'apiError'
// export const ADD_REMOVE_FAV_HERO = 'addRemoveFavHero'
// export const mutations: MutationTree<HeroTypes> = {
//   [ADD_HERO] (state, hero) {
//     this.state.hero = hero
//     const matchingHero = state.heroes.find(h => h.id === hero.id)
//     if (!matchingHero) state.heroes.push(hero) //! pushing new hero
//     else state.heroes[matchingHero] = hero //! updating existing hero
//   },
//   [CLEAR_HERO] (state, hero) {
//     state.hero = hero
//   },
//   [API_ERROR] (state, error) {
//     state.api_error = error
//   },
//   [ADD_REMOVE_FAV_HERO] (state, favoriteHero) {
//     function remove (array, element) {
//       return array.filter(el => el.id !== element.id);
//     }
//     const matchingHero = state.favorite_heroes.find(h => h.id === favoriteHero.id)
//     if (!matchingHero) {
//       favoriteHero.favorite = true
//       state.favorite_heroes.push(favoriteHero)
//     } else state.favorite_heroes = remove(state.favorite_heroes, favoriteHero)
//   },
// };
