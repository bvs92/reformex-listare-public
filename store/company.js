import {BASE_URL} from '@/config.js';
import axios from 'axios';
import https from 'https';

export const state = () => ({
    company: null
})

export const actions = {
    async initCompany({commit}, username){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

        let the_url = `${BASE_URL}/api/company/get/public/${username}`;
        await axios.get(the_url,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(async response => {
            if(response.data.company){
                await commit('set_company', response.data.company);
                //   console.log(response.data.company);
            } else {
                this.$router.push('/pagina-negasita');
            }
      });
    },

    
}

export const mutations = {
    set_company(state, _company) {
        state.company = _company;
    },
}