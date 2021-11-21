import {BASE_URL} from '@/config.js';
import axios from 'axios';
import https from 'https';

export const state = () => ({
    banners: [],
    loading_status: false,
    show_form: false
})

export const actions = {
    initBanners({commit}){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let FINAL_URL =  process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.BASE_URL

        //   axios.get(`${FINAL_URL}/resources/companies/get/top`,{
        axios.get(`${FINAL_URL}/api/banners/all`,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(response => {
          if(response.data){
              commit('set_banners', response.data.banners);
          } else if(response.data.errors){
              // await commit('set_errors', Object.values(response.data.errors));
          }
      });
    },

    initBannersByCategory({commit}, category_slug){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let FINAL_URL =  process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.BASE_URL

        //   axios.get(`${FINAL_URL}/resources/companies/get/top`,{
        axios.get(`${FINAL_URL}/api/banners/get/${category_slug}`,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(response => {
          if(response.data){
              commit('set_banners', response.data.banners);
          } else if(response.data.errors){
              // await commit('set_errors', Object.values(response.data.errors));
          }
      });
    },

  

}

export const mutations = {
    set_banners(state, _banners) {
        state.banners = _banners;
    },

    toggle_show_form(state) {
        state.show_form = !state.show_form;
    },

    set_show_form(state, _value) {
        state.show_form = _value;
    },
}