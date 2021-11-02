<template>
<div>
    <SearchHeader />
    <section class='listings-area ptb-100'>
        <div class='container'>
            <div class='row'>
                <div class='col-lg-4 col-md-12'>
                <FiltersSidebar /> 
                <BannerSidebar :full="false" />
                </div>

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
                            <div class='row' v-if="result_companies && result_companies > 0">
                                <SingleListItem v-for="item in companies" :key="item.id" :company="item.user" keep-alive />

                            </div>
                        </template>
                    </template>
                    <Pagination v-if="total_pages && total_pages > 1" :pages="total_pages" @scrollTo="scrollToElement" />
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
import Pagination from "@/components/cautare/Pagination.vue"
import LoadingElements from "@/components/common/LoadingElements.vue"
import RegisterSmall from "@/components/common/RegisterSmall.vue"
import BannerSidebar from "@/components/common/BannerSidebar.vue"

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
        BannerSidebar
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

        total_pages() {
            return this.$store.state.search_companies.total_pages;
        },

    },
    
    async fetch(){
        // this.loading_comp = true;
        
        await this.$store.dispatch('categories/initCategories');
        await this.$store.dispatch('judete/initJudete');

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

    // created(){
    //     this.latest_companies = this.$store.state.companies.latest_companies;
    //     this.result_companies = this.$store.state.companies.result_companies;
    // },

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