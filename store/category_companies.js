import {BASE_URL} from '@/config.js';
import axios from 'axios';
import https from 'https';

export const state = () => ({
    companies: [],
    initial_companies: [],
    category: null,
    category_uuid: null,
    category_slug: null,

    loading_status: false,
    checkedVerified: false,
    filter_verified_status: false,
    filter_judet_status: false,

    judet: 'toate',
    status: false,

    current_slug: null,
    current_location: 'all',


    total_pages: null,
    current_page: 1,

    page_changed: false,

    loading_page_change: false,
    initial_load: true,
    filter_state: false
})

export const actions = {

    async initCategory({commit}, category_slug){
        await commit('set_category', null);
        // await commit('set_loading_search', true);
        

        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/categories/get/single/${category_slug}`;
            await axios.get(final_url,{
                headers: {'Access-Control-Allow-Origin': "*"},
                mode: 'cors',
            }).then(async response => {
            if(response.data){
                if(response.data.category){
                    await commit('set_category', response.data.category.name);
                    await commit('set_category_uuid', response.data.category.uuid);
                } else {
                    // commit('set_404_page', true)
                    this.$router.push('/pagina-negasita');
                }

            }
            }).finally(() => {
                // commit('set_loading_search', false);
            });

    },

    async initCategoryCompanies({commit}, payload){
        await commit('set_loading_search', true);
        await commit('set_current_slug', payload.category_slug);
        await commit('set_current_page', payload.page);

        

        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/companies/category/get/${payload.category_slug}/${payload.page}`;
            await axios.get(final_url,{
                headers: {'Access-Control-Allow-Origin': "*"},
                mode: 'cors',
            }).then(async response => {
            if(response.data){
                if(response.data.companies){
    
                    if(Array.isArray(response.data.companies)){
                        await commit('set_companies', response.data.companies);
                        await commit('set_total_pages', parseInt(response.data.total_pages));
                    } else {
                        await commit('set_companies', [response.data.companies[Object.keys(response.data.companies)[0]]]);
                        await commit('set_total_pages', parseInt(response.data.total_pages));
                    }
                } else {
                    // this.$router.push('/pagina-negasita');
                    await commit('set_companies', []);
                    await commit('set_total_pages', 1);
                }

            }
            }).finally(() => {
                commit('set_loading_search', false);
                commit('set_page_changed', true);
            });
    },


    // for filters

    searchCompanies: async function({commit}, payload){
        await commit('set_current_page', payload.page);

        axios.defaults.httpsAgent = await new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/companies/search/${payload.category_slug}/${payload.location_slug}/${payload.page}`;

        await axios.get(final_url,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(async response => {

            if(response.data.companies){
                if(Array.isArray(response.data.companies)){
                    await commit('set_companies', response.data.companies)
                    await commit('set_total_pages', parseInt(response.data.total_pages));
                    
                }else {
                    await commit('set_companies', [response.data.companies[Object.keys(response.data.companies)[0]]])
                    await commit('set_total_pages', parseInt(response.data.total_pages));
                }
            } else {
                commit('set_companies', []);
            }
      }).catch(error => {
          console.log('eroare server');
      })
      .finally(() => {
            // commit('set_search_made', true);
            // commit('set_loading_search', false);
         
      });
    },


    searchVerifiedCompanies: async function({commit}, payload){
        
        // await commit('set_loading_search', true);

        // await commit('set_current_slug', payload.category_slug);
        // await commit('set_current_location', payload.location_slug);
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
                    await commit('set_companies', response.data.companies)
                    // await commit('set_initial_search_companies', response.data.companies)
                    await commit('set_total_pages', parseInt(response.data.total_pages));
                    // await commit('set_total_results', parseInt(response.data.total_results));
                }else {
                    // await commit('set_initial_search_companies', [response.data.companies[Object.keys(response.data.companies)[0]]])
                    await commit('set_companies', [response.data.companies[Object.keys(response.data.companies)[0]]])
                    await commit('set_total_pages', parseInt(response.data.total_pages));
                    
                }
               
            } else {
                commit('set_companies', []);
            }
      }).catch(error => {
          console.log('eroare server');
      });
    },


    filterCompanies: async function({commit, dispatch, state}){
        await commit('set_filter_state', false)
        await commit('set_initial_load', false);
        if(state.current_slug){
            await commit('set_loading_page_change', true);
            console.log(state.category_uuid);
            console.log(state.current_location);
    
            let payload = {
                category_slug: state.category_uuid,
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
        await commit('set_filter_state', true)
        if(status){
            if(state.current_slug){
                await commit('set_initial_load', false);
                await commit('set_loading_page_change', true);
                
                
        
                let payload = {
                    category_slug: state.category_uuid,
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
    },


    changePage: async function({state, dispatch, commit}, page){
        await commit('set_loading_page_change', true);
        commit('set_initial_load', false);
        let payload = {
            category_slug: state.current_slug,
            page: page
        };

        // await commit('set_page_changed', true);

        await dispatch('initCategoryCompanies', payload).finally(async () => {
            setTimeout(() => {
                commit('set_loading_page_change', false);
            }, 1000);
        });

    },

    toggleVerified: function({commit, state}, status){

        commit('set_status', status);
        
        if(!status){
            commit('set_filter_verified_status', false);
            if(state.filter_judet_status){

                let filteredCompanies = state.initial_companies.filter(item => {
                    if(item.user.judets && item.user.judets.length > 0){
                        if (item.user.judets.some(e => e.code == state.judet)) {
                            return item;
                          }
                    }
                });

                commit('set_companies', filteredCompanies) 


            } else {
                commit('set_companies', state.initial_companies) 
            }
        } else {
            commit('set_filter_verified_status', true);

            if(state.filter_judet_status){

                let filteredCompanies = state.initial_companies.filter(item => {
                    if(item.user.badge.verified == 1){
                        return item;
                    }
                });

                filteredCompanies = filteredCompanies.filter(item => {
                    if(item.user.judets && item.user.judets.length > 0){
                        if (item.user.judets.some(e => e.code == state.judet)) {
                            return item;
                          }
                    }
                });

                commit('set_companies', filteredCompanies)
            } else {
                let filteredCompanies = state.initial_companies.filter(item => {
                    if(item.user.badge.verified == 1){
                        return item;
                    }
                });
                commit('set_companies', filteredCompanies)
            }

            
        }

        commit('toggle_verified', status);        
    },

    filterJudet: function({commit, state}, judet){

        commit('set_judet', judet);
        

        if(judet == 'toate'){
            commit('set_filter_judet_status', false);
            if(state.filter_verified_status){
                let filteredCompanies = state.initial_companies.filter(item => {
                    if(item.user.badge.verified == 1){
                        return item;
                    }
                });

                commit('set_companies', filteredCompanies) 
            } else {
                commit('set_companies', state.initial_companies) 
            }
        } else {
            commit('set_filter_judet_status', true);

            if(state.filter_verified_status){

                let filteredCompanies = state.initial_companies.filter(item => {
                    if(item.user.badge.verified == 1){
                        return item;
                    }
                });

                filteredCompanies = filteredCompanies.filter(item => {
                    if(item.user.judets && item.user.judets.length > 0){
                        if (item.user.judets.some(e => e.code == state.judet)) {
                            return item;
                          }
                    }
                });

                commit('set_companies', filteredCompanies) 
            } else {
                let filteredCompanies = state.initial_companies.filter(item => {
                    if(item.user.judets && item.user.judets.length > 0){
                        if (item.user.judets.some(e => e.code == state.judet)) {
                            return item;
                          }
                    }
                });
                commit('set_companies', filteredCompanies)
            }

        }
    }

}

export const mutations = {
    set_companies(state, _companies) {
        state.companies = _companies;
    },
    set_initial_companies(state, _companies) {
        state.initial_companies = _companies;
    },
    set_category(state, _category) {
        state.category = _category;
    },

    set_category_uuid(state, _category) {
        state.category_uuid = _category;
    },

    set_category_slug(state, _category) {
        state.category_slug = _category;
    },

    set_current_location(state, _location) {
        state.current_location = _location;
    },

    set_current_slug(state, _current_slug) {
        state.current_slug = _current_slug;
    },

    set_total_pages(state, _total_pages) {
        state.total_pages = _total_pages;
    },

    set_current_page(state, _current_page) {
        if(_current_page > state.total_pages){
            state.current_page = 1;
        }

        state.current_page = _current_page;
    },

    set_judet(state, _judet) {
        state.judet = _judet;
    },

    set_status(state, _status) {
        state.status = _status;
    },
    
    set_loading_search(state, status) {
        state.loading_status = status;
    },
    toggle_verified: function(state, _status){
        state.checkedVerified = _status;
    },
    set_filter_verified_status: function(state, _status){
        state.filter_verified_status = _status;
    },
    set_filter_judet_status: function(state, _status){
        state.filter_judet_status = _status;
    },


    set_page_changed: function(state, _page_changed){
        state.page_changed = _page_changed;
    },

    set_loading_page_change(state, status) {
        state.loading_page_change = status;
    },

    set_initial_load(state, status) {
        state.initial_load = status;
    },

    set_filter_state: function(state, _state){
        state.filter_state = _state;
    }

}