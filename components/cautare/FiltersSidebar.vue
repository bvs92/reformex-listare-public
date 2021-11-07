<template>
<aside class='listings-widget-area'>

    <section class='widget widget_categories'>
        <h3 class='title'>Filtrări rezultate</h3>
        <div class="my-4">
            <b-form-checkbox 
            v-model="checkedVerified" name="check-button" switch 
            @change="toggleVerified" 
            :disabled="search_loading_status ? true : false || blockLoading ? true : false || block_button ? true : false">
            Firme verificate
            </b-form-checkbox>
        </div>

        <!-- <div class="my-4">
            <b-form-checkbox v-model="checkedProjects" name="check-button" switch @change="toggleProjects">
            Portofoliu proiecte <b>(S: {{ checkedProjects }})</b>
            </b-form-checkbox>
        </div> -->
    </section>


    <!-- <section class='widget widget_categories'>
        <h3 class='widget-title'>Categorii</h3>

        <ul>
        <li>
            <input id='categories1' type='checkbox' />
            <label htmlFor='categories1'>Arhitectură</label>
        </li>
        <li class='see-all-btn'>
            <span>Arată tot</span>
        </li>
        </ul>
    </section> -->

    <!-- <section class='widget widget_features'>
        <h3 class='widget-title'>Județ</h3>

        <ul>
        <li>
            <input id='categories1' type='checkbox' />
            <label htmlFor='categories1'>Alba</label>
        </li>
        <li>
            <input id='categories2' type='checkbox' />
            <label htmlFor='categories2'>Arad</label>
        </li>
        <li>
            <input id='categories3' type='checkbox' />
            <label htmlFor='categories3'>Argeș</label>
        </li>
        <li>
            <input id='categories4' type='checkbox' />
            <label htmlFor='categories4'>Bihor</label>
        </li>
        <li>
            <input id='categories5' type='checkbox' />
            <label htmlFor='categories5'>Brașov</label>
        </li>
        <li class='hide'>
            <input id='categories6' type='checkbox' />
            <label htmlFor='categories6'>Brăila</label>
        </li>
        <li class='hide'>
            <input id='categories7' type='checkbox' />
            <label htmlFor='categories7'>Botoșani</label>
        </li>
        <li class='hide'>
            <input id='categories8' type='checkbox' />
            <label htmlFor='categories8'>Buzău</label>
        </li>
        <li class='see-all-btn'>
            <span>Arată tot</span>
        </li>
        </ul>
    </section> -->
</aside>
</template>

<script>
export default {
    data(){
        return {
            checkedVerified: false,
            checkedProjects: false,
            blockLoading: false
        }
    },

    // props: ['empty'],

    computed:{
        search_loading_status() {
            return this.$store.state.search_companies.loading_status;
        },
        block_button: function(){
            return this.$store.state.search_companies.block_button;
        },
        result_companies() {
            return this.$store.state.search_companies.total_results;
        },
        filter_state() {
            return this.$store.state.search_companies.filter_state;
        },
        // verified_state: function(){
        //     this.checkedVerified = this.filter_state == true ? true : false;
        //     return this.checkedVerified;
        // }
    },

    watch: {
        // whenever question changes, this function will run
        filter_state: function () {
            this.checkedVerified = this.filter_state
        }
    },

    methods: {
        toggleVerified: async function(){
            // this.$store.commit('companies/toggle_verified', this.checkedVerified);
            // this.$store.dispatch('search_companies/toggle_verified', this.checkedVerified);
            this.blockLoading = true;
            if(this.checkedVerified == true){
                await this.$store.dispatch('search_companies/filterVerifiedCompanies', this.checkedVerified).finally(() => {
                    setTimeout(() => {
                        this.blockLoading = false;
                    }, 1000);
                });
            } else {
                await this.$store.dispatch('search_companies/filterSearch').finally(() => {
                    setTimeout(() => {
                        this.blockLoading = false;
                    }, 1000);
                });
            }

            

        },
        toggleProjects: function(){
            // this.$store.commit('companies/toggle_projects', this.checkedProjects);
            // this.$store.dispatch('companies/toggleProjects', this.checkedProjects)
        },
    },

    created(){
        this.checkedVerified = this.filter_state;
        // this.checkedProjects = this.$store.state.companies.checkedProjects;
    }
}
</script>

<style scoped>
.title {
    font-size: 22px!important;
    margin-bottom: 25px;
    position: relative;
}
</style>