<template>
    <div v-if="company.public_profile.description" class="pb-4">
        <h2 class="h">Detalii companie</h2>
       <div v-html="company.public_profile.description" class="mb-5">

       </div>
    </div>
</template>

<script>
export default {
    props: {
        company: Object
    }
}
</script>

<style scoped>
.h {
    font-size: 26px!important;
}
</style>