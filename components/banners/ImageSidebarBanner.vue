<template>
<div>

  <img v-if="item.photo_exists" :src="BASE_URL + '/storage/banners/' + item.image" @click.prevent="openModal" class="pointer fit-image" />
  <img v-else :src="require('@/assets/images/default-banner.jpg')" class="pointer fit-image" />


  <b-modal v-model="modalShow" 
    class="modal-dialog" id="companyDetailsModal" 
    hide-footer lazy size="lg" 
    :title="`Detalii ${item.name}`"
    >
        
        <template v-if="show_form_value">
            <button class="btn btn-secondary btn-sm my-2 mx-4" @click.prevent="$store.commit('banners/toggle_show_form')"><i class="fa fa-angle-left" aria-hidden="true"></i> Înapoi la anunț</button>
            <SendMessageBanner :banner="item" />
        </template>

        <SingleBanner :item="item" v-else />
    </b-modal>
</div>
</template>

<script>
import SingleBanner from './SingleBanner.vue';
import SendMessageBanner from './SendMessageBanner.vue';
export default {
    props: ["item"],

    components: {
        SendMessageBanner,
        SingleBanner
    },

    computed: {
        show_form_value: function(){
            return this.$store.state.banners.show_form;
        }
    },

    data(){
        return {
            modalShow: false,
            BASE_URL: null
        }
    },

    methods: {
        openModal: function(){
            this.$store.commit('banners/set_show_form', false);
            this.modalShow = !this.modalShow;
        },
    },

    created(){
        this.BASE_URL = process.env.NODE_ENV == 'production' ? process.env.PROD_URL : process.env.BASE_URL;
    }
}
</script>

<style scoped>
.fit-image {
    width: 100%;height: 360px!important;max-height: 360px!important;
    object-fit: cover;
}

.pointer {
    cursor: pointer;
}
</style>