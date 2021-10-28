<template>
<div class='col-lg-12 col-md-12' v-if="company">
    <NuxtLink :to="{name: 'detalii-firma-slug', params: {slug: slug}}">
    <div class='single-listings-item'>
    <div class='row m-0'>
        <div class='col-lg-4 col-md-4 p-0'>
        <div class='listings-image bg-listing'>
            <!-- <img src='~assets/images/listings/reformex-cover-small-grey.jpg' :alt='company.company.name' /> -->

            <!-- <a href='#' class='bookmark-save'>
            <i class='flaticon-heart'></i>
            </a> -->
            <!-- <a href='#' class='category'>
            <i class='flaticon-cooking'></i>
            </a> -->
            <!-- <NuxtLink to='/single-listings'>
            <a class='link-btn'></a>
            </NuxtLink> -->
            <div class='author'>
            <div class='d-flex align-items-center'>

                <img :src="BASE + '/' + company.profile_photo" :alt='company.company.name' v-if="company.has_profile_photo" />
                <img src='~assets/images/user3.jpg' :alt='company.company.name' v-else />

                <span>{{ company.first_name }} {{ company.last_name }}</span>
            </div>
            </div>
        </div>
        </div>

        <div class='col-lg-8 col-md-8 p-0'>
        <div class='listings-content'>

            
            <template v-if="company.badge">
                <span class='status' v-if="company.badge.verified == 1">
                    <i class="fa fa-certificate" aria-hidden="true"></i> Verificată
                </span>
                <span class='status inactive' v-else>
                    <i class="fa fa-certificate" aria-hidden="true"></i> Neverificată
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
</div>
</template>

<script>
import {BASE_URL} from '@/config.js';

export default {

    data(){
        return {
            BASE: null,
            isHidden: true,
            slug: null
        }
    },


    props: ["company"],


    created(){
        this.BASE = BASE_URL;
        this.slug = this.company.user_name_profile ? this.company.user_name_profile.username : this.company.username;
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
</style>