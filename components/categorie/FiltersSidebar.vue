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

    <section class='widget widget_features'>
        <h3 class='title'>Județ</h3>
        <b-form-radio-group
            v-model="selected"
            @change="changeJudet"
            :options="showLess ? judeteOptionsLess : judeteOptions"
            class="mb-3"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
            stacked
        ></b-form-radio-group>
        <ul>
            <li class='see-all-btn' @click.prevent="showLess = !showLess">
                <span v-if="showLess">Arată mai multe</span>
                <span v-else>Arată mai puține</span>
            </li>
        </ul>
    

        <!-- <ul v-if="judete && judete.length > 0">
            <li v-for="(judet, index) in judete" :key="judet.id" :class="{hide: index > 10 && isHidden}">
                <input :id='judet.code' type='checkbox' />
                <label :htmlFor='judet.code'>{{ judet.name }}</label>
            </li>
            <li class='see-all-btn' @click.prevent="isHidden = !isHidden">
                <span v-if="isHidden">Arată mai multe</span>
                <span v-else>Arată mai puține</span>
            </li>
        </ul> -->
    </section>
</aside>
</template>

<script>
export default {
    data(){
        return {
            checkedVerified: false,
            checkedProjects: false,
            isHidden: true,

            selected: 'toate',
            judeteOptions: [],
            judeteOptionsLess: [],
            showLess: true,
        }
    },

    computed:{
        search_loading_status() {
            return this.$store.state.companies.loading_status;
        },
        judete() {
            return this.$store.state.judete.judete;
        },
    },

    methods: {
        toggleVerified: function(){
            this.$store.commit('category_companies/toggle_verified', this.checkedVerified);
            this.$store.dispatch('category_companies/toggleVerified', this.checkedVerified);
        },
        toggleProjects: function(){
            // this.$store.commit('companies/toggle_projects', this.checkedProjects);
            // this.$store.dispatch('companies/toggleProjects', this.checkedProjects)
        },

        changeJudet: function(){
            
            this.$store.dispatch('category_companies/filterJudet', this.selected)
        }
    },

    created(){
        this.checkedVerified = this.$store.state.companies.checkedVerified;
        this.checkedProjects = this.$store.state.companies.checkedProjects;

        if(this.judete.length > 0) {
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