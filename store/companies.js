import {BASE_URL} from '@/config.js';
import axios from 'axios';
import https from 'https';

export const state = () => ({
    companies: [],
    latest_companies: [],

    initial_latest_companies: [],
  
    loading_status: false,
  
    checkedVerified: false,
    checkedProjects: false,
})

export const actions = {
    initCompanies({commit}){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let FINAL_URL =  process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.LOCAL_BASE_URL

          axios.get(`${FINAL_URL}/resources/companies/get/top`,{
        // axios.get(`${BASE_URL}/api/companies/get/top`,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(response => {
          if(response.data){
              commit('set_companies', response.data.users);
          } else if(response.data.errors){
              // await commit('set_errors', Object.values(response.data.errors));
          }
      });
    },

    // async initLatestCompanies({commit}){
    //     await commit('set_loading_search', true);
    //     axios.defaults.httpsAgent = new https.Agent({
    //         rejectUnauthorized: false,
    //       });

    //     await axios.get(`${BASE_URL}/api/companies/get/top`,{
    //         headers: {'Access-Control-Allow-Origin': "*"},
    //          mode: 'cors',
    //       }).then(async response => {
    //       if(response.data){
    //           await commit('set_latest_companies', response.data.users);
    //           await commit('set_initial_latest_companies', response.data.users);
    //       }
    //     }).finally(() => {
    //         setTimeout(() => {
    //             commit('set_loading_search', false);
    //         }, 1000);
    //     });
    // },

    // toggleVerified: function({commit, state}, status){
    //     if(state.searchMade){
    //         if(!status){
    //             commit('set_search_companies', state.initial_search_companies) 
    //         } else {
    //             let filteredSearch = state.search_companies.filter(item => {
    //                 if(item.user.badge.verified == 1){
    //                     return item;
    //                 }
    //             });
    //             commit('set_search_companies', filteredSearch)
    //         }
    //     } else {
    //         if(!status){
    //             commit('set_latest_companies', state.initial_latest_companies) 
    //         } else {
    //             let filteredSearch = state.latest_companies.filter(item => {
    //                 if(item.badge.verified == 1){
    //                     return item;
    //                 }
    //             });
    //             commit('set_latest_companies', filteredSearch)
    //         }
    //     }
    //     commit('toggle_verified', status);
        
    // },
    toggleProjects: function({commit}, status){
        commit('companies/toggle_projects', status);
    },

}

export const mutations = {
    set_companies(state, _companies) {
        state.companies = _companies;
    },
    set_latest_companies(state, _companies) {
        state.latest_companies = _companies;
    },
  
    set_initial_latest_companies(state, _companies) {
        state.initial_latest_companies = _companies;
    },
    
   
    toggle_verified: function(state, _status){
        state.checkedVerified = _status;
    },
    toggle_projects: function(state, _status){
        state.checkedProjects = _status;
    }
}