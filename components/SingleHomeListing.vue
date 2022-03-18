<template>
    <div class='col-xl-4 col-lg-6 col-md-6'>
        <NuxtLink :to="{name: 'detalii-firma-slug', params: {slug: slug}}">
        <div class='single-listings-box'>
            <div class='listings-image' v-if="company.company">
                
                    <template v-if="company.company.card">
                        <img :src="'https://ams3.digitaloceanspaces.com/reformex.ro/uploads/cards/' + company.company.card.image" :alt='company.company.name'  class="fit-image" v-if="company.card_photo_exists == true" />
                        <img src="~assets/images/listings/reformex-cover-small-grey.jpg" :alt='company.company.name'  class="fit-image" v-else />
                    </template>
                    <template v-else>
                        <img src='~assets/images/listings/reformex-cover-small-grey.jpg' :alt='company.company.name' class="fit-image" />
                    </template>
            </div>

            <div class='listings-content'>
                <div class='author'>
                <div class='d-flex align-items-center'>
                    <img :src="'https://ams3.digitaloceanspaces.com/reformex.ro/uploads/cards/' + company.profile_photo" :alt='company.company.name' v-if="company.has_profile_photo" />
                    <img src='~assets/images/user3.png' :alt='company.company.name' v-else />
                    <span>{{ slice_owner_name(company.first_name + ' ' +  company.last_name)}}</span>
                </div>
                </div>

                <h3 class="mt-3">
                    <a>{{ slice_company_name(company.company.name) }}</a>
                </h3>

                <ul class='listings-meta'>
                    <li v-if="company.badge">
                        <a v-if="company.badge.verified == 1">
                            <i class="fa fa-check" aria-hidden="true"></i>
                            Verificată
                        </a>
                        <a v-else>
                            <i class="fa fa-times unverified" aria-hidden="true"></i>
                            Neverificată
                        </a>
                    </li>
                </ul>
                
                <!-- <span class='status'>
                    <i class='flaticon-save'></i> Porfofoliu proiecte
                </span> -->
                <div class='d-flex align-items-center justify-content-start'>
                    <ul class='listings-meta' v-if="company.company.location">
                        <li style="font-size: 12px;font-weight: 400;">
                            <a>
                                <i class='flaticon-pin'></i> {{ this.slice_text(company.company.location.value) }}
                            </a>
                        </li>
                        <li v-if="company.categories && company.categories.length > 0">
                            <a><i class="fa fa-tags" aria-hidden="true"></i> 
                                <span v-for="(category, index) in company.categories" :key="category.id">
                                {{ category.name }}<span v-if="index != company.categories.length - 1">,</span>
                                </span>
                            </a>
                        </li>
                        <li v-else>
                            <a><i class="fa fa-tags" aria-hidden="true"></i> 
                                <span>
                                Lipsă categorii
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </NuxtLink>
    </div>
</template>

<script>
import axios from 'axios';
import https from 'https';
import {BASE_URL} from '@/config.js';

export default {
    data(){
        return {
            BASE: null,
            slug: null,
            statusImage: false
        }
    },
    props: {
        company: Object
    },

    computed: {
        checkIfImageExistsComputed: function(){
            return this.checkIfImageExists(this.company.company.card.image);
        }
    },

    methods: {
        slice_text: function(str){
            let numbet_cut;
            let final;


            numbet_cut = 35;
            final =str.substring(0, numbet_cut);
            if(str.length > numbet_cut){
                final += "..."
            }
            
            return final;
        },

        slice_company_name: function(str){
            let numbet_cut;
            let final;

    
            numbet_cut = 25;
            final = str.substring(0, numbet_cut);
            if(str.length > numbet_cut){
                final += "..."
            }

            
            return final;
        },

        slice_owner_name: function(str){
            let numbet_cut;
            let final;

            numbet_cut = 35;
            final = str.substring(0, numbet_cut);
            if(str.length > numbet_cut){
                final += "..."
            }
            
            return final;
        },




        checkImage: async function(){
            let path_url = 'cards';
            let name_url = this.company.company.card.image;
            axios.defaults.httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });
            
            let config = {
                headers: {'Access-Control-Allow-Origin': "*"},
                mode: 'no-cors',
            };

            await axios.get(this.BASE + '/api/files/check/' + path_url + '/' + name_url, config).then(response => {
                this.statusImage = Boolean(response.data);
            });
        },


        
    },

    created(){
        this.BASE = process.env.NODE_ENV == 'production' ? process.env.PROD_URL : process.env.BASE_URL;
        this.slug = this.company.user_name_profile ? this.company.user_name_profile.username : this.company.username;
        
        // if(this.company.company.card){
        //     this.checkImage();
        // }



    },


}
</script>

<style scoped>
.listings-image img {
    max-height: 300px;
}
.single-listings-box .listings-image::before {
    background-color: initial!important;
}

.single-listings-box .listings-content .listings-meta li {
    display: block!important;
}

.unverified {
    color: rgb(118, 118, 118)!important;
}

.figure-stil {
 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;height: 260px!important;max-height: 260px!important;
}

.fit-image {
    width: 100%;height: 260px!important;max-height: 260px!important;
    object-fit: cover;
}

</style>