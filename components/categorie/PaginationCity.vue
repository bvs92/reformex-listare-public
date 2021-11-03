<template>
<div class='col-lg-12 col-md-12' v-if="pages">
    <!-- <p v-if="current_page">Pagina curenta: {{ current_page }}</p>
    <p v-if="current_page">Slug curent: {{ current_slug }}</p> -->
    
        <div class='pagination-area text-center'>
 
            <a href='#' class='prev page-numbers' 
            @click.prevent="getCompanies(current_page - 1)" v-if="current_page > 1"
            :class="{'disabled' : loading_page_change}">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>

            <a class='none prev page-numbers' v-else>
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>


        
        <template v-for="page in pages">
        <a @click.prevent="getCompanies(page)" class="pointer" :key="page" v-if="page < 7">
  
            <span class='page-numbers' :class="{'current' : current_page == page, 'disabled' : loading_page_change}" aria-current='page' >
                {{ page }}
            </span>

        </a>
        <span class="more" :key="page" v-else>...</span>
        </template>


            <a href='#' class='next page-numbers' 
            @click.prevent="getCompanies(current_page + 1)" v-if="current_page < total_pages"
            :class="{'disabled' : loading_page_change}">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </a>
            <a class='none next page-numbers' disabled="disabled" v-else>
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </a>

        </div>

</div><!-- end pagination -->
</template>

<script>
export default {
    props: ["pages"],

    computed: {
        current_page: function(){
            return this.$store.state.category_city_companies.current_page;
        },
        current_slug: function(){
            return this.$store.state.category_city_companies.current_slug;
        },
        total_pages() {
            return this.$store.state.category_city_companies.total_pages;
        },
        loading_page_change() {
            return this.$store.state.category_city_companies.loading_page_change;
        },
    },

    methods: {
        getCompanies: async function(page){
            // await this.$store.commit('category_city_companies/set_current_page', page);
            this.$emit('scrollTo');
            await this.$store.dispatch('category_city_companies/changePage', page);
        }
    },

    created(){
    }
}
</script>

<style scoped>
.pointer {
    cursor: pointer;
}

.none {
    cursor: not-allowed;
}

.more {
    font-size: 16px;
    padding-left: 5px;
    font-weight: bold;
}

.disabled {
    cursor: progress;
    background: rgb(211, 211, 211);
}

.disabled:hover {
    background: rgb(211, 211, 211);
}
</style>