import {BASE_URL} from '@/config.js';
import axios from 'axios';
import https from 'https';

export const state = () => ({
    companies: [],
    initial_companies: [],
    category: null,
    location: null,
    page_404: false,

    loading_status: false,
    checkedVerified: false,
    filter_verified_status: false,


    status: false
})

export const actions = {


    async initCompanies({commit}, payload){
        await commit('set_category', null);
        await commit('set_location', null);
        await commit('set_loading_search', true);
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/companies/location/category/get/${payload.category_slug}/${payload.location_slug}`;
            await axios.get(final_url,{
                headers: {'Access-Control-Allow-Origin': "*"},
                mode: 'cors',
            }).then(async response => {
            if(response.data){
                if(response.data.companies){
                    await commit('set_category', response.data.category.name);
                    await commit('set_location', response.data.location.name);
    
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
        if(status){
            let filteredSearch = state.companies.filter(item => {
                if(item.user.badge.verified == 1){
                    return item;
                }
            });
            commit('set_companies', filteredSearch)
        } else {
            commit('set_companies', state.initial_companies)
        }

        commit('toggle_verified', status);
        
    },




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
    set_location(state, _location) {
        state.location = _location;
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

    set_404_page: function(state, _status){
        state.page_404 = _status;
    },
    // set_filter_verified_status: function(state, _status){
    //     state.filter_verified_status = _status;
    // },
   
}