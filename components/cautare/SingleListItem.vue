<template>
<div class='col-lg-12 col-md-12' v-if="company">
    <transition name="page" mode="out-in">
    <NuxtLink :to="{name: 'detalii-firma-slug', params: {slug: slug}}" :event="loading_page_change ? '' : 'click'">
    <div class='single-listings-item' >
        <!-- :class="{'promoted' : slug == 'beton-expert'}" -->
    <div class='row m-0' :class="{'disabled' : loading_page_change}">
        <div class='col-lg-4 col-md-4 p-0'>
        <div class='listings-image ' v-if="company.company">
            <!-- <img src='~assets/images/listings/reformex-cover-small-grey.jpg' :alt='company.company.name' /> -->

            <template v-if="company.company.card">
                <img :src="'https://ams3.digitaloceanspaces.com/reformex.ro/uploads/cards/' + company.company.card.image" :alt='company.company.name'  class="fit-image" v-if="company.card_photo_exists == true" />
                <img src="~assets/images/listings/reformex-cover-small-grey.jpg" :alt='company.company.name'  class="fit-image" v-else />
            </template>
            <template v-else>
                <img src='~assets/images/listings/reformex-cover-small-grey.jpg' :alt='company.company.name' class="fit-image" />
            </template>

            <!-- <a href='#' class='bookmark-save'>
            <i class='flaticon-heart'></i>
            </a> -->
            
            <!-- <p class='promoted-icon' v-if="slug == 'beton-expert'">
            <i class="fa fa-info-circle" aria-hidden="true"></i> Promovat
            </p> -->

            <!-- <NuxtLink to='/single-listings'>
            <a class='link-btn'></a>
            </NuxtLink> -->
            <div class='author'>
            <div class='d-flex align-items-center'>

                <img :src="'https://ams3.digitaloceanspaces.com/reformex.ro/uploads/avatars/' + company.profile_photo" :alt='company.company.name' v-if="company.has_profile_photo" />
                <img src='~assets/images/user3.png' :alt='company.company.name' v-else />

                <span>{{ company.first_name }} {{ company.last_name }}</span>
            </div>
            </div>
        </div>
        </div>

        <div class='col-lg-8 col-md-8 p-0'>
        <div class='listings-content'>

            
            <template v-if="company.badge">
                <span class='status' v-if="company.badge.verified == 1">
                    <i class="fa fa-check" aria-hidden="true"></i> Verificată
                </span>
                <span class='status inactive' v-else>
                   <i class="fa fa-times mb-1" aria-hidden="true"></i> Neverificată
                </span>
            </template>

            <h3 class="company-name">
            <!-- <NuxtLink to='/single-listings'> -->
                <a>{{ company.company.name }}</a>
            <!-- </NuxtLink> -->
            </h3>
            
            <div
            class='
            d-flex
            align-items-center
            justify-content-between
            '
            >
            <div class='categories' v-if="company.categories && company.categories.length > 0">
               <i class="fa fa-tags" aria-hidden="true"></i> <span class="badge badge-secondary" v-for="(category, index) in company.categories" :key="category.id" :class="{hide: (index > 3 && isHidden)}">{{ category.name }}</span>
               <span v-if="company.categories.length > 4" class="badge badge-secondary" @click.prevent="isHidden = !isHidden"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></span>
            </div>
            </div>
            <ul class='listings-meta'>
            <!-- <li>
                <a href='#'>
                <i class='flaticon-furniture-and-household'></i>
                text
                </a>
            </li> -->
            <li v-if="company.company.location">
                <a class="pointer">
                    <i class='flaticon-pin'></i> <template v-if="company.company.location.value">{{ company.company.location.value }}</template>
                </a>
            </li>
            </ul>
        </div>
        </div>
    </div>
    </div>
    </NuxtLink>
    </transition>
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
            isHidden: true,
            slug: null,
            statusImage: false
        }
    },


    props: ["company"],

    computed: {
        loading_page_change() {
            return this.$store.state.search_companies.loading_page_change;
        },
    },

    methods: {
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
        }
    },


    created(){
        this.BASE = process.env.NODE_ENV == 'production' ? process.env.PROD_URL : process.env.BASE_URL;
        this.slug = this.company.user_name_profile ? this.company.user_name_profile.username : this.company.username;

        console.log('Companie', this.company);

        // if(this.company.company.card){
        //     this.checkImage();
        // }
    }
}
</script>

<style scoped>
.listings-image.bg-listing {
    background-color: rgb(218, 218, 218);
    background-image: url('~assets/images/listings/reformex-cover-small-grey.jpg')!important;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.single-listings-item .listings-image img {
    display: block;
}

.pointer {
    cursor: pointer;
}

.status {
    font-weight: 400;
}

.status.inactive {
    background-color: rgb(115, 115, 115);
    font-weight: 400;
}

.company-name {
    font-size: 24px!important;
}

.badge.badge-secondary {
    background-color: rgb(118, 118, 118);
    font-weight: 500;
    padding: 4px 6px;
    margin-bottom: 2px;
}

.hide {
    display: none;
}

.promoted {
    border: 1px solid #f5a91f!important;
}

.promoted-icon {
    font-size: 11px;
    padding: 2px 6px;
    color: black;
    border: 1px solid #ffdf00;
    background-color: #ffdf00;
    border-radius: 5px;
    width: fit-content;
    top: 4px;
    left: 4px;
    position: absolute;
}

.fit-image {
    width: 100%;height: 260px!important;max-height: 260px!important;
    object-fit: cover;
}

.disabled {
    background: #f7f7f7;
    cursor: progress;
}

.fade-enter-active {
  transition: opacity .5s;
}

.fade-leave-active {
    /* transition: 0ms; */
}

.fade-enter  /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-leave {
    opacity: 0;
}
</style>