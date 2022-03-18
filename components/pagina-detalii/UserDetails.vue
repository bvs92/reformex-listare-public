<template>
<div class='listings-widget listings_author' v-if="company">
    <!-- <h3></h3> -->
    <div class='author'>
        <div class='d-flex align-items-center'>
            <img :src="company.profile_photo" :alt='company.company.name' v-if="company.has_profile_photo" />
            <img src='~assets/images/user3.png' :alt='company.company.name' v-else />
            <div class='title'>
            <h4>
                <a href='#'>{{ company.company.name }}</a>
            </h4>
            <span>{{ company.first_name }} {{ company.last_name }}</span>
            </div>
        </div>

        <div class='listings_contact_details mt-4' v-if="company">
            <ul>
                <li>
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    {{ company.company.cui }}
                </li>
                <li v-if="company.company.location">
                    <i class="fa fa-info-circle" aria-hidden="true"></i> {{ company.company.register_number }}
                </li>
                <li style="">
                    <i class="fa fa-info-circle" aria-hidden="true"></i> {{ company_type(company.company.company_type) }}
                </li>
            </ul>
        </div>
        

        <div class='author-profile'>
            <div class='row align-items-center'>

            <div class='col-lg-12 col-md-12' v-if="company.social_profiles && company.social_profiles.length > 0">
                <ul class='social d-flex justify-content-between'>
                    <li v-for="profile in company.social_profiles" :key="profile.id" >
                        <template v-if="profile.username != null">
                            <a target="_blank" rel="nofollow" :href="format_social_link('facebook',profile.username)" v-if="profile.type == 'facebook_profile'">
                                <i class="fa fa-facebook-square" aria-hidden="true"></i>
                            </a>
                            <a target="_blank" rel="nofollow" :href="format_social_link('instagram',profile.username)" v-else-if="profile.type == 'instagram_profile'">
                                <i class="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                            <a target="_blank" rel="nofollow" :href="format_social_link('youtube',profile.username)" v-else-if="profile.type == 'youtube_profile'">
                                <i class="fa fa-youtube-play" aria-hidden="true"></i>
                            </a>
                            <a target="_blank" rel="nofollow" :href="format_social_link('twitter',profile.username)" v-else-if="profile.type == 'twitter_profile'">
                                <i class="fa fa-twitter-square" aria-hidden="true"></i>
                        </a>
                        </template>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {BASE_URL} from '@/config.js';

export default {
    data(){
        return {
            BASE: null,
            organization_types: [
                {value: 'PFA', text: 'Persoană Fizică Autorizată'},
                {value: 'II', text: 'Întreprindere Individuală'},
                {value: 'IF', text: 'Întreprindere Familială'},
                {value: 'SRL', text: 'Societate cu Răspundere Limitată'},
                {value: 'SRL-D', text: 'Societate cu Răspundere Limitată - Debutant'},
                {value: 'SNC', text: 'Societate în Nume Colectiv'},
                {value: 'SA', text: 'Societate pe Acțiuni'},
                {value: 'SCS', text: 'Societate în Comandită Simplă'},
                {value: 'SCA', text: 'Societate în Comandită pe Acțiuni'},
                {value: 'SE', text: 'Societate Europeană'}
            ]
        }
    },

    props: ["company"],

    methods: {
        company_type(type){
            let found = this.organization_types.filter(item => {
                if(item.value == type){
                    return item;
                }
            })

            return found[0].text;
        },

        format_social_link: function(network, profile){
            if(network == 'facebook'){
                if(profile.includes('facebook.com')){
                    let $splitted = profile.split('facebook.com/');
                    return 'https://www.facebook.com/' + $splittted[1];
                } else {
                    return 'https://www.facebook.com/' + profile;
                }
            } else if(network == 'instagram'){
                if(profile.includes('instagram.com')){
                    let $splitted = profile.split('instagram.com/');
                    return 'https://www.instagram.com/' + $splittted[1];
                } else {
                    return 'https://www.instagram.com/' + profile;
                }
            } else if(network == 'twitter'){
                if(profile.includes('twitter.com')){
                    let $splitted = profile.split('twitter.com/');
                    return 'https://www.twitter.com/' + $splittted[1];
                } else {
                    return 'https://www.twitter.com/' + profile;
                }
            } else if(network == 'youtube'){
                if(profile.includes('youtube.com')){
                    let $splitted = profile.split('youtube.com/');
                    return 'https://www.youtube.com/' + $splittted[1];
                } else {
                    return 'https://www.youtube.com/' + profile;
                }
            }
        }
    },

    created(){
        this.BASE = BASE_URL;
    }
}
</script>

<style scoped>
.listings-sidebar .listings_contact_details ul li:last-child {
    padding-bottom: 10px;
}
</style>