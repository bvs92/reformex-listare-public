<template>
   
      <div class="navbar-area">
        <div class='d-inline-flex justify-content-between' style="width: 100%;" v-if="windowWidth < 1200">
          <div class="justify-content-start">
            <div class='logo'>
                <a href='/index-2'>
                  <a>
                    <Logo />
                  </a>
                </a>
              </div>
          </div>

          <div class='justify-content-end'>
              <BurgerMenu />
          </div>

        </div>

        <div class='miran-nav show' v-if="windowWidth >= 1200">
          <div class='container-fluid'>
            <nav class='navbar navbar-expand-md navbar-light'>
            <a href='/' class="navbar-brand">
                <Logo />
            </a>
              <div class='collapse navbar-collapse mean-menu'>
            

                <ul class='navbar-nav'>
                  <li class='nav-item'>
                    <NuxtLink to='/' class='nav-link'>
                      Acasă
                    </NuxtLink>
                  </li>

                  <li class='nav-item'>
                    <NuxtLink to='/cautare' class='nav-link'>
                      Caută
                    </NuxtLink>
                  </li>


                  <li class='nav-item'>
                    <a href='https://www.reformex.ro' class='nav-link'>
                      Site principal
                    </a>
                  </li>

                  <li class='nav-item'>
                    <a href='https://reformexapp.eu' class='nav-link'>
                      Platformă șantiere
                    </a>
                  </li>

                  <li class='nav-item'>
                    <a href='https://www.reformex.ro/contact-2' class='nav-link'>
                      Contact
                    </a>
                  </li>
                </ul>

                <div class='others-option d-flex align-items-center'>

                  <div class='option-item'>
                    <NuxtLink
                      to='/inscriere-firma'
                      activeClass='active'
                    >
                      <a class='default-btn button-one'>
                        <i class='flaticon-more'></i> Adaugă firmă
                      </a>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

    
      </div>
</template>

<script>
import Logo from "../global/Logo.vue";
import BurgerMenu from "./BurgerMenu.vue";


export default {
    components: {
        Logo,
        BurgerMenu
    },

    data(){
        return {
            windowWidth: process.browser ? window.innerWidth : null
        }
    },

    watch: {
        windowWidth(newWidth, oldWidth) {
            // console.log(`it changed to ${newWidth} from ${oldWidth}`);
        }
    },

    created() {
        if (process.browser){
            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize);
            })
        }
    },

    beforeDestroy() { 
        if (process.browser){
            window.removeEventListener('resize', this.onResize); 
        }
    },

    methods: {  
        onResize() {
            this.windowWidth = window.innerWidth
        }
    },
}
</script>