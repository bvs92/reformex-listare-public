<template>
<aside class='listings-widget-area'>

    <section class='widget widget_categories'>
        <h3 class='title'>Filtrări rezultate</h3>
        <div class="my-4">
            <b-form-checkbox 
            v-model="checkedVerified" 
            name="check-button" switch 
            @change="toggleVerified" :disabled="search_loading_status ? true : false || blockLoading ? true : false">
            Firme verificate
            </b-form-checkbox>
        </div>
    </section>


    <client-only>
    <section class='widget widget_features' v-if="judete && judete.length > 0">
        <h3 class='title'>Județ</h3>
        <b-form-radio-group
            v-model="selected_judet"
            @change="changeJudet"
            :options="showLess ? judeteOptionsLess : judeteOptions"
            class="mb-3"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
            stacked
            :disabled="search_loading_status ? true : false || blockLoading ? true : false"
        ></b-form-radio-group>
        <ul>
            <li class='see-all-btn' @click.prevent="showLess = !showLess">
                <span v-if="showLess">Arată mai multe</span>
                <span v-else>Arată mai puține</span>
            </li>
        </ul>
    
    </section>
    </client-only>

</aside>
</template>

<script>
export default {
    data(){
        return {
            checkedVerified: false,
            checkedProjects: false,
            isHidden: true,

            selected_judet: 'toate',
            judeteOptions: [],
            judeteOptionsLess: [],
            showLess: true,
            blockLoading: false
        }
    },

    computed:{
        search_loading_status() {
            return this.$store.state.category_companies.loading_status;
        },
        current_category_slug() {
            return this.$store.state.category_companies.current_slug;
        },
        judete() {
            return this.$store.state.judete.judete;
        },

        filter_state() {
            return this.$store.state.category_companies.filter_state;
        },
        current_location() {
            return this.$store.state.category_companies.current_location;
        },
    },

    watch: {
        // whenever question changes, this function will run
        filter_state: function () {
            this.checkedVerified = this.filter_state
        }
    },

    // props: ["judete"],

    methods: {
        toggleVerified: async function(){
            // this.$store.commit('companies/toggle_verified', this.checkedVerified);
            // this.$store.dispatch('search_companies/toggle_verified', this.checkedVerified);
            
            this.blockLoading = true;
            if(this.checkedVerified == true){
                await this.$store.dispatch('category_companies/filterVerifiedCompanies', this.checkedVerified).finally(() => {
                    setTimeout(() => {
                        this.blockLoading = false;
                    }, 1000);
                });
            } else {
                await this.$store.dispatch('category_companies/filterCompanies').finally(() => {
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

        changeJudet: async function(){
            // console.log(this.selected_judet);
            await this.$store.commit('category_companies/set_current_location', this.selected_judet);
            this.$store.commit('category_companies/set_initial_load', false);

            this.blockLoading = true;
            if(this.checkedVerified == true){
                await this.$store.dispatch('category_companies/filterVerifiedCompanies', this.checkedVerified).finally(() => {
                    setTimeout(() => {
                        this.blockLoading = false;
                    }, 1000);
                });
            } else {
                await this.$store.dispatch('category_companies/filterCompanies').finally(() => {
                    setTimeout(() => {
                        this.blockLoading = false;
                    }, 1000);
                });
            }

            // this.$store.dispatch('category_companies/filterJudet', this.selected_judet)
        }
    },

    async created(){
        this.checkedVerified = this.filter_state;
        this.selected_judet = this.current_location;
        // console.log('this.checkedVerified', this.checkedVerified);
        // this.checkedVerified = this.$store.state.companies.checkedVerified;
        // this.checkedProjects = this.$store.state.companies.checkedProjects;

        await this.$store.dispatch('judete/initJudete');


        if(this.judete && this.judete.length > 0) {
            console.log('judelete filters', this.judete)
            let first_elem = {
                item: 'toate',
                name: 'Toată România'
            }
            this.judeteOptions.push(first_elem);

            this.judete.forEach(element => {
                let judet = {
                    item: element.code,
                    name: element.name
                }
                this.judeteOptions.push(judet);
            });

            this.judeteOptionsLess = this.judeteOptions.slice(0, 10);
        }
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