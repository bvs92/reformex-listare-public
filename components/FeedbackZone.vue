<template>
    <div class="feedback-area bg-image mt-5 pt-5" v-if="display">
        <div class='container'>
            <div class='section-title pt-5'>
              <h2 class="mt-100">Recenziile utilizatorilor</h2>
              <p>
                Află păreri despre experiența de utilizare a platformei și beneficiile reale ale acesteia.
              </p>
            </div>

          <div class='feedback-slides' v-if="display">
              <client-only>
              <VueSlickCarousel :options="options" 
                :slidesToShow="getNumberOfSlides"
                :infinite="true"
                :responsive="options.responsive"
                :arrows="false"
                :dots="false"
                :autoplay="true"
                :autoplaySpeed="2500"
                :prevArrow='`<button class="slick-prev" href="#"><i class="flaticon-left-chevron"></i></button>`'
                :nextArrow='`<button class="slick-next" href="#"><i class="flaticon-left-chevron"></i></button>`'
                
                :pauseOnFocus="true"
                class="py-5"
                >
                <SingleReviewSlide v-for="(item, index) in reviews" :key="index" :review="item" />
              </VueSlickCarousel>
              </client-only>
           
          </div>
        </div>
      </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import SingleReviewSlide from "./slider/SingleReviewSlide.vue"

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'


export default {
    components: {
        VueSlickCarousel,
        SingleReviewSlide
    },

    computed: {
      reviews() {
        return this.$store.state.reviews.reviews;
      },
      getNumberOfSlides: function(){
          return this.reviews.length > 1 ? 2 : 1;
      }
    },

    data(){
        return {
            display: false,
            numberOfSlides: 1,

            options: {
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 995,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
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

    async fetch(){
        await this.$store.dispatch('reviews/initReviews');
    },

    created(){
        if(this.reviews && this.reviews.length > 0){
            this.display = true;
        }
    }
}
</script>

<style scoped>
.single-feedback-box {
    width: 98%!important;
    margin-left: 1%!important;
    margin-right: 1%!important;
}
</style>