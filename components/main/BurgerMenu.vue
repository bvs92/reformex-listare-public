<template>
<div>
    <b-button v-b-toggle.sidebar-backdrop class="float-right mr-2" ><i class="fa fa-bars" aria-hidden="true"></i></b-button>

   <b-sidebar
      id="sidebar-backdrop"
      title="Meniu"
      :backdrop-variant="variant"
      backdrop
      shadow
      right 
    >
      <div class="px-3 py-2">
        <p class="element pt-2">
            <NuxtLink to='/' class='simple-link'>
                <i class="fa fa-chevron-right" aria-hidden="true"></i> Acasă
            </NuxtLink>
        </p>

        <p class="element pt-2">
            <NuxtLink to='/cautare' class='simple-link'>
                <i class="fa fa-chevron-right" aria-hidden="true"></i> Caută
            </NuxtLink>
        </p>

        <p class="element pt-2">
            <a href="#"><i class="fa fa-chevron-right" aria-hidden="true"></i> Despre noi</a>
        </p>

        <p class="element-special pt-2">
            <NuxtLink
                to='/inscriere-firma'
            >
                <i class='flaticon-more'></i> Adaugă firmă
            </NuxtLink>

        </p>
      </div>
    </b-sidebar>

</div>
</template>

<script>
  export default {
    data() {
      return {
        variant: 'dark'
      }
    }
  }
</script>


<style scoped>
.right-position {
    position: absolute;
    right: 30px;
    top: -35px;
}

.element {
    font-size: 18px;
    border-bottom: 1px solid #dfdfdf;
}

.element-special {
    font-size: 18px;
    font-weight: bold;;
}

.element-special a {
    color: #37a1ad;
}
</style>