import {BASE_URL} from '@/config.js';
import axios from 'axios';
import https from 'https';

export const state = () => ({
    project_photos: null
})

export const actions = {
    async initProjectPhotos({commit}, project_id){
        axios.defaults.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

        let FINAL_URL =  process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.BASE_URL

        // let the_url = `${BASE_URL}/api/work-project/get/photos/${project_id}`;
        let the_url = `${FINAL_URL}/resources/work-project/get/photos/${project_id}`;

        await axios.get(the_url,{
            headers: {'Access-Control-Allow-Origin': "*"},
             mode: 'cors',
          }).then(async response => {
            if(response.data.photos){
                await commit('set_project_photos', response.data.photos);
            }
      });
    },

    
}

export const mutations = {
    set_project_photos(state, _photos) {
        state.project_photos = _photos;
    },
    set_project_photos_null(state) {
        state.project_photos = null;
    },
}