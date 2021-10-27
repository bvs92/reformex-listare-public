import {BASE_URL} from '@/config.js'
import axios from 'axios';
import https from 'https';

export const state = () => ({
    judete: []
})

export const actions = {
    initJudete({commit}){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

        axios.get(`${BASE_URL}/api/judete/get/all`,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(response => {
          if(response.data){
              commit('set_judete', response.data.judete);
          }
      });
    }
}

export const mutations = {
    set_judete(state, _judete) {
        state.judete = _judete;
    },
}