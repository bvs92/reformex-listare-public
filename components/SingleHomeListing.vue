<template>
    <div class='col-xl-4 col-lg-6 col-md-6'>
        <NuxtLink :to="{name: 'detalii-firma-slug', params: {slug: slug}}">
        <div class='single-listings-box'>
            <div class='listings-image'>
                <img src='~assets/images/listings/reformex-cover-small-grey.jpg' :alt='company.company.name' />

                <!-- <NuxtLink to='/single-listings'>
                <a class='link-btn'></a>
                </NuxtLink> -->
                <!-- <a href='#' class='bookmark-save'>
                    <i class='flaticon-heart'></i>
                </a>
                <a href='#' class='category'>
                    <i class='flaticon-cooking'></i>
                </a> -->
            </div>

            <div class='listings-content'>
                <div class='author'>
                <div class='d-flex align-items-center'>
                    <img :src="BASE + '/' + company.profile_photo" :alt='company.company.name' v-if="company.has_profile_photo" />
                    <img src='~assets/images/user3.jpg' :alt='company.company.name' v-else />
                    <span>{{ company.first_name }} {{ company.last_name }}</span>
                </div>
                </div>

                <h3>
                    <a>{{ company.company.name }}</a>
                </h3>

                <ul class='listings-meta'>
                    <li v-if="company.badge">
                        <a v-if="company.badge.verified == 1">
                            <i class="fa fa-info" aria-hidden="true"></i>
                            Verificata
                        </a>
                        <a v-else>
                            <i class="fa fa-info" aria-hidden="true"></i>
                            Neverificata
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
                    </ul>
                </div>
            </div>
        </div>
        </NuxtLink>
    </div>
</template>

<script>
import {BASE_URL} from '@/config.js';

export default {
    data(){
        return {
            BASE: null,
            slug: null
        }
    },
    props: {
        company: Object
    },

    methods: {
        slice_text: function(str){
            let final = str.substring(0, 45);
            if(str.length > 45){
                final += "..."
            }
            return final;
        },
    },

    created(){
        this.BASE = BASE_URL;
        this.slug = this.company.user_name_profile ? this.company.user_name_profile.username : this.company.username;
        // console.log(this.company);
    }
}
</script>

<style scoped>
.listings-image img {
    max-height: 300px;
}
.single-listings-box .listings-image::before {
    background-color: initial!important;
}
</style>