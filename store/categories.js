import {BASE_URL} from '@/config.js'
import axios from 'axios';
import https from 'https'

export const state = () => ({
    categories: []
})

export const actions = {
    initCategories({commit}){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let FINAL_URL =  process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.LOCAL_BASE_URL


        // axios.get(`${BASE_URL}/api/categories/get/all`,{
        axios.get(`${FINAL_URL}/resources/categories/all`,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(response => {
          if(response.data){
              commit('set_categories', response.data.categories);
              // await commit('set_total_categories', response.data.total);
          } else if(response.data.errors){
              // await commit('set_errors', Object.values(response.data.errors));
          }
      });
    }
}

export const mutations = {
    set_categories(state, _categories) {
        state.categories = _categories;
    },
}