import {BASE_URL} from '@/config.js'
import axios from 'axios';
import https from 'https'

export const state = () => ({
    reviews: []
})

export const actions = {
    async initReviews({commit}){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

        await axios.get(`${BASE_URL}/api/company_reviews/get/all/public`, {
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          })
            .then(async response => {
            if(response.data){

                if(response.data.reviews){
                    if(Array.isArray(response.data.reviews)){
                        await commit('set_reviews', response.data.reviews);
                    } else {
                        await commit('set_reviews', [response.data.reviews[Object.keys(response.data.reviews)[0]]]);
                    }
                } else {
                    commit('set_reviews', []);
                }
            } else{
                commit('set_reviews', []);
            }
        });
    }
}

export const mutations = {
    set_reviews(state, _reviews) {
        state.reviews = _reviews;
    },
}