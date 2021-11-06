<template>
<div>
  <h1 class="banner-two-heading" :class="{'font35' : windowWidth > 700, 'font20' : windowWidth < 700, 'row' : windowWidth < 800}">
        <span class='typewrite' :class="{'col-lg-12' : windowWidth < 800}">
        Firme și profesioniști în
        </span> 
        <vuejsTypist :class="{'col-lg-12' : windowWidth < 800}" :words="['arhitectură','amenajări','construcții','design interior','electricitate','instalații','renovări','zidărie','orice domeniu']" :human="true" :pause-interval="1000" />
    </h1>
    <h3 class="title is-3">
        Width: {{ windowWidth }} px
    </h3>
</div>
</template>

<script>
import vuejsTypist from 'vuejs-typist'

export default {
    components: {
        vuejsTypist
    },

    data(){
        return {
            windowWidth: process.browser ? window.innerWidth : null
        }
    },

    watch: {
        windowWidth(newWidth, oldWidth) {
            console.log(`it changed to ${newWidth} from ${oldWidth}`);
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

<style>
.hide {
    display: none;
}

.font35 {
    font-size: 35px!important;
}

.font20 {
    font-size: 20px!important;
}
</style>