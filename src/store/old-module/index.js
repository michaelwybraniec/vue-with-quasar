import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import availableHeroes from "../../shared/db.json"
import { API } from '../../shared/config'
import { dataService } from "../../shared/data.service";
import { ADD_HERO, CLEAR_HERO, API_ERROR, ADD_REMOVE_FAV_HERO } from './mutation-types'

Vue.use(Vuex)

const state = () => ({
  availableHeroes: availableHeroes,
  hero: [],
  heroes: [],
  api_error: undefined,
  favorite_heroes: []
})

const mutations = {
  [ADD_HERO] (state, hero) {
    this.state.hero = hero
    const matchingHero = state.heroes.find(h => h.id === hero.id)
    if (!matchingHero) state.heroes.push(hero) //? pushing new hero
    else state.heroes[matchingHero] = hero //? updating existing hero
  },
  [CLEAR_HERO] (state, hero) {
    state.hero = hero
  },
  [API_ERROR] (state, error) {
    state.api_error = error
  },
  [ADD_REMOVE_FAV_HERO] (state, favoriteHero) {
    function remove (array, element) {
      return array.filter(el => el.id !== element.id);
    }
    const matchingHero = state.favorite_heroes.find(h => h.id === favoriteHero.id)
    if (!matchingHero) {
      favoriteHero.favorite = true
      state.favorite_heroes.push(favoriteHero)
    } else state.favorite_heroes = remove(state.favorite_heroes, favoriteHero)
  }
}

const actions = {
  async getHeroAction (context, input) {
    const { herokuCors, url, key } = API.heroes
    const reqByNameUrl = `${herokuCors}/${url}/${key}/search/${input}`
    const reqByIdUrl = `${herokuCors}/${url}/${key}/${input}`
    // reqByNameUrl = `${url}/${key}/search/${input}`
    // reqByIdUrl = `${url}/${key}/${input}`
  
    try {
      const heroById = await axios.get(reqByIdUrl)
      if (!heroById.data.error) {
        if (heroById.data.response === 'error') {
          context.commit(API_ERROR, heroById.data.error)
          context.commit(CLEAR_HERO, undefined)
        } else {
          heroById.data.favorite = !!dataService.favoriteHero(heroById.data.id, this.state)
          heroById.data.powerstars = dataService.statsToStars(heroById.data.powerstats)
          context.commit(API_ERROR, undefined)
          context.commit(ADD_HERO, heroById.data)
        }
      } else if (heroById.data.error) {
        const heroByName = await axios.get(reqByNameUrl)
        if (heroByName.data.response === 'error') {
          context.commit(API_ERROR, heroByName.data.error)
          context.commit(CLEAR_HERO, undefined)
        } else {
          heroByName.data.results.forEach(h => {
            h.favorite = !!dataService.favoriteHero(h.id, this.state);
            h.powerstars = dataService.statsToStars(h.powerstats)
          })
          context.commit(API_ERROR, undefined)
          context.commit(ADD_HERO, heroByName.data.results)
        }
      } else {
        context.commit(CLEAR_HERO, undefined)
        context.commit(API_ERROR, 'getHeroAction else case error')
      }
    } catch (err) {
      context.commit(CLEAR_HERO, undefined)
      context.commit(API_ERROR, err)
    }
  },
  clearHeroAction (context) {
    context.commit(CLEAR_HERO, undefined)
  },
  addRemoveFavHero (context, heroId) {
    const heroFound = context.state.favorite_heroes.find(h => {
      h.id === heroId
    })
    if (!heroFound) context.commit(ADD_REMOVE_FAV_HERO, heroId)
    else console.warn("addRemoveFavHero: HERO EXISTS!")
  }
}

const getters = {
  getAvailableHeroesList: state => state.availableHeroes,
  getAvailableHero: state => state.hero,
  getApiErrorMsg: state => state.api_error,
  getFavoriteHeroes: state => state.favorite_heroes
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
