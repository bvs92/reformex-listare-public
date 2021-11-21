<template>
<div>

    <section class='listings-area ptb-100'>
        <div class='container'>
            <div class='row'>
                <div class='col-lg-8 col-md-12' id="results" ref="results">
                    <div class='listings-grid-sorting row align-items-center' >
                        <div class='col-lg-12 col-md-12 result-count'>
                            
                            <p>Ultimele firme înscrise.</p>
                        </div>
                    </div>

    
                    <template>
                        <div class='row justify-content-center'>
                                <transition name="page" mode="out-in">
                                <NoResultsFound />
                                </transition>
                            </div>
                    </template>
                </div>

                <div class='col-lg-4 col-md-12'>
                    <BannerSidebar :full="false" />
                </div>

            </div>

            
        </div>

        <RegisterSmall />
        
    </section>
</div>
</template>

<script>

import NoResultsFound from "@/components/common/NoResultsFound.vue"
import RegisterSmall from "@/components/common/RegisterSmall.vue"
import BannerSidebar from "@/components/banners/BannerSidebar.vue"

export default {
    head: {
        title: 'Caută firme și profesioniști după categorie și zona geografică.',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Caută firme și profesioniști în funcție de categoria de lucru și zona geografică. La noi găsești doar firme verificate. Du-ți proiectul la bun sfârșit!'
            }
        ]
    },

    components: {
        RegisterSmall,
        NoResultsFound,
        BannerSidebar
    },

    data(){
        return {
            loading_comp: false,
            // latest_companies: null,
            // result_companies: null
        }
    },

    computed: {
       

    },
    

    methods: {



        

    },

    async created(){
    //    await this.$store.dispatch('categories/initCategories');
        // await this.$store.dispatch('judete/initJudete');

        // console.log('this.search_made', this.search_made);
       
    },

    mounted(){
 
        
    }

}
</script>

<style scoped>
.spinner-border {
    background: rgb(118, 217, 207);
    border: 0.25em solid rgb(77, 151, 144);
    border-right-color: transparent;
}

.wrapper-spinner {
    background: white;
    border-radius: 50%;
    padding: 20px;
    position: absolute;
    -webkit-box-shadow: 0px 0px 5px 0px rgb(215 215 215);
    -moz-box-shadow: 0px 0px 5px 0px rgb(215 215 215);
    box-shadow: 0px 0px 5px 0px rgb(215 215 215);
    opacity: 0.8;
}







</style>