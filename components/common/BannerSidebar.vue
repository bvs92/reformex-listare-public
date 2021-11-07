<template>

  <div class="pt-5" :class="{'listings-widget-area' : !full}" v-if="total_banners" ref="banner">
      <p class="sponsored">Sponsorizat</p>
    <client-only>
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
        <img :src="require('@/assets/images/banner-sidebar.png')" v-for="(item, index) in total_banners" :key="index" :review="item" @click.prevent="openModal(index)" class="pointer" />
        </VueSlickCarousel>
    </client-only>
    <p class="promote"><a href=""><i class="fa fa-bullhorn" aria-hidden="true"></i> Promovează-te și tu. Detalii aici.</a></p>

    <b-modal v-model="modalShow" 
    class="modal-dialog" id="companyDetailsModal" 
    hide-footer lazy size="lg" 
    :title="selected != null ? `Detalii ${selected}` : 'Detalii companie'"
    >
        Hello From Modal!
    </b-modal>
  </div>

</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';

export default {
    name: "BannerSidebar",
    components: {
        VueSlickCarousel
    },

    computed: {
        getNumberOfSlides: function(){
          return 1;
      }
    },

    props: ["full"],

    data(){
        return {
            selected: null,
            display: false,
            numberOfSlides: 1,
            modalShow: false,
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
        openModal: function(incoming){
            this.modalShow = !this.modalShow;
            this.selected = incoming;
        },

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
        setTimeout(() => {
            this.total_banners = 3;
        }, 2000);
    },

    mounted(){
        this.initClientOnlyComp()
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
</style>