<template>
    <section class="listings-area pt-100 paddingBottom70">
        <div class='container'>
            <div class='section-title'>
              <h2>Firme înscrise</h2>
              <p>
                Descoperă ultimele firme și profesioniști care s-au înscris.
              </p>
            </div>

        

          <div class='row'>
      
            <SingleHomeListing v-for="company in companies" :key="company.id" :company="company" ref="singleListing" />
   
            <!-- <div class='col-xl-12 col-lg-12 col-md-12'>
                <div class='more-listings-box'>
                  <NuxtLink to='/grid-listtings-with-map'>
                    <a class='default-btn'>Vezi</a>
                  </NuxtLink>
                </div>
              </div> -->
          </div>
        </div>
      </section>
</template>

<script>
import SingleHomeListing from "./SingleHomeListing.vue"

export default {
    components: {
        SingleHomeListing
    },

    data(){
      return {
       
      }
    },

    computed: {
      companies() {
        return this.$store.state.companies.companies;
      }
    },

    methods: {
    
    },

    mounted(){
    
    }
}
</script>