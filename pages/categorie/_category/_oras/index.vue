<template>
<div>
    <SearchHeaderCity :title="current_category" :redirecting="true" :city="current_location" />
    <section class='listings-area ptb-100'>
        <div class='container'>
            <div class='row'>
            <div class='col-lg-4 col-md-12'>
            <FiltersSidebar /> 
            </div>

            <div class='col-lg-8 col-md-12' id="results" ref="results">
                <div class='listings-grid-sorting row align-items-center' >
                    <div class='col-lg-12 col-md-12 result-count'>
                        <h2 class="small-title" v-if="current_category">Am găsit <span class='count'>{{ category_companies.length }}</span> firme de {{current_category}} în {{ current_location }}.</h2>
                    </div>
                </div>

                <template v-if="loading_comp">
                    <LoadingElements />
                </template>
                <template v-else>
                    <div class='row' v-if="category_companies && category_companies.length > 0">
                        <SingleListItem v-for="item in category_companies" :key="item.id" :company="item.user" />

                        <Pagination v-if="category_companies && category_companies.length > 10" />
                    </div>
                </template>

            </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import SearchHeaderCity from "@/components/cautare/SearchHeaderCity.vue"
import FiltersSidebar from "@/components/categorie/FiltersLocationSidebar.vue"
import SingleListItem from "@/components/cautare/SingleListItem.vue"
import Pagination from "@/components/cautare/Pagination.vue"
import LoadingElements from "@/components/common/LoadingElements.vue"

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
        LoadingElements
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
        current_category() {
            return this.$store.state.category_city_companies.category;
        },
        current_location() {
            return this.$store.state.category_city_companies.location;
        },
        page_404() {
            return this.$store.state.category_city_companies.page_404;
        },
    },
    
    async fetch(){
        this.loading_comp = true;
        await this.$store.dispatch('categories/initCategories');
        await this.$store.dispatch('judete/initJudete');

        
        let payload = {
            category_slug: decodeURI(this.$route.params.category),
            location_slug: decodeURI(this.$route.params.oras)
        }
        await this.$store.dispatch('category_city_companies/initCompanies', payload).finally(() => {
                this.loading_comp = false;
        });
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
        console.log(this.$route.params.category);
        this.scrollToElement();
    }


}
</script>

<style scoped>
.small-title {
    font-size:20px!important;
    font-weight: 600!important;
}


</style>