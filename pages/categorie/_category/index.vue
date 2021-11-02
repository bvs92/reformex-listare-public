<template>
<div>
    <SearchHeader :title="current_category" :redirecting="true" />
    <section class='listings-area ptb-100'>
        <div class='container'>
            <div class='row'>

                <div class='col-lg-8 col-md-12' id="results" ref="results">
                    <div class='listings-grid-sorting row align-items-center' >
                        <div class='col-lg-12 col-md-12 result-count'>
                            <h2 class="small-title" v-if="current_category">Profesioniști și firme de {{current_category}}.</h2>
                        </div>
                    </div>

                    <template v-if="loading_comp">
                        <LoadingElements />
                    </template>
                    <template v-else>
                        <div class='row' v-if="category_companies && category_companies.length > 0">
                            <SingleListItem v-for="item in category_companies" :key="item.id" :company="item.user" />
                        </div>
                    </template>
                    <Pagination v-if="total_pages > 1" :pages="total_pages" @scrollTo="scrollToElement" />

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
import SearchHeader from "@/components/cautare/SearchHeader.vue"
import FiltersSidebar from "@/components/categorie/FiltersSidebar.vue"
import SingleListItem from "@/components/cautare/SingleListItem.vue"
import Pagination from "@/components/categorie/Pagination.vue"
import LoadingElements from "@/components/common/LoadingElements.vue"
import RegisterSmall from "@/components/common/RegisterSmall.vue"
import BannerSidebar from "@/components/common/BannerSidebar.vue"

export default {

    head() {
        return {
            title: `Cauți firme de ${this.current_category}? Găsești rapid pe REFORMEX.`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: `Cauți firme de ${this.current_category}. Găsești rapid pe REFORMEX. La noi găsești doar firme verificate. Du-ți proiectul la bun sfârșit!`
                }
            ]
        }
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
            // category_companies: null,
            // result_companies: null
        }
    },

    computed: {
        category_companies() {
            return this.$store.state.category_companies.companies;
        },
        total_pages() {
            return this.$store.state.category_companies.total_pages;
        },
        search_loading_status() {
            return this.$store.state.category_companies.loading_status;
        },
        current_category() {
            return this.$store.state.category_companies.category;
        },
        page_changed() {
            return this.$store.state.category_companies.page_changed;
        },
    },
    
    async fetch(){
        await this.$store.dispatch('categories/initCategories');
        await this.$store.dispatch('judete/initJudete');

        let category_slug = decodeURI(this.$route.params.category);
        // get category and check if exists. if false, redirect to 404. else continue the process
        await this.$store.dispatch('category_companies/initCategory', category_slug); 

        if(!this.page_changed){
            this.loading_comp = true;
            let page = 1;
            await this.$store.dispatch('category_companies/initCategoryCompanies', {category_slug, page}).finally(() => {
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
    },

    async created(){
        
    }


}
</script>

<style scoped>
.small-title {
    font-size:20px!important;
    font-weight: 600!important;
}


</style>