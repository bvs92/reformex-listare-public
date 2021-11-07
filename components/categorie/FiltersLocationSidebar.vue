<template>
<aside class='listings-widget-area'>

    <section class='widget widget_categories'>
        <h3 class='title'>Filtrări rezultate</h3>
        <div class="my-4">
            <b-form-checkbox v-model="checkedVerified" name="check-button" switch @change="toggleVerified" :disabled="search_loading_status ? true : false || blockLoading ? true : false || empty">
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

</aside>
</template>

<script>
export default {
    data(){
        return {
            checkedVerified: false,
            checkedProjects: false,
            isHidden: true,
            blockLoading: false

        }
    },

    props: ['empty'],

    computed:{
        search_loading_status() {
            return this.$store.state.category_city_companies.loading_status;
        },

        filter_state() {
            return this.$store.state.category_city_companies.filter_state;
        },
       
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
                await this.$store.dispatch('category_city_companies/filterVerifiedCompanies', this.checkedVerified).finally(() => {
                    setTimeout(() => {
                        this.blockLoading = false;
                    }, 1000);
                });
            } else {
                await this.$store.dispatch('category_city_companies/filterSearch').finally(() => {
                    setTimeout(() => {
                        this.blockLoading = false;
                    }, 1000);
                });
            }

            

        },
    },

    created(){
        this.checkedVerified = this.filter_state;
        // this.checkedVerified = this.$store.state.category_city_companies.checkedVerified;
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