<template>
    <section class='category-area pt-100 pb-70'>
        <div class='container'>
            <div class='section-title' v-if="titleOne">
              <h2>Categorii de lucru</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra.
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
            <div class='col-lg-2 col-sm-6 col-md-4' :class="{hide: (index > 16 && isHidden)}" :key="category.uuid">
              <div class='single-category-box'>
                <div class='icon'>
                  <i class='flaticon-cooking'></i>
                </div>
                <h3>{{ category.name }}</h3>
                <span>16 membri</span>
                <NuxtLink :to="{name: 'categorie-category', params: {category: category.slug}}">
                  <a class='link-btn'></a>
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

    
}
</script>

<style scoped>
.single-category-box h3 {
  font-size: 14px!important;
}

.hide {
  display: none;
}
</style>