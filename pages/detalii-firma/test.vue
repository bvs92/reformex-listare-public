<template>
 <section class='listings-details-area pb-70'>
    <HeaderImage />

    <div class='listings-details-nav'>
        <div class='container'>
        <ul class='nav nav-tabs'>
            <li class='nav-item'>
            <a class='nav-link to-section' @click.prevent="goToSection('detalii')">
                Detalii firmă
            </a>
            </li>
            <li class='nav-item'>
            <a class='nav-link to-section' @click.prevent="goToSection('proiecte')">
                Portofoliu proiecte
            </a>
            </li>
        </ul>
        </div>
    </div>

    <div class='container'>
        <div class='row' id="detalii">
        <div class='col-lg-8 col-md-12'>
            <div class='listings-details-desc'>
           <CompanyDetails />

            <WorkCategories />

            <WorkProjects />

            <Questions />

        


            

        </div>
        </div>

        <div class='col-lg-4 col-md-12'>
            <div class='listings-sidebar'>
                <ContactDetails />
                <UserDetails />
                <SendMessage />

            </div>
        </div>
        </div>
    </div>
    </section>
</template>

<script>
import HeaderImage from "@/components/pagina-detalii/HeaderImage.vue";
import WorkCategories from "@/components/pagina-detalii/WorkCategories.vue";
import CompanyDetails from "@/components/pagina-detalii/CompanyDetails.vue";
import WorkProjects from "@/components/pagina-detalii/WorkProjects.vue";
import Questions from "@/components/pagina-detalii/Questions.vue";
import ContactDetails from "@/components/pagina-detalii/ContactDetails.vue";
import SendMessage from "@/components/pagina-detalii/SendMessage.vue";
import UserDetails from "@/components/pagina-detalii/UserDetails.vue";

export default {
    components: {
        HeaderImage,
        WorkCategories,
        CompanyDetails,
        WorkProjects,
        ContactDetails,
        SendMessage,
        Questions,
        UserDetails
    },

    methods: {
        goToSection: function(section_name){
            let element = document.getElementById(section_name).offsetTop;
            window.scrollTo({ top: element, behavior: 'smooth'});
        }
    }
}
</script>


<style scoped>
.to-section {
    cursor: pointer;
}
</style>