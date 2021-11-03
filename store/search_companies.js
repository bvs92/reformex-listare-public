import {BASE_URL} from '@/config.js';
import axios from 'axios';
import https from 'https';

export const state = () => ({

    search_companies: [],
    initial_search_companies: [],

    searchMade: false,
    lastSearch: null,

    loading_status: false,
    search_homepage: false,
    checkedVerified: false,
    checkedProjects: false,

    toggleVerified: false,


    current_slug: null,
    current_location: null,


    total_pages: 1,
    current_page: 1,
    total_results: 0,

    loading_page_change: false,
    block_button: false,
})

export const actions = {
  

    searchCompanies: async function({commit}, payload){
        // await commit('set_loading_search', true);

        await commit('set_current_slug', payload.category_slug);
        await commit('set_current_location', payload.location_slug);
        await commit('set_current_page', payload.page);
        // await commit('set_search_made', true);

        axios.defaults.httpsAgent = await new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/companies/search/${payload.category_slug}/${payload.location_slug}/${payload.page}`;

        await axios.get(final_url,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(async response => {

            // console.log('suntem aici', response.data);

            if(response.data.companies){
                if(Array.isArray(response.data.companies)){
                    await commit('set_search_companies', response.data.companies)
                    // await commit('set_initial_search_companies', response.data.companies)
                    await commit('set_total_pages', parseInt(response.data.total_pages));
                    await commit('set_total_results', parseInt(response.data.total_results));
                }else {
                    // await commit('set_initial_search_companies', [response.data.companies[Object.keys(response.data.companies)[0]]])
                    await commit('set_search_companies', [response.data.companies[Object.keys(response.data.companies)[0]]])
                    await commit('set_total_pages', parseInt(response.data.total_pages));
                    await commit('set_total_results', parseInt(response.data.total_results));
                }
               

                
                //   commit('set_last_search', payload);
                // console.log('search companies result', response.data.companies);
            } else {
                commit('set_search_companies', []);
                // commit('set_initial_search_companies', []);
            }
      }).catch(error => {
          console.log('eroare server');
      })
      .finally(() => {
            commit('set_search_made', true);
            // commit('set_loading_search', false);
         
      });
    },

    searchVerifiedCompanies: async function({commit}, payload){
        // await commit('set_loading_search', true);

        await commit('set_current_slug', payload.category_slug);
        await commit('set_current_location', payload.location_slug);
        await commit('set_current_page', payload.page);
        // await commit('set_search_made', true);

        axios.defaults.httpsAgent = await new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/companies/search/verified/${payload.category_slug}/${payload.location_slug}/${payload.page}`;

        await axios.get(final_url,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(async response => {

            // console.log('suntem aici', response.data);

            if(response.data.companies){
                if(Array.isArray(response.data.companies)){
                    await commit('set_search_companies', response.data.companies)
                    // await commit('set_initial_search_companies', response.data.companies)
                    await commit('set_total_pages', parseInt(response.data.total_pages));
                    await commit('set_total_results', parseInt(response.data.total_results));
                }else {
                    // await commit('set_initial_search_companies', [response.data.companies[Object.keys(response.data.companies)[0]]])
                    await commit('set_search_companies', [response.data.companies[Object.keys(response.data.companies)[0]]])
                    await commit('set_total_pages', parseInt(response.data.total_pages));
                    await commit('set_total_results', parseInt(response.data.total_results));
                }
               

                
                //   commit('set_last_search', payload);
                // console.log('search companies result', response.data.companies);
            } else {
                commit('set_search_companies', []);
                // commit('set_initial_search_companies', []);
            }
      }).catch(error => {
          console.log('eroare server');
      })
      .finally(() => {
            commit('set_search_made', true);
            // commit('set_loading_search', false);
         
      });
    },

    changePage: async function({state, dispatch, commit}, page){
        await commit('set_loading_page_change', true);

        let payload = {
            category_slug: state.current_slug,
            location_slug: state.current_location,
            page: page
        };
        
        
        await dispatch('searchCompanies', payload).finally(async () => {
            setTimeout(() => {
                commit('set_loading_page_change', false);
            }, 1000);
        });
    },

    filterSearch: async function({dispatch, commit, state}){
        // normal search
        if(state.current_slug && state.current_location){
            await commit('set_loading_page_change', true);
    
            let payload = {
                category_slug: state.current_slug,
                location_slug: state.current_location,
                page: 1
            };
            
            
            await dispatch('searchCompanies', payload).finally(async () => {
                setTimeout(() => {
                    commit('set_loading_page_change', false);
                }, 1000);
            });
        }
    },

    filterVerifiedCompanies: async function({commit, dispatch, state}, status){
        if(status){
            if(state.current_slug && state.current_location){
                await commit('set_loading_page_change', true);
        
                let payload = {
                    category_slug: state.current_slug,
                    location_slug: state.current_location,
                    page: 1
                };
                
                
                await dispatch('searchVerifiedCompanies', payload).finally(async () => {
                    setTimeout(() => {
                        commit('set_loading_page_change', false);
                    }, 1000);
                });
            }
        }
    }


}

export const mutations = {
    set_search_companies(state, _companies) {
        state.search_companies = _companies;
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

    set_loading_page_change(state, status) {
        state.loading_page_change = status;
    },

    set_block_button(state, status) {
        state.block_button = status;
    },



    set_search_homepage(state, status) {
        state.search_homepage = status;
    },
    set_last_search(state, payload) {
        state.lastSearch = "Ultima căutare: " + payload.category + " în " + payload.location + ".";
    },

    set_current_slug(state, _current_slug) {
        state.current_slug = _current_slug;
    },

    set_current_location(state, _current_location) {
        state.current_location = _current_location;
    },

    set_total_pages(state, _total_pages) {
        state.total_pages = _total_pages;
    },

    set_total_results(state, _total_results) {
        state.total_results = _total_results;
    },

    set_current_page(state, _current_page) {
        if(_current_page > state.total_pages){
            state.current_page = 1;
        }

        state.current_page = _current_page;
    },


    // filters
    set_toggle_verified: function(state, _toggle){
        state.toggleVerified = _toggle;
    }
}