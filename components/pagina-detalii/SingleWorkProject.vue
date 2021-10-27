<template>
<div class='col-lg-6 col-md-6' v-if="project">
    <a href="#" @click.prevent="openModal">
    <div class='single-listings-box'>
        <client-only>
        <div class='listings-image'>
            <figure class="figure-stil" v-if="project.first_photo"
            :style="{ backgroundImage: `url(${project.first_photo})`}"
            >
            
            </figure>
            <figure class="figure-stil" v-else
            :style="{ backgroundImage: `url(~assets/images/listings/listings1.jpg)`}"
            >
            </figure>
            <!-- <img class="only-here" src='~assets/images/listings/listings1.jpg' :alt='project.title' v-else /> -->
            <!-- <img :src='project.first_photo' :alt='project.title' v-if="project.first_photo" />
             -->
            <a href='#' class='link-btn'></a>
        </div>
        </client-only>

        <div class='listings-content'>
        <ul class='listings-meta' v-if="categories && categories.length > 0">
            <li>
                <i class="fa fa-tags" aria-hidden="true"></i>
                <a v-for="(category, index) in categories.slice(0,3)" :key="category.id">
                    <span class="ml-1">{{ category.name }}</span><template v-if="index != categories.length - 1">, </template>
                </a>
            </li>
        </ul>
        <h3 class="title-project mt-2">
            <a href='#'>{{ slice_title(project.title) }}</a>
        </h3>
        
        
        </div>
    </div>
    </a>

    <b-modal v-if="project" v-model="modalShow" size="xl" hide-footer :title="'Detalii proiect: ' + project.title">
        <SingleWorkProjectGallery :project="project" />
    </b-modal>
</div>
</template>

<script>
import SingleWorkProjectGallery from "./SingleWorkProjectGallery.vue"

export default {
    components: {
        SingleWorkProjectGallery
    },
    data(){
        return {
            categories: [],
            modalShow: false
        }
    },
    props: {
        project: Object
    },

    methods: {
        slice_title: function(str){
            let final = str.substring(0, 28);
            if(str.length > 28){
                final += "..."
            }
            return final;
        },

        openModal: function(){
            this.modalShow = !this.modalShow;
        }
    },

    created(){
        if(this.project.categories.length > 3){
            this.categories = this.project.categories.slice(0,3);
        } else {
             this.categories = this.project.categories;
        }
    }
}
</script>

<style scoped>
.title-project {
    font-size: 16px;
    font-weight: 500;
}

.single-listings-box .listings-image {
    /* height: 360px; */
    max-height: 300px;
    overflow: hidden;
}

.only-here {
    height: 360px;
}

.figure-stil {
 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;height: 300px!important;max-height: 300px!important;
}
</style>