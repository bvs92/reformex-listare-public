<template>
<div>
  <div class="row">
        <div class="col-lg-6 my-2">
            <p><i class="fa fa-info-circle" aria-hidden="true"></i> {{ item.name }}</p>
        </div>
        <div class="col-lg-6 my-2" v-if="item.cui !== null && item.cui.trim() !== 'null' && item.cui.trim() !== ''">
            <p><i class="fa fa-info-circle" aria-hidden="true"></i> {{ item.cui }}</p>
        </div>

        <div class="col-lg-6 my-2">
            <div class='phone-number'>
                <a v-if="phoneHidden" @click.prevent="showPhone" class="hiddenPhone pointer">
                    <i class="fa fa-phone-square" aria-hidden="true"></i> Arată telefon
                </a>
                <a :href="'tel:' + item.phone" v-else>
                    <i class="fa fa-phone-square" aria-hidden="true"></i> {{ item.phone }}
                </a>
            </div>
        </div>

        <div class="col-lg-6 my-2" v-if="item.show_email">
            <div class='email-address'>
                <a v-if="emailHidden" @click.prevent="showEmail" class="hiddenPhone pointer">
                    <i class="fa fa-at" aria-hidden="true"></i> Arată adresă e-mail
                </a>
                <p v-else>
                    <i class="fa fa-at" aria-hidden="true"></i> {{ item.email }}
                </p>
            </div>
        </div>

        <div class="col-lg-6 my-2" v-if="item.location !== null && item.location.trim() !== 'null' && item.location.trim() !== ''">
            <p><i class="fa fa-map-marker" aria-hidden="true"></i> {{ item.location }}</p>
        </div>

    </div> <!-- end row -->

    <div class="row my-2">
        <div class="col-lg-12">
            <p class="title-anunt"><i class="fa fa-info-circle" aria-hidden="true"></i> Detalii anunț</p>
            <p class="anunt">
                {{ item.description }}
            </p>
        </div>
    </div>

    <div class="row mt-4 mb-2">
        <div class="col-lg-6 d-flex justify-content-center" v-if="item.website">
            <button class="btn btn-info" @click.prevent="openWebsite(item.website)"><i class="fa fa-external-link" aria-hidden="true"></i> Accesează site</button>
        </div>
        <div class="col-lg-6 d-flex justify-content-center" v-if="item.has_form">
            <button class="btn btn-secondary" @click.prevent="showForm"><i class="fa fa-envelope" aria-hidden="true"></i> Trimite mesaj</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
           phoneHidden: true,
           emailHidden: true,
        }
    },

    props: ["item"],

    computed: {
        show_form_value: function(){
            return this.$store.state.banners.show_form;
        }
    },

    methods: {
        showPhone: function(){
            this.phoneHidden = !this.phoneHidden;
        },
        showEmail: function(){
            this.emailHidden = !this.emailHidden;
        },

        showForm: function(){
            this.$store.commit('banners/toggle_show_form');
        },

        openWebsite: function(website){
            if(!website.includes('http://') || !website.includes('https://')){
                website = 'https://' + website;
            }

            window.open(website, '_blank')
        }
    }
}
</script>

<style scoped>


.title-anunt {
    font-size: 12px;
    background: #ffedaa;
    width: fit-content;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 20px;
}

.anunt {
    font-size: 14px;
    background: #ffedaa;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 20px;
    color: black;
}

.pointer {
    cursor: pointer;
}

/* .email-address {
    margin-top: 10px;
} */

/* .phone-number a {
  background-color: var(--mainColor);
  border-radius: 5px;
  color: var(--whiteColor);
  position: relative;
  display: block;
  width: fit-content;
  padding-left: 10px;
  padding-right: 15px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
} */

</style>