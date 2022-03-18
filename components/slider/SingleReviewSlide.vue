<template>
    <div class='single-feedback-box col-md-12'>
        <div class='rating'>
        <i class="fa fa-star pr-2" aria-hidden="true" v-for="(item, index) in parseInt(review.rating)" :key="index"></i>
        </div>
        <p>
        {{ review.message }}
        </p>
        <div class='client-info'>
        <div class='d-flex align-items-center'>
            <img :src="review.user.profile_photo" :alt='review.user.first_name' v-if="review.user.has_profile_photo" />
            <img src='~assets/images/user3.png' :alt='review.company_name' v-else />
            <div class='title'>
            <h3>{{ review.user.last_name.charAt(0) }}. {{ review.user.first_name }}</h3>
            <span>{{ review.company_name }}</span>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import {BASE_URL} from '@/config.js';

export default {
    props: ["review"],

    data(){
        return {
            BASE: null,
        }
    },

    created(){
        this.BASE = BASE_URL;
    }
}
</script>