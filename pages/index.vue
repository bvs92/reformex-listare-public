<template>
<div>
  <Banner />
  <PopularCategories keep-alive />
  <TopHomeListings />
  <FeedbackZone keep-alive />
  <HowItWorks keep-alive />
  <RegisterOnPlatform keep-alive />
</div>
</template>

<script>
import Banner from "../components/Banner.vue"
import PopularCategories from "../components/PopularCategories.vue"
import TopHomeListings from "../components/TopHomeListings.vue"
import FeedbackZone from "../components/FeedbackZone.vue"
import HowItWorks from "../components/common/HowItWorks.vue"
import RegisterOnPlatform from "../components/common/RegisterOnPlatform.vue"

export default {

  head: {
    title: 'Ai un proiect de realizat? Caută firme și profesioniști în zona ta.',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Ai un proiect de făcut? Caută firme și profesioniști în funcție de categoria de lucru și zona geografică. La noi găsești doar firme verificate.'
      }
    ]
  },

  components: {
    Banner,
    PopularCategories,
    TopHomeListings,
    FeedbackZone,
    HowItWorks,
    RegisterOnPlatform
  },

  data(){
    return {
      topUsers: []
    }
  },



  async fetch(){
    // this.topUsers = await this.$store.state.users.topUsers;

    await this.$store.dispatch('companies/initCompanies');
    await this.$store.dispatch('categories/initCategories');
    await this.$store.dispatch('judete/initJudete');
  }
}
</script>

<style scoped>
@import "../assets/css/home.css";
</style>
