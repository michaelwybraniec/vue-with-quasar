// import axios from "axios";
// import { API } from "./config";

//! This data service did not return the obj re.data to the vuex actions.
//! Therefore store:actions:getHeroAction: calls api itself currently.
// const get = async id => {
//   const { herokuCors, url, key } = API.heroes;
//   const request = `${herokuCors}/${url}/${key}/${id}`;
//   await axios.get(request)
//     .then(res => {
//       return res.data
//     })
//     .catch(err => {
//       console.error(err);
//       return null;
//     })
// };

const jsonToTable = data => {
    //! solution to use shared utils to convert JSON to Quasar table
    console.log('shared => data.service.js => jsonToTable()', data);
};

const favoriteHero = (heroId, state) => {
    return state.favorite_heroes.find(h => {
        if (h.id === heroId) return true;
        else false;
    });
};

const statsToStars = powerstats => {
    let powerstars = [];
    let starValue = 100 / 6;
    let total = 0;
    for (let powerstat in powerstats) {
        let value = powerstats[powerstat];
        value = isNaN(value) ? 0 : value / starValue;
        total += Number(value);
        powerstars.push({
            name: powerstat,
            value: Number(value.toFixed(1))
        });
    }
    powerstars.push({
        name: 'total',
        value: {
            rounded: Number((total / 6).toFixed(1)),
            precise: (total / 6).toFixed(2)
        }
    });

    // console.log("statsToStars", " \n powerstats", powerstats, "\n powerstars", powerstars)

    return powerstars;
};

export const dataService = {
    // get,
    jsonToTable,
    statsToStars,
    favoriteHero
};
