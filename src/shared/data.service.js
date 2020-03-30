//! This data service did not return the obj re.data to the vuex actions.
//! Therefore store:actions:getHeroAction: calls api itself currently.

import axios from "axios";
import { API } from "./config";

const get = async id => {
  const { herokuCors, url, key } = API.heroes;
  const request = `${herokuCors}/${url}/${key}/${id}`;
  await axios.get(request)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err);
      return null;
    })
};

const jsonToTable = (data) => {
  console.log("jsonToTable() to convert data to table quasar", data)
}

export const dataService = {
  get,
  jsonToTable
};