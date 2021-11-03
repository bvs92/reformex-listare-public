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
                            <div v-if="loading_page_change" class="text-center" style="z-index: 1;position: absolute;width: 100%">
                                <span class="wrapper-spinner">
                                    <b-spinner label="Spinning"></b-spinner>
                                </span>
                            </div>
                        </transition>

                        <div class='row' v-if="category_companies && category_companies.length > 0" keep-alive>
                            <transition name="page" mode="out-in">
                            <SingleListItem v-for="item in category_companies" :key="item.id" :company="item.user" :loading_change="loading_page_change" />
                            </transition>
                        </div>
                    </template>
                    <transition name="fade" mode="out-in">
                     <Pagination v-if="total_pages > 1" :pages="total_pages" keep-alive />
                    </transition>

                </div>
                <div class='col-lg-4 col-md-12'>
                    <FiltersSidebar /> 
                    <BannerSidebar :full="false" />
                </div>
                
            </div>
        </div>

        <RegisterSmall />

    </section>
</div>
</template>

<script>
import SearchHeaderCity from "@/components/cautare/SearchHeaderCity.vue"
import FiltersSidebar from "@/components/categorie/FiltersLocationSidebar.vue"
import SingleListItem from "@/components/categorie/SingleListItem.vue"
import Pagination from "@/components/categorie/PaginationCity.vue"
import LoadingElements from "@/components/common/LoadingElements.vue"
import RegisterSmall from "@/components/common/RegisterSmall.vue"
import BannerSidebar from "@/components/common/BannerSidebar.vue"

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
        BannerSidebar
    },

    data(){
        return {
            loading_comp: false,
            // category_companies: null,
            // result_companies: null
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
    },
    
    async fetch(){
        //reset companies
        // this.$store.commit('category_city_companies/set_companies', []);


        if(!this.page_changed){
            let payload = {
                category_slug: decodeURI(this.$route.params.category),
                location_slug: decodeURI(this.$route.params.oras),
                page: 1
            }
    
            // get category and check if exists. if false, redirect to 404. else continue the process
            await this.$store.dispatch('category_city_companies/initCategory', payload.category_slug); 
            await this.$store.dispatch('category_city_companies/initLocation', payload.location_slug); 
    
    
            // load companies and categories + judets
            this.loading_comp = true; 
            await this.$store.dispatch('category_city_companies/initCompanies', payload);
    
            await this.$store.dispatch('categories/initCategories');
            await this.$store.dispatch('judete/initJudete').finally(() => {
                this.loading_comp = false;
            });
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