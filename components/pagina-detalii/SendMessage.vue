<template>
    <div class='listings-widget book_listings'>
        <h3>Trimite mesaj</h3>
        <a href='#' class='default-btn' @click.prevent="modalShow = !modalShow">
        Trimite mesaj
        </a>
        <span>
        Vei primi ofertă de la această firmă.
        </span>

        <b-modal id="contact-company" v-model="modalShow" size="lg" :title="'Trimite mesajul tău către ' + company.company.name" no-close-on-backdrop hide-footer>
          <SendMessageForm :company="company" />
        </b-modal>

    </div>
</template>

<script>
import SendMessageForm from './SendMessageForm.vue'

  export default {
    components: {
      SendMessageForm
    },
    data() {
      return {
        modalShow: false
      }
    },

    props: ["company"]
  }
</script>

<style>
#contact-company___BV_modal_content_ {
    background-color: white;
    border: none;
    border-radius: 0;
    -webkit-box-shadow: 5px 5px #0ec6c6;
    box-shadow: 5px 5px #0ec6c6;
    border: 1px solid #0ec6c6;
}
</style>