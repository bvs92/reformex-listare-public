<template>
    <section class='banner-area'>
        <div class='container-fluid'>
          <div class='row'>
            <div class='col-lg-7 col-md-12 col-sm-12'>
              <div class='banner-content' style="max-width:1240px!important;">
                    <span class='find-quick'>Găsește simplu și rapid</span>
                    <TextHeadSlider />
                <p>Caută în funcție de zona geografică și categorie.</p>
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

                    <div class='col-lg-5 col-md-12 col-sm-12 p-0'>
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

                    <div class='col-lg-5 col-md-12 col-sm-12 p-0'>
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

                    <div class='col-lg-2 col-md-12 col-sm-12 p-0'>
                      <div class='submit-btn'>
                        <button type='submit' :disabled="block_search_button ? true : false">Caută</button>
                      </div>
                    </div>
                  </div>
                </form>

                <!-- <div class="my-5">
                  <span class="d-block my-2 popular-terms">Căutări populare:</span>
                  <div class="justify-content-between">
                    <NuxtLink :to="{name: 'categorie-category-oras', params: {category: 'amenajare', oras: 'bucuresti'}}" class="search-term my-2">
                        <i class="fa fa-search" aria-hidden="true"></i> Firme de amenajare în București
                    </NuxtLink>
                    <NuxtLink :to="{name: 'categorie-category-oras', params: {category: 'betoane', oras: 'bucuresti'}}" class="search-term my-2">
                        <i class="fa fa-search" aria-hidden="true"></i> Firme de beton în București
                    </NuxtLink>
                    <NuxtLink :to="{name: 'categorie-category-oras', params: {category: 'constructie', oras: 'bucuresti'}}" class="search-term my-2">
                        <i class="fa fa-search" aria-hidden="true"></i> Firme de construcții în București
                    </NuxtLink>
                  </div>
                </div> -->
                <!-- <ul class='popular-search-list'>
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
                </ul> -->
              </div>
            </div>

            <div class='col-lg-5 col-md-12' id="banner-image-home-page">
              <div class='banner-image'>
                <img src='~assets/images/banner-img1.png' alt='cauta o firma pentru proiectul tau' />
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<script>

import TextHeadSlider from './TextHeadSlider'

export default {
    components: {
        TextHeadSlider
    },

    data(){
      return {
          location: "all",
          category: "all",
          location_name: 'România',
          category_name: 'Toate categoriile',
          block_search_button: false,
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
            this.block_search_button = true;
            let payload = {
                category_slug: this.category,
                location_slug: this.location,
                page: 1
            };

            await this.$store.dispatch('search_companies/searchCompanies', payload).then(() => {
              this.block_search_button = false;
            });
            
            let _last_search = {
                category: this.category_name,
                location: this.location_name
            }
            await this.$store.commit('search_companies/set_last_search', _last_search);

            
           
            await this.$store.commit('search_companies/set_search_homepage', true);

            if(!this.search_loading_status){
              this.$router.push('/cautare');
            }
            // await this.$store.commit('companies/set_loading_search', false);
        },


    },

    async mounted(){
      await this.$store.commit('category_city_companies/set_initial_load', true);
      this.block_search_button = true;

      setTimeout(() => {
        this.block_search_button = false;
      }, 1000);


    },

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


.search-term {
  padding: 4px;
  background: #ededed;
  border-radius: 5px;
  margin: 4px;
  display: inline-block;
}
</style>