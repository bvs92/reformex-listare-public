<template>
    <div>
        <TopBanner :pageTitle="'Înscriere firmă'" :pageName="'Înscriere firmă'" />
        <div class="row py-5 background-simple-pattern">
            <div class="col-lg-6">
                 <RegisterForm />
            </div>
            <div class="col-lg-6">
                <div class="register-details">
                    <h2>Beneficiile înscrierii firmei</h2>
                    <div class="mt-5">
                        <ul class="list-benefits">
                            <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Vei face parte dintr-o comunitate formată doar din firme verificate;</li>
                            <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Vei folosi platfoma cu șantiere în mod gratuit;</li>
                            <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Poți căuta proiecte în funcție de categorii și zona geografică;</li>
                            <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Vei obține mai multă vizibilitate pentru firma ta și mai mulți clienți;</li>
                            <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Proces transparent de obținere a clienților;</li>
                            <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Șanse reale, fiecare cerere permite 3 oferte inițial;</li>
                            <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Accesul într-un spațiu virtual specific domeniului construcțiilor;</li>
                            <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Îți vom crea un profil public personalizat;</li>
                            <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Vei fi listat în căutările clienților în funcție de locațiile în care lucrezi și de categoriile alese;</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div>
        <HowItWorksCompany />
        </div>

        <FeedbackZone />

       
    </div>
</template>


<script>
import TopBanner from "@/components/common/TopBanner.vue";
import HowItWorksCompany from "@/components/common/HowItWorksCompany.vue";
import RegisterForm from "@/components/register/RegisterForm.vue";
import FeedbackZone from "@/components/FeedbackZone.vue";



export default {
    head: {
    title: 'Înscriere firmă în platforma REFORMEX',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Ai o firmă și vrei să obții mai multă vizibilitate și mai mulți clienți? Trimite datele firmei și vei face parte din comunitatea noastră.'
      }
    ]
  },

    components: {
        TopBanner,
        RegisterForm,
        HowItWorksCompany,
        FeedbackZone,

    },

    created(){
  
    }
}
</script>

<style scoped>


.row {
    margin-left: 0px!important;
    margin-right: 0px!important;
}

.register-details {
    padding-left: 30px;
}

.register-details h2 {
    color: black;
}

ul {
    padding-left: 0;
    margin-bottom: 0;
    list-style-type: none;
}

ul li {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #070707;
    position: relative;
    padding-left: 26px;
}

.list-benefits > li > i {
    color: #0ec6c6;
}
</style>