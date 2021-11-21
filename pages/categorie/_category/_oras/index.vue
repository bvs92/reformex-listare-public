<template>
<div>
    <SearchHeaderCity :title="current_category" :redirecting="true" :city="current_location" />
    <section class='listings-area ptb-100'>
        <div class='container'>
            <div class='row'>

                <div class='col-lg-8 col-md-12' id="results" ref="results">
                    <div class='listings-grid-sorting row align-items-center' >
                        <div class='col-lg-12 col-md-12 result-count'>
                            <h2 class="small-title" v-if="current_category">Profesioniști și firme de {{current_category}} în {{ current_location }}.</h2>
                        </div>
                    </div>

                    <template v-if="loading_comp">
                        <LoadingElements />
                    </template>
                    <template v-else>
                        <transition name="slide-fade" mode="out-in">
                            <div v-if="loading_page_change" class="text-center spinner-loading">
                                <span class="wrapper-spinner">
                                    <b-spinner label="Spinning"></b-spinner>
                                </span>
                            </div>
                        </transition>

                        <template v-if="initial_load == true">
                            <div class='row' v-if="result && result.companies && result.empty == false">
                                <!-- <transition name="page" mode="out-in"> -->
                                <SingleListItem v-for="item in result.companies" :key="item.id" :company="item.user" :loading_change="loading_page_change" />
                                <!-- </transition> -->
                            </div>
                            <div class='row justify-content-center' v-else>
                                <transition name="page" mode="out-in">
                                <NoResultsFound />
                                </transition>
                            </div>
                            
                        </template>

                        <template v-else> 
                            <div class='row' v-if="category_companies && category_companies.length > 0">
                                <!-- <transition name="page" mode="out-in"> -->
                                <SingleListItem v-for="item in category_companies" :key="item.id" :company="item.user" :loading_change="loading_page_change" />
                                <!-- </transition> -->
                            </div>
                            <div class='row justify-content-center' v-else>
                                <transition name="page" mode="out-in">
                                <NoResultsFound />
                                </transition>
                            </div>
                            
                        </template>


                        <!-- <div class='row' v-if="category_companies && category_companies.length > 0" keep-alive>
                            <transition name="page" mode="out-in">
                            <SingleListItem v-for="item in category_companies" :key="item.id" :company="item.user" :loading_change="loading_page_change" />
                            </transition>
                        </div> -->
                    </template>
                    <transition name="fade" mode="out-in">
                     <Pagination v-if="total_pages > 1" :pages="total_pages" keep-alive />
                    </transition>

                </div>
                <div class='col-lg-4 col-md-12'>
                    <FiltersSidebar :empty="result.empty" /> 
                    <BannerSidebar :full="false" />
                </div>
                
            </div>
        </div>

        <RegisterSmall />

    </section>
</div>
</template>

<script>
import {BASE_URL} from '@/config.js'
import https from 'https'
import SearchHeaderCity from "@/components/cautare/SearchHeaderCity.vue"
import FiltersSidebar from "@/components/categorie/FiltersLocationSidebar.vue"
import SingleListItem from "@/components/categorie/SingleListItem.vue"
import Pagination from "@/components/categorie/PaginationCity.vue"
import LoadingElements from "@/components/common/LoadingElements.vue"
import RegisterSmall from "@/components/common/RegisterSmall.vue"
import NoResultsFound from "@/components/common/NoResultsFound.vue"
import BannerSidebar from "@/components/banners/BannerSidebar.vue"

export default {

    head() {
        return {
            title: `Cauți firme de ${this.current_category} în ${this.current_location}? Găsești pe REFORMEX.`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: `Cauți firme de ${this.current_category} în ${this.current_location}. Găsești rapid pe REFORMEX. La noi găsești doar firme verificate. Du-ți proiectul la bun sfârșit!`
                }
            ]
        }
    },

    components: {
        SearchHeaderCity,
        FiltersSidebar,
        SingleListItem,
        Pagination,
        LoadingElements,
        RegisterSmall,
        NoResultsFound,
        BannerSidebar
    },

    data(){
        return {
            loading_comp: false,
            // category_companies: null,
            // result_companies: null
            result: null
        }
    },

    computed: {
        category_companies() {
            return this.$store.state.category_city_companies.companies;
        },
        search_loading_status() {
            return this.$store.state.category_city_companies.loading_status;
        },
        header_loading_status() {
            return this.$store.state.category_city_companies.loading_header;
        },
        current_category() {
            return this.$store.state.category_city_companies.category;
        },
        current_location() {
            return this.$store.state.category_city_companies.location;
        },
        page_404() {
            return this.$store.state.category_city_companies.page_404;
        },

        total_pages() {
            return this.$store.state.category_city_companies.total_pages;
        },

        page_changed() {
            return this.$store.state.category_city_companies.page_changed;
        },
        loading_page_change() {
            return this.$store.state.category_city_companies.loading_page_change;
        },
        initial_load() {
            return this.$store.state.category_city_companies.initial_load;
        },
    },
    
    async fetch(){
        //reset companies
        // this.$store.commit('category_city_companies/set_companies', []);


        // if(!this.page_changed){
        //     let payload = {
        //         category_slug: decodeURI(this.$route.params.category),
        //         location_slug: decodeURI(this.$route.params.oras),
        //         page: 1
        //     }
    
        //     // get category and check if exists. if false, redirect to 404. else continue the process
        //     await this.$store.dispatch('category_city_companies/initCategory', payload.category_slug); 
        //     await this.$store.dispatch('category_city_companies/initLocation', payload.location_slug); 
    
    
        //     // load companies and categories + judets
        //     this.loading_comp = true; 
        //     await this.$store.dispatch('category_city_companies/initCompanies', payload);
    
        //     await this.$store.dispatch('categories/initCategories');
        //     await this.$store.dispatch('judete/initJudete').finally(() => {
        //         this.loading_comp = false;
        //     });
        // }


    },

    async asyncData({ route, $http, store, redirect, error }) {
        if(store.state.category_city_companies.initial_load){
            // await store.commit('category_city_companies/set_initial_load', true);
    
            try {
                let httpsAgent = new https.Agent({
                    rejectUnauthorized: false,
                });
        
        
                let config = $http.onRequest(config => {
                    // config.agent = httpsAgent;
                    config.agent = process.env.NODE_ENV == 'production' ? httpsAgent : undefined;
                })
        
        
                
        
                let page = 1;
                let category_slug = decodeURI(route.params.category);
                let location_slug = decodeURI(route.params.oras);
        
                // let final_url_category = `${BASE_URL}/api/categories/get/single/${category_slug}`;
                // let final_url_location = `${BASE_URL}/api/locations/get/single/${location_slug}`;
                // let final_url = `${BASE_URL}/api/companies/location/category/get/${category_slug}/${location_slug}/${page}`;

                // with middleware
                let FINAL_URL =  process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.LOCAL_BASE_URL
                let final_url_category = `${FINAL_URL}/resources/categories/single/${category_slug}`;
                let final_url_location = `${FINAL_URL}/resources/locations/single/${location_slug}`;
                let final_url = `${FINAL_URL}/resources/companies/location/category/get/${category_slug}/${location_slug}/${page}`;
                
                // requests to server
                // const [result] = await Promise.all([ 
                    // $http.$get(final_url, config),
                    // $http.$get(final_url_category, config),
                    // $http.$get(final_url_location, config),
                // ])

                const result = await $http.$get(final_url, config);

                // console.log(result)
        
        
                if(!result || result.error){
                    redirect('/pagina-negasita')
                    return;
                }
        
        
                if(result.category){
                    await store.commit('category_city_companies/set_category', result.category.name);
                    // await store.commit('category_city_companies/set_category_uuid', result.category.uuid);
                    await store.commit('category_city_companies/set_current_slug', category_slug);
                    await store.commit('category_city_companies/set_current_page', page);
                } else {
                    redirect('/pagina-negasita')
                }
        
                if(result.location){
                    await store.commit('category_city_companies/set_location', result.location.name);
                    // await store.commit('category_city_companies/set_category_uuid', result.category.uuid);
                    await store.commit('category_city_companies/set_current_location', location_slug);
                    // await store.commit('category_city_companies/set_current_page', page);
                } else {
                    redirect('/pagina-negasita')
                }
        
        
                if(Array.isArray(result.companies)){
                    await store.commit('category_city_companies/set_companies', result.companies);
                    await store.commit('category_city_companies/set_total_pages', parseInt(result.total_pages));
                } else {
                    await store.commit('category_city_companies/set_companies', [result.companies[Object.keys(result.companies)[0]]]);
                    await store.commit('category_city_companies/set_total_pages', parseInt(result.total_pages));
                }
        
                // console.log(result);

                if(Array.isArray(result.companies)){
                    result.empty = result.companies.length == 0 ? true : false;
                } else {
                    result.empty = false;
                }

                return {result}
            } catch(err) {
                error('Ceva nu a funcționat corect. Reîncarcă pagina.')
            }

        }
    },


    methods: {

        scrollToElement() {
                const el = this.$refs.results;

                if (el) {
                // Use el.scrollIntoView() to instantly scroll to the element
                el.scrollIntoView({behavior: 'smooth'});
            }
        },
    },

    mounted(){
        // console.log(this.$route.params.category);
        this.scrollToElement();
    }


}
</script>

<style scoped>
.small-title {
    font-size:20px!important;
    font-weight: 600!important;
}


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