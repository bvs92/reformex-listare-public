<template>
  <div>
    <GoToTop />
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/main/Navbar.vue"
import Footer from "../components/main/Footer.vue"
import Loader from "../components/global/Loader.vue"
import GoToTop from "../components/global/GoToTop.vue"

export default {
    loading: '~/components/global/Loader.vue',

    data(){
        return {
            loading: false
        }
    },
    components: {
        Navbar,
        Footer,
        Loader,
        GoToTop
    },

  

    created() {
        // this.loading = true;

        // setTimeout(() => {
        //     this.loading = false;
        // }, 500)

        // this.$nextTick(() => {
        //     this.loading = true;
        // setTimeout(() => {
        //     this.loading = false;
        // }, 500)
        // })
    },

    mounted() {
        this.$nextTick(() => {
        this.$nuxt.$loading.start();
        setTimeout(() => {
            this.$nuxt.$loading.finish();
        }, 500)
        })
    },



}
</script>