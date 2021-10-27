<template>
<aside class='listings-widget-area'>

    <section class='widget widget_categories'>
        <h3 class='title'>Filtrări rezultate</h3>
        <div class="my-4">
            <b-form-checkbox v-model="checkedVerified" name="check-button" switch @change="toggleVerified" :disabled="search_loading_status ? true : false">
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
        }
    },

    computed:{
        search_loading_status() {
            return this.$store.state.companies.loading_status;
        },
    },

    methods: {
        toggleVerified: function(){
            // this.$store.commit('companies/toggle_verified', this.checkedVerified);
            this.$store.dispatch('companies/toggleVerified', this.checkedVerified);
        },
        toggleProjects: function(){
            // this.$store.commit('companies/toggle_projects', this.checkedProjects);
            this.$store.dispatch('companies/toggleProjects', this.checkedProjects)
        },
    },

    created(){
        this.checkedVerified = this.$store.state.companies.checkedVerified;
        this.checkedProjects = this.$store.state.companies.checkedProjects;
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