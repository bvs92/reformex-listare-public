import {BASE_URL} from '@/config.js';
import axios from 'axios';
import https from 'https';

export const state = () => ({
    companies: [],
    initial_companies: [],
    category: null,

    loading_status: false,
    checkedVerified: false,
    filter_verified_status: false,
    filter_judet_status: false,

    judet: 'toate',
    status: false
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
                console.log(response.data);
                // await commit('set_category', response.data.category.name);
                // await commit('set_companies', response.data.companies);
                // await commit('set_initial_companies', response.data.companies);

                if(response.data.category){
                    await commit('set_category', response.data.category.name);
                } else {
                    // commit('set_404_page', true)
                    this.$router.push('/pagina-negasita');
                }

            }
            }).finally(() => {
                // commit('set_loading_search', false);
            });

    },

    async initCategoryCompanies({commit}, category){
        // await commit('set_category', null);
        await commit('set_loading_search', true);
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/companies/category/get/${category}`;
            await axios.get(final_url,{
                headers: {'Access-Control-Allow-Origin': "*"},
                mode: 'cors',
            }).then(async response => {
            if(response.data){
                // await commit('set_category', response.data.category.name);
                // await commit('set_companies', response.data.companies);
                // await commit('set_initial_companies', response.data.companies);

                if(response.data.companies){
                    // await commit('set_category', response.data.category.name);
    
                    if(Array.isArray(response.data.companies)){
                        await commit('set_companies', response.data.companies);
                        await commit('set_initial_companies', response.data.companies);
                    } else {
                        await commit('set_companies', [response.data.companies[Object.keys(response.data.companies)[0]]]);
                        await commit('set_initial_companies', [response.data.companies[Object.keys(response.data.companies)[0]]]);
                    }
                } else {
                    // commit('set_404_page', true)
                    this.$router.push('/pagina-negasita');
                }

            }
            }).finally(() => {
                commit('set_loading_search', false);
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
}