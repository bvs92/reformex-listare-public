<template>
<transition name="page">
 <section class='listings-details-area pb-70' v-if="company">
    <HeaderImage :company="company" />

    <div class='listings-details-nav'>
        <div class='container'>
        <ul class='nav nav-tabs'>
            <li class='nav-item' v-if="company.public_profile">
                <a class='nav-link to-section' @click.prevent="goToSection('detalii')">
                    Detalii firmă
                </a>
            </li>
            <li class='nav-item' v-if="company.projects && company.projects.length > 0">
                <a class='nav-link to-section' @click.prevent="goToSection('proiecte')">
                    Portofoliu proiecte
                </a>
            </li>

            <li class='nav-item' v-if="company.company.questions && company.company.questions.length > 0">
                <a class='nav-link to-section' @click.prevent="goToSection('questions')">
                    Întrebări frecvente
                </a>
            </li>

            <li class='nav-item'>
                <a class='nav-link to-section' @click.prevent="goToSection('contact')">
                    Contact
                </a>
            </li>
        </ul>
        </div>
    </div>

    <div class='container'>
        <div class='row' id="detalii">
        <div class='col-lg-8 col-md-12'>
            <div class='listings-details-desc'>
            <CompanyDetails :company="company" v-if="company.public_profile" ref="detalii" />

            <WorkCategories :categories="company.categories" />
            <br/>
            <WorkZones :zones="company.judets" />
            <br/>
            <WorkProjects :projects="company.projects" ref="proiecte" />
            <br/>
            <Questions :questions="company.company.questions" />

        


            

        </div>
        </div>

        <div class='col-lg-4 col-md-12'>
            <div class='listings-sidebar' id="contact">
                <ContactDetails :company="company" />
                <UserDetails :company="company" />
                <SendMessage :company="company" />
                <!-- <BannerSidebar :full="true" /> -->
            </div>
        </div>
        </div>
    </div>
    
    <RegisterSmall />

    </section>
</transition>
</template>

<script>
import {BASE_URL} from '@/config.js'
import https from 'https'
import HeaderImage from "@/components/pagina-detalii/HeaderImage.vue";
import WorkCategories from "@/components/pagina-detalii/WorkCategories.vue";
import WorkZones from "@/components/pagina-detalii/WorkZones.vue";
import CompanyDetails from "@/components/pagina-detalii/CompanyDetails.vue";
import WorkProjects from "@/components/pagina-detalii/WorkProjects.vue";
import Questions from "@/components/pagina-detalii/Questions.vue";
import ContactDetails from "@/components/pagina-detalii/ContactDetails.vue";
import SendMessage from "@/components/pagina-detalii/SendMessage.vue";
import UserDetails from "@/components/pagina-detalii/UserDetails.vue";
import Loader from "@/components/global/Loader.vue";
import RegisterSmall from "@/components/common/RegisterSmall.vue"
import BannerSidebar from "@/components/banners/BannerSidebar.vue"

export default {
    head() {
        return {
            title: this.company_name,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: `${this.company_name}. La noi găsești doar firme verificate. Du-ți proiectul la bun sfârșit!`
                }
            ]
        }
    },

    components: {
        HeaderImage,
        WorkCategories,
        WorkZones,
        CompanyDetails,
        WorkProjects,
        ContactDetails,
        SendMessage,
        Questions,
        UserDetails,
        Loader,
        RegisterSmall,
        BannerSidebar
    },

    data(){
        return {
            result: null
        }
    },

    computed: {
        company() {
            return this.$store.state.company.company;
            // return this.result.company;
        },
        company_name: function(){
            if(this.company){
                return `Detalii firmă ${this.company.company.name} - REFORMEX`
            } else {
                return `Detalii firmă - REFORMEX`
            }
        }
    },

    methods: {
        goToSection: function(section_name){
            let element = document.getElementById(section_name);
            if(element){
                element.scrollIntoView({behavior: 'smooth'});
            }
        },
    },

    async fetch(){
        await this.$store.dispatch('company/initCompany', this.$route.params.slug);
        // await console.log(this.$route.params.slug);
        // console.log(this.company);
    },

    // async asyncData({ route, $http, store, redirect }) {


    //     let httpsAgent = new https.Agent({
    //         rejectUnauthorized: false,
    //       });


    //     let config = $http.onRequest(config => {
    //         config.agent = httpsAgent;
    //     })


    //     let username = decodeURI(route.params.slug);
    //     let final_url = `${BASE_URL}/api/company/get/public/${username}`;

        
    //     // requests to server
    //     const [result] = await Promise.all([ 
    //         $http.$get(final_url, config),
    //     ])


    //     if(!result || result.error){
    //         redirect('/pagina-negasita')
    //         return;
    //     }


    //     if(result.company){
    //         await store.commit('company/set_company', result.company);
    //     } else {
    //         redirect('/pagina-negasita')
    //     }

    //     // console.log(result);
    //     return {result}
    // },
}
</script>


<style scoped>
.to-section {
    cursor: pointer;
}
</style>