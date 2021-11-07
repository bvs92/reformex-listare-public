<template>
<div>
    <SearchHeader />
    <section class='listings-area ptb-100'>
        <div class='container'>
            <div class='row'>
                <div class='col-lg-8 col-md-12' id="results" ref="results">
                    <div class='listings-grid-sorting row align-items-center' >
                        <div class='col-lg-12 col-md-12 result-count'>
                            <p v-if="search_made">
                                <template v-if="!search_loading_status">
                                    Am găsit <span class='count'>{{ result_companies }}</span> rezultat<template v-if="result_companies != 1">e</template> pentru căutarea ta.
                                </template>
                            </p>
                            <p v-else>Ultimele firme înscrise.</p>
                        </div>
                    </div>

    
                    <template>
                        <template v-if="search_loading_status">
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

                                <div class='row' v-if="result_companies && result_companies > 0">
                                    <transition name="page" mode="out-in">
                                    <SingleListItem v-for="item in companies" :key="item.id" :company="item.user" keep-alive  />
                                    </transition>
                                </div>

                                <div class='row justify-content-center' v-else>
                                    <transition name="page" mode="out-in">
                                    <NoResultsFound />
                                    </transition>
                                </div>

                        </template>
                    </template>
                    <transition name="fade" mode="out-in">
                        <Pagination v-if="total_pages && total_pages > 1" :pages="total_pages" @scrollTo="scrollToElement" />
                    </transition>
                </div>

                <div class='col-lg-4 col-md-12'>
                    <FiltersSidebar /> 
                    <!-- <BannerSidebar :full="false" /> -->
                </div>

            </div>

            
        </div>

        <RegisterSmall />
        
    </section>
</div>
</template>

<script>
import SearchHeader from "@/components/cautare/SearchHeader.vue"
import FiltersSidebar from "@/components/cautare/FiltersSidebar.vue"
import SingleListItem from "@/components/cautare/SingleListItem.vue"
import NoResultsFound from "@/components/common/NoResultsFound.vue"
import Pagination from "@/components/cautare/Pagination.vue"
import LoadingElements from "@/components/common/LoadingElements.vue"
import RegisterSmall from "@/components/common/RegisterSmall.vue"
// import BannerSidebar from "@/components/common/BannerSidebar.vue"

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
        SearchHeader,
        FiltersSidebar,
        SingleListItem,
        Pagination,
        LoadingElements,
        RegisterSmall,
        NoResultsFound
        // BannerSidebar
    },

    data(){
        return {
            loading_comp: false,
            // latest_companies: null,
            // result_companies: null
        }
    },

    computed: {
        latest_companies() {
            return this.$store.state.companies.latest_companies;
        },
        search_made(){
            return this.$store.state.search_companies.searchMade;
        },
        result_companies() {
            return this.$store.state.search_companies.total_results;
        },
        companies() {
            return this.$store.state.search_companies.search_companies;
        },
        search_loading_status() {
            return this.$store.state.search_companies.loading_status;
        },
        loading_page_change() {
            return this.$store.state.search_companies.loading_page_change;
        },
        

        total_pages() {
            return this.$store.state.search_companies.total_pages;
        },

    },
    
    async fetch(){
        // this.loading_comp = true;
        
        // await this.$store.dispatch('categories/initCategories');
        // await this.$store.dispatch('judete/initJudete');

        // // console.log('this.search_made', this.search_made);
        
        // if(!this.search_made){
        //     // console.log('se executa all?');
        //     await this.$store.commit('search_companies/set_loading_search', true);

        //     let payload = {
        //         category_slug: 'all',
        //         location_slug:  'all',
        //         page: 1
        //     };

        //     await this.$store.dispatch('search_companies/searchCompanies', payload)
        //     .finally(() => {
        //         this.$store.commit('search_companies/set_loading_search', false);
        //     });

            
        //     let _last_search = {
        //         category: 'Toate',
        //         location: 'România'
        //     }
        //     await this.$store.commit('search_companies/set_last_search', _last_search);
        // }

        

        
        // await this.$store.dispatch('search_companies/initLatestCompanies').finally(() => {
        //     setTimeout(() => {
        //         this.loading_comp = false;
        //     }, 1000);
        // });
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

    async created(){
    //    await this.$store.dispatch('categories/initCategories');
        // await this.$store.dispatch('judete/initJudete');

        // console.log('this.search_made', this.search_made);
        
        if(!this.search_made){
            // console.log('se executa all?');
            await this.$store.commit('search_companies/set_loading_search', true);

            let payload = {
                category_slug: 'all',
                location_slug:  'all',
                page: 1
            };

            await this.$store.dispatch('search_companies/searchCompanies', payload)
            .finally(() => {
                this.$store.commit('search_companies/set_loading_search', false);
            });

            
            let _last_search = {
                category: 'Toate',
                location: 'România'
            }
            await this.$store.commit('search_companies/set_last_search', _last_search);
        }
    },

    mounted(){
        setTimeout(() => {
            if(this.$store.state.search_companies.search_homepage){
                // await this.goToSection('results');
                this.scrollToElement();
            }
        }, 1000);
        
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