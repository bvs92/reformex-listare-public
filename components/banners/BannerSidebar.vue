<template>

  <div class="pt-5" :class="{'listings-widget-area' : !full}"  ref="banner">
    <p class="sponsored">Sponsorizat</p>
    <client-only v-if="bannersExists">
        <VueSlickCarousel :options="options" 
        :slidesToShow="getNumberOfSlides"
        :infinite="true"
        :responsive="options.responsive"
        :arrows="true"
        :dots="false"
        :autoplay="true"
        :autoplaySpeed="3000"
        :prevArrow='`<button class="slick-prev" href="#"><i class="flaticon-left-chevron"></i></button>`'
        :nextArrow='`<button class="slick-next" href="#"><i class="flaticon-left-chevron"></i></button>`'
        
        :pauseOnFocus="true"
        class="pb-2 mx-auto slick-banner-sidebar"
        >
      
        <ImageSidebarBanner :item="item" v-for="(item, index) in banners" :key="index" />
        <img :src="require('@/assets/images/default-banner.jpg')" class="pointer fit-image" v-if="banners.length < 10" />
    
        <!-- <img :src="'http://127.0.0.1:8000/storage/banners/' + item.image" v-for="(item, index) in banners" :key="index" :review="item" @click.prevent="openModal(index)" class="pointer" /> -->
        </VueSlickCarousel>
    </client-only>

    <img :src="require('@/assets/images/default-banner.jpg')" class="pointer fit-image" v-if="banners && banners.length < 1" />

    <p class="promote"><a href="https://www.reformex.ro/bannerzon/"><i class="fa fa-bullhorn" aria-hidden="true"></i> Promovează-te și tu. Detalii aici.</a></p>

    
  </div>

</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import ImageSidebarBanner from './ImageSidebarBanner.vue';

export default {
    name: "BannerSidebar",
    components: {
        VueSlickCarousel,
        ImageSidebarBanner
    },

    computed: {
        getNumberOfSlides: function(){
          return 1;
      },

      banners: function(){
          return this.$store.state.banners.banners;
      },

      bannersExists: function(){
          return this.banners && this.banners.length > 0;
      }
    },

    props: ["full", "category"],

    data(){
        return {
            selected: null,
            display: false,
            numberOfSlides: 1,
            
            total_banners: null,

            options: {
                responsive: [
                    {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                    },
                    {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                    },
                    {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                    }
                ]
            }
        }
    },

    methods: {
        

        initClientOnlyComp(count = 10) {
            this.$nextTick(() => {
            if (this.$refs.banner) {
                //...
            } else if (count > 0) {
                this.initClientOnlyComp(count - 1);
            }
            });
        },
    },

    created(){
        // setTimeout(() => {
        //     this.total_banners = 3;
        // }, 2000);

        // this.$store.dispatch('banners/initBannersByCategory', 'amenajare');
    },

    async mounted(){
        // console.log('categorie', this.$route.params.category);
        await this.initClientOnlyComp();
        if(this.category){
            await this.$store.dispatch('banners/initBannersByCategory', this.category);
        }
    }

}
</script>

<style>

.slick-banner-sidebar{
    max-width: 400px;
}

#companyDetailsModal___BV_modal_content_ {
    background-color: white;
    border: none;
    border-radius: 0;
    -webkit-box-shadow: 5px 5px #0ec6c6;
    box-shadow: 5px 5px #0ec6c6;
    border: 1px solid #0ec6c6;
}

.sponsored {
    color: #ff9900;
    border: 1px solid #ff9900;
    width: fit-content;
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 14px;
}

.promote {
    color: #4bada3;
    font-size: 14px;
}

.promote a {
    color: #4bada3;
    font-size: 14px;
}

.slick-arrow.slick-next {
position: absolute;
    right: 0px;
}

.slick-arrow.slick-next::before {
    font-family: "Flaticon";
    content: "\f11c";
    color: rgb(94 226 229);
    width: 20px;
    height: 20px;
    font-weight: 900;
    
}

.slick-arrow.slick-prev::before {
    font-family: "Flaticon";
    content: "\f11d";
    color: rgb(94 226 229);
    width: 20px;
    height: 20px;
    font-weight: 900;
    
}

.slick-arrow.slick-prev {
    position: absolute;
    left: 0px;
    z-index: 1!important;
}

.pointer {
    cursor: pointer;
}

.bordered{
    border: 1px solid red;
    border-radius: 10px;
}

.fit-image {
    width: 100%;height: 360px!important;max-height: 360px!important;
    object-fit: cover;
}
</style>