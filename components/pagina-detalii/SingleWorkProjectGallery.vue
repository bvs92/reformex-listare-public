<template>
<section class='gallery-area bg-f9f9f9 pt-10 pb-70'>
    <div class="container" v-if="project">
        <div class='listings-content'>
            <div v-if="project.categories && project.categories.length > 0" >
                <div class="d-flex justify-content-center">
                    <a v-for="category in project.categories" :key="category.id" class="m-4 btn btn-outline-success">
                        <span class="ml-1">{{ category.name }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <b-card v-if="loading">
        <b-skeleton animation="throb" width="85%"></b-skeleton>
        <b-skeleton animation="throb" width="55%"></b-skeleton>
        <b-skeleton animation="throb" width="70%"></b-skeleton>
    </b-card>

    <template v-else>

        <div class='container' v-if="photos && photos.length > 0">

            <div v-if="items && items.length > 0">
                <CoolLightBox :items="items" :index="index" @close="resetGallery"></CoolLightBox>

                <div class='row'>
                    <div 
                        class='col-lg-3 col-md-4 col-sm-6 zoom-in mt-5'
                        v-for="(image, imageIndex) in items"
                        :key="imageIndex"
                        @click="index = imageIndex"
                        >
                        <figure
                            class="figure-stil shadow"
                            :style="{ backgroundImage: `url(${image})` }"
                        ></figure>
                    </div>
                </div>
        </div>
  
        </div>
    </template>
    </section>
</template>

<script>
import {BASE_URL} from '@/config.js';
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {

    components: {
        CoolLightBox,
    },

    data(){
        return {
            BASE: null,
            items: null,
            index: null,
            loading: false
        }
    },

    props: ["project"],

    computed: {
        photos() {
            return this.$store.state.project.project_photos;
        },
    },

    methods: {
        resetGallery(){
            this.index = null;
        }
    },


    // async fetch(){
    //     await this.$store.dispatch('project/initProjectPhotos', this.project.id);
    // },

    async created(){
        this.BASE = process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.BASE_URL;

        this.loading = true;

        await this.$store.dispatch('project/initProjectPhotos', this.project.id);

        if(this.photos && this.photos.length > 0){
            this.items = [];
            await this.photos.forEach(item => {
                let final_image = this.BASE + '/storage/work_projects/' + item.name;

                this.items.push(final_image);
            });
        }

        this.loading = false;

    },

    beforeDestroy (){
        this.index = null;
        this.items = null;
        this.$store.commit('project/set_project_photos_null');
    }
}
</script>

<style scoped>
.listings-meta {
    list-style-type: none;

}

.figure-stil {
 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;height: 260px!important;max-height: 260px!important;
}

.zoom-in {
    cursor: zoom-in;
}

.shadow {
    -webkit-box-shadow: 0px 0px 5px -1px #028D6E; 
box-shadow: 0px 0px 5px -1px #028D6E;
}

h5.modal-title {
    font-weight: 500!important;
}
</style>