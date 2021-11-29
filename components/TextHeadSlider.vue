<template>
<div class="my-4">
  <h1 class="banner-two-heading font35" >
        <span class='typewrite mr-0'>
        Firme și profesioniști în</span> 
        <vuejsTypist class="changing-text" :words="['arhitectură','amenajări','construcții','design interior','electricitate','instalații','renovări','zidărie','orice domeniu']" :human="true" :pause-interval="1000" />
    </h1>
</div>
</template>

<script>
import vuejsTypist from 'vuejs-typist'

export default {
    components: {
        vuejsTypist
    },


}
</script>

<style>
.hide {
    display: none;
}

.font35 {
    font-size: 30px!important;
}

.font20 {
    font-size: 20px!important;
}

.font25 {
    font-size: 27px!important;
}
</style>