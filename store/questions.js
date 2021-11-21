import {BASE_URL} from '@/config.js'
import axios from 'axios';
import https from 'https'

export const state = () => ({
    questions: []
})

export const actions = {
    async initQuestions({commit}, user_id){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          let FINAL_URL =  process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.LOCAL_BASE_URL

          axios.get(`${FINAL_URL}/resources/company_questions/public/get/${user_id}`,{
        // await axios.get(`${BASE_URL}/api/company_questions/public/get/${user_id}`, {
            // headers: {'Access-Control-Allow-Origin': "*"},
            //  mode: 'cors',
          })
            .then(async response => {
            if(response.data){

                if(response.data.questions){
                    if(Array.isArray(response.data.questions)){
                        await commit('set_questions', response.data.questions);
                    } else {
                        await commit('set_questions', [response.data.questions[Object.keys(response.data.questions)[0]]]);
                    }
                } else {
                    commit('set_questions', []);
                }
            } else{
                commit('set_questions', []);
            }
        });
    }
}

export const mutations = {
    set_questions(state, _questions) {
        state.questions = _questions;
    },
}