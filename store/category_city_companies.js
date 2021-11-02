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
    loading_header: false,
    checkedVerified: false,
    filter_verified_status: false,


    status: false,

    current_slug: null,
    current_location: null,


    total_pages: null,
    current_page: 1,
    page_changed: false
})

export const actions = {

    async initCategory({commit}, category_slug){
        await commit('set_category', null);
        await commit('set_loading_header', true);

        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/categories/get/single/${category_slug}`;
            await axios.get(final_url,{
                headers: {'Access-Control-Allow-Origin': "*"},
                mode: 'cors',
            }).then(async response => {
            if(response.data){
                // console.log('nuxtServerInit',response.data);
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
                commit('set_loading_header', false);
            });

    },

    async initLocation({commit}, location_slug){
        await commit('set_location', null);
        await commit('set_loading_header', true);

        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/locations/get/single/${location_slug}`;
            await axios.get(final_url,{
                headers: {'Access-Control-Allow-Origin': "*"},
                mode: 'cors',
            }).then(async response => {
            if(response.data){
                // console.log(response.data);
                // await commit('set_category', response.data.category.name);
                // await commit('set_companies', response.data.companies);
                // await commit('set_initial_companies', response.data.companies);

                if(response.data.location){
                    await commit('set_location', response.data.location.name);
                } else {
                    // commit('set_404_page', true)
                    this.$router.push('/pagina-negasita');
                }

            }
            }).finally(() => {
                commit('set_loading_header', false);
            });

    },


    async initCompanies({commit}, payload){
        // await commit('set_category', null);
        // await commit('set_location', null);
        await commit('set_companies', []);
        await commit('set_initial_companies', []);
        await commit('set_loading_search', true);

        await commit('set_current_slug', payload.category_slug);
        await commit('set_current_location', payload.location_slug);
        await commit('set_current_page', payload.page);

        await commit('set_page_changed', true);

        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let final_url = `${BASE_URL}/api/companies/location/category/get/${payload.category_slug}/${payload.location_slug}/${payload.page}`;
            await axios.get(final_url,{
                headers: {'Access-Control-Allow-Origin': "*"},
                mode: 'cors',
            }).then(async response => {
            if(response.data){
                if(response.data.companies){
                    // await commit('set_category', response.data.category.name);
                    // await commit('set_location', response.data.location.name);
    
                    if(Array.isArray(response.data.companies)){
                        await commit('set_companies', response.data.companies);
                        await commit('set_initial_companies', response.data.companies);
                        await commit('set_total_pages', parseInt(response.data.total_pages));
                    } else {
                        await commit('set_companies', [response.data.companies[Object.keys(response.data.companies)[0]]]);
                        await commit('set_initial_companies', [response.data.companies[Object.keys(response.data.companies)[0]]]);
                        await commit('set_total_pages', parseInt(response.data.total_pages));
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

    changePage: async function({state, dispatch, commit}, page){
        let payload = {
            category_slug: state.current_slug,
            location_slug: state.current_location,
            page: page
        };
        // await commit('set_page_changed', true);
        await dispatch('initCompanies', payload);

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

    set_current_slug(state, _current_slug) {
        state.current_slug = _current_slug;
    },

    set_current_location(state, _current_location) {
        state.current_location = _current_location;
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

    set_page_changed: function(state, _page_changed){
        state.page_changed = _page_changed;
    },



    set_status(state, _status) {
        state.status = _status;
    },
    
    set_loading_search(state, status) {
        state.loading_status = status;
    },
    set_loading_header(state, status) {
        state.loading_header = status;
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