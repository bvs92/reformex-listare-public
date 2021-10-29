import {BASE_URL} from '@/config.js';
import axios from 'axios';
import https from 'https';

export const state = () => ({
    companies: [],
    latest_companies: [],
    search_companies: [],
    initial_latest_companies: [],
    initial_search_companies: [],
    searchMade: false,
    lastSearch: null,
    loading_status: false,
    search_homepage: false,
    checkedVerified: false,
    checkedProjects: false,
})

export const actions = {
    initCompanies({commit}){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

        axios.get(`${BASE_URL}/api/companies/get/top`,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(response => {
          if(response.data){
              commit('set_companies', response.data.users);
            //   console.log('top companies', response.data.users)
              // await commit('set_total_categories', response.data.total);
          } else if(response.data.errors){
              // await commit('set_errors', Object.values(response.data.errors));
          }
      });
    },

    async initLatestCompanies({commit}){
        await commit('set_loading_search', true);
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

        await axios.get(`${BASE_URL}/api/companies/get/top`,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(async response => {
          if(response.data){
              await commit('set_latest_companies', response.data.users);
              await commit('set_initial_latest_companies', response.data.users);
          }
        }).finally(() => {
            setTimeout(() => {
                commit('set_loading_search', false);
            }, 1000);
        });
    },

    searchCompanies: async function({commit}, payload){
        await commit('set_loading_search', true);

        axios.defaults.httpsAgent = await new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/companies/search/${payload.category}/${payload.location}`;

        await axios.get(final_url,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(async response => {

            if(response.data.companies){
                if(Array.isArray(response.data.companies)){
                    commit('set_search_companies', response.data.companies)
                    commit('set_initial_search_companies', response.data.companies)
                }else {
                    commit('set_initial_search_companies', [response.data.companies[Object.keys(response.data.companies)[0]]])
                    commit('set_search_companies', [response.data.companies[Object.keys(response.data.companies)[0]]])
                }
               

                
                //   commit('set_last_search', payload);
                // console.log('search companies result', response.data.companies);
            } else {
                commit('set_search_companies', []);
                commit('set_initial_search_companies', []);
            }
      }).finally(() => {
            commit('set_search_made', true);
            commit('set_loading_search', false);
         
      });
    },

    toggleVerified: function({commit, state}, status){
        if(state.searchMade){
            if(!status){
                commit('set_search_companies', state.initial_search_companies) 
            } else {
                let filteredSearch = state.search_companies.filter(item => {
                    if(item.user.badge.verified == 1){
                        return item;
                    }
                });
                commit('set_search_companies', filteredSearch)
            }
        } else {
            if(!status){
                commit('set_latest_companies', state.initial_latest_companies) 
            } else {
                let filteredSearch = state.latest_companies.filter(item => {
                    if(item.badge.verified == 1){
                        return item;
                    }
                });
                commit('set_latest_companies', filteredSearch)
            }
        }
        commit('toggle_verified', status);
        
    },
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
    set_search_companies(state, _companies) {
        state.search_companies = _companies;
    },
    set_initial_latest_companies(state, _companies) {
        state.initial_latest_companies = _companies;
    },
    set_initial_search_companies(state, _companies) {
        state.initial_search_companies = _companies;
    },
    set_search_made(state, _search) {
        state.searchMade = _search;
    },
    set_loading_search(state, status) {
        state.loading_status = status;
    },
    set_search_homepage(state, status) {
        state.search_homepage = status;
    },
    set_last_search(state, payload) {
        state.lastSearch = "Ultima căutare: " + payload.category + " în " + payload.location + ".";
    },
    toggle_verified: function(state, _status){
        state.checkedVerified = _status;
    },
    toggle_projects: function(state, _status){
        state.checkedProjects = _status;
    }
}