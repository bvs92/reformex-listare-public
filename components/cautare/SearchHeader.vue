<template>
<div class='page-title-bg background-pattern'>
    <div class='container'>
        <h1 class="page-title" v-if="title">Profesioniști și firme de <span>{{ title }}</span></h1>
        <h1 class="page-title" v-else>Caută firme și profesioniști</h1>
        <form @submit.prevent="searchCompanies">
        <div class='row m-0 align-items-center'>
            
            <div class='col-lg-5 col-md-6 p-0'>
                <div class='form-group category-select pageheader-select-custom'>
                    <label class="category-icon">
                        <i class='flaticon-pin'></i>
                    </label>

                    <select class="header-form-select-pageheader" v-if="judete && judete.length > 0" v-model="location" @change="getLocation($event)">
                        <option value="all">Toate</option>
                        <option v-for="judet in judete" :key="judet.uuid" :value="judet.code">{{ judet.name }}</option>
                    </select>
                </div>
            </div>

            <div class='col-lg-5 col-md-6 p-0'>
                <div class='form-group category-select pageheader-select-custom'>
                    <label class="category-icon">
                    <i class='flaticon-category'></i>
                    </label>

                    <select class="header-form-select-pageheader" v-if="categories && categories.length > 0" v-model="category" @change="getCategory($event)">
                        <option value="all">Toate categoriile</option>
                        <option v-for="category in categories" :key="category.uuid" :value="category.uuid">{{ category.name }}</option>
                    </select>

                </div>
            </div>

            <div class='col-lg-2 col-md-12 p-0'>
            <div class='submit-btn'>
                <button type='submit' :disabled="block_search_button ? true : false">Caută</button>
            </div>
            </div>
        </div>
        </form>

        <p class="text-center pt-5 pb-1 text-dark" v-if="last_search"><span>{{ last_search }}</span></p>
        <p class="text-center pt-5 pb-1 text-dark" v-else><span>Lansează o căutare.</span></p>

    </div>
    </div>
</template>


<script>
export default {
    computed: {
      categories() {
        return this.$store.state.categories.categories;
      },
      judete() {
        return this.$store.state.judete.judete;
      },
      last_search() {
        return this.$store.state.search_companies.lastSearch;
      },

      current_page(){
          return this.$store.state.search_companies.current_page;
      },

      
      
    },

    props: ["title", "redirecting"],

    data(){
        return {
            location: "all",
            category: "all",
            location_name: 'România',
            category_name: 'Toate categoriile',
            block_search_button: false
        }
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
            // await this.$store.commit('search_companies/set_filter_state', false);
            await this.$store.commit('search_companies/set_block_button', true);
            
            this.block_search_button = true;
            await this.$store.commit('search_companies/set_loading_page_change', true);
            let payload = {
                category_slug: this.category,
                location_slug: this.location,
                page: 1
            };

            await this.$store.dispatch('search_companies/searchCompanies', payload).finally(() => {
                this.block_search_button = false;
                this.$store.commit('search_companies/set_block_button', false);
            });
            
            let _last_search = {
                category: this.category_name,
                location: this.location_name
            }
            await this.$store.commit('search_companies/set_last_search', _last_search);

            await this.$store.commit('search_companies/set_loading_page_change', false);


            await this.$store.dispatch('banners/initBannersByCategory', this.category_name);

            // await this.$store.commit('search_companies/set_current_page');
            
            if(this.redirecting){
                // await this.$store.commit('search_companies/set_search_homepage', true);
                await this.$router.push('/cautare');
            }
            // await this.$store.commit('companies/set_loading_search', false);
        }
    },

    async fetch(){
        await this.$store.dispatch('categories/initCategories');
        await this.$store.dispatch('judete/initJudete');       
    },
}
</script>


<style scoped>
.page-title-bg {
    padding-bottom: 40px;
}

.page-title-bg form {
    padding: 12px!important;
}

.page-title {
    font-size: 36px;
    font-weight: 600;
}

.page-title > span {
  background-image: linear-gradient(120deg, #87e7aa 0%, #91daff 100%);
  background-repeat: no-repeat;
  background-size: 100% 0.2em;
  background-position: 0 88%;
  transition: background-size 0.25s ease-in;
}

.page-title > span:hover {
    background-size: 100% 88%;
  }
</style>