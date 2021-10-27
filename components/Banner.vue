<template>
    <section class='banner-area'>
        <div class='container-fluid'>
          <div class='row'>
            <div class='col-lg-7 col-md-12'>
              <div class='banner-content' style="max-width:1240px!important;">
                    <span class='find-quick'>Găsești rapid</span>
                    <h1 class="banner-two-heading" style="font-size: 40px!important;">
                        <span class='typewrite'>
                        Firme și profesioniști în
                        </span> 
                        <vuejsTypist :words="['arhitectură','amenajări','construcții','design interior','electricitate','instalații','renovări','zidărie','orice domeniu']" :human="true" :pause-interval="1000" />
                    </h1>
                <p>Caută mai jos în funcție de categorie și zona geografică.</p>
                <form class="search-form" @submit.prevent="searchCompanies">
                  <div class='row m-0 align-items-center'>
                    <!-- <div class='col-lg-4 col-md-12 p-0'>
                      <div class='form-group'>
                        <label>
                          <i class='flaticon-search'></i>
                        </label>
                        <input
                          type='text'
                          class='form-control'
                          placeholder='What are you looking for?'
                        />
                      </div>
                    </div> -->

                    <div class='col-lg-5 col-md-6 p-0'>
                      <div class='form-group category-select'>
                        <label class='category-icon'>
                          <i class='flaticon-pin'></i>
                        </label>
                        <select class="banner-form-select-two" v-if="judete && judete.length > 0" v-model="location" @change="getLocation($event)">
                          <option value="all">Toate</option>
                          <option v-for="judet in judete" :key="judet.uuid" :value="judet.code">{{ judet.name }}</option>
                        </select>
                      </div>
                    </div>

                    <div class='col-lg-5 col-md-6 p-0'>
                      <div class='form-group category-select'>
                        <label class='category-icon'>
                          <i class='flaticon-category'></i>
                        </label>
                        <select class="banner-form-select-two" v-if="categories && categories.length > 0" v-model="category" @change="getCategory($event)">
                          <option value="all">Toate categoriile</option>
                          <option v-for="category in categories" :key="category.uuid" :value="category.uuid">{{ category.name }}</option>
                        </select>
                      </div>
                    </div>

                    <div class='col-lg-2 col-md-12 p-0'>
                      <div class='submit-btn'>
                        <button type='submit'>Caută</button>
                      </div>
                    </div>
                  </div>
                </form>
                <ul class='popular-search-list'>
                  <li>Căutări populare:</li>
                  <li>
                    <NuxtLink :to="{name: 'categorie-category-oras', params: {category: 'amenajare', oras: 'bucuresti'}}">
                        Firme de amenajare în București
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="{name: 'categorie-category-oras', params: {category: 'betoane', oras: 'bucuresti'}}">
                        Firme de beton în București
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="{name: 'categorie-category-oras', params: {category: 'constructie', oras: 'bucuresti'}}">
                        Firme de construcții în București
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>

            <div class='col-lg-5 col-md-12'>
              <div class='banner-image'>
                <img src='~assets/images/banner-img1.png' alt='cauta o firma pentru proiectul tau' />
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<script>
import vuejsTypist from 'vuejs-typist'
export default {
    components: {
        vuejsTypist
    },

    data(){
      return {
          location: "all",
          category: "all",
          location_name: 'România',
          category_name: 'Toate categoriile'
      }
    },

    computed: {
      categories() {
        return this.$store.state.categories.categories;
      },
      judete() {
        return this.$store.state.judete.judete;
      },
      search_loading_status() {
            return this.$store.state.companies.loading_status;
        },
    },

    methods: {
        getLocation: function(e){
            if(e.target.value == 'all'){
                this.location_name = 'România';
            } else {
                this.location_name = e.target.options[e.target.options.selectedIndex].text;
            }
        },

        getCategory: function(e){
            if(e.target.value == 'all'){
                this.location_name = 'Toate categoriile';
            } else {
                this.category_name = e.target.options[e.target.options.selectedIndex].text;
            }
        },



        searchCompanies: async function(){
            // await this.$store.commit('companies/set_loading_search', true);
            let payload = {
                category: this.category,
                location: this.location
            };

            await this.$store.dispatch('companies/searchCompanies', payload);
            
            let _last_search = {
                category: this.category_name,
                location: this.location_name
            }
            await this.$store.commit('companies/set_last_search', _last_search);
            await this.$store.commit('companies/set_search_homepage', true);
            if(!this.search_loading_status){
              setTimeout(() => {
                this.$router.push('/cautare');
              }, 200);
            }
            // await this.$store.commit('companies/set_loading_search', false);
        }
    }
}
</script>

<style scoped>
.find-quick {
    font-weight: bold;
    font-size: 24px;
    color: #47938c;
}

.search-form {
  padding: 12px;
}
</style>