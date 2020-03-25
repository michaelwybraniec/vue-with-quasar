

const mutations = {
  [ADD_HERO] (state, hero) {
    this.state.hero = hero
    const matchingHero = state.heroes.find(h => h.id === hero.id)
    if (!matchingHero) state.heroes.push(hero) //! pushing new hero
    else state.heroes[matchingHero] = hero //! updating existing hero
  },
  [CLEAR_HERO] (state, hero) {
    state.hero = hero
  },
  [API_ERROR] (state, error) {
    state.api_error = error
  },
  [ADD_ & _REMOVE_FAV_HERO] (state, favoriteHero) {
    function remove (array, element) {
      return array.filter(el => el.id !== element.id);
    }
    const matchingHero = state.favorite_heroes.find(h => h.id === favoriteHero.id)
    if (!matchingHero) state.favorite_heroes.push(favoriteHero)
    else state.favorite_heroes = remove(state.favorite_heroes, favoriteHero)
  }
}

export function mutations (/* state */) {
  mutations
}
