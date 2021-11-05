<template>
    <section class='category-area pt-100 pb-70'>
        <div class='container'>
            <div class='section-title' v-if="titleOne">
              <h2>Categorii de lucru</h2>
              <p>
                Ce proiect ai în plan? Poate vrei să schimbi acoperișul sau să construiești o casă din lemn undeva la munte. Noi îți facem găsirea unei firme sau profesionist mai rapidă. Caută o firmă în funcție de categoria din care face parte proiectul tău.
              </p>
            </div>
            <div class='section-title text-left' v-else>
              <h2>Explorează categorii</h2>
              <a to='#' class='link-btn'>
                Arată tot <i class='flaticon-right-chevron'></i>
              </a>
            </div>


          <div class='row' v-if="categories && categories.length > 0">

            <template v-for="(category, index) in categories">
            <div class='col-lg-2 col-sm-6 col-md-4' :class="{hide: (index > 16 && isHidden)}" :key="category.uuid" >
              <div class='single-category-box'>
                <div class='icon-normal'>
                  <!-- <img src="~assets/icons/arhitectura.svg" /> -->
                  <img :src="getIcon(category.slug)" />
                </div>
                <h3>{{ category.name }}</h3>
                <span><i class="fa fa-dot-circle-o" aria-hidden="true"></i></span>
                <NuxtLink :to="{name: 'categorie-category', params: {category: category.slug}}"  class="link-btn">
                  <!-- <a class='link-btn'></a> -->
                </NuxtLink>
              </div>
            </div>
            </template>

            <div class='col-lg-2 col-sm-6 col-md-4'>
              <div class='single-category-box more-categories'>
                <div class='icon'>
                  <i class='flaticon-more-1'></i>
                </div>
                <h3 v-if="isHidden">Afișează mai multe</h3>
                <h3 v-else>Afișează mai puține</h3>
                <a href="#" @click.prevent="isHidden = !isHidden">
                  <a class='link-btn'></a>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<script>

export default {

    data(){
        return {
            titleOne: true,
            titleTwo: true,
            isHidden: true
        }
    },

    computed: {
      categories() {
        return this.$store.state.categories.categories;
      }
    },

    methods: {
      getIcon: function(slug){
        try {
          return require(`@/assets/icons/${slug}.svg`)
        } catch(error){
          return require(`@/assets/icons/default.svg`)
        }
        
      },

      
    },



    created(){
      // reset initial load when going back from a category
      this.$store.commit('category_companies/set_initial_load', true);
    }

    
}
</script>

<style scoped>
.single-category-box h3 {
  font-size: 14px!important;
}

.hide {
  display: none;
}

.single-category-box .icon-normal {
  border-radius: 5%!important;
  background: none!important;
}




.architecture {
  /* background-image: url('@/assets/icons/arhitectura.svg?inline'); */
  
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: visible;
}

</style>