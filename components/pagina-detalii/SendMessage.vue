<template>
    <div class='listings-widget book_listings'>
        <h3>Trimite mesaj</h3>
        <a href='#' class='default-btn' @click.prevent="modalShow = !modalShow">
        Trimite mesaj
        </a>
        <span>
        Vei primi ofertă de la această firmă.
        </span>

        <b-modal v-model="modalShow" size="lg" :title="'Trimite mesajul tău către ' + company.company.name" no-close-on-backdrop hide-footer>
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