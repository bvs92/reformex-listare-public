import {BASE_URL} from '@/config.js'
import axios from 'axios';
import https from 'https';


export const state = () => ({
    judete: []
})

export const actions = {
    async initJudete({commit}){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

        let FINAL_URL =  process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.BASE_URL

        // await axios.get(`${BASE_URL}/api/judete/get/all`,{
        await axios.get(`${FINAL_URL}/resources/judete/all`,{
            // headers: {'Access-Control-Allow-Origin': "*"},
            //  mode: 'cors',
          }).then(response => {
          if(response.data){
              commit('set_judete', response.data.judete);
          }
      });
    },

    
}

export const mutations = {
    set_judete(state, _judete) {
        state.judete = _judete;
    },
}