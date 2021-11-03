<template>
<div class='page-title-area page-title-bg1'>
    <div class='container'>
        <div class='page-title-content'>
        <h2>{{ pageTitle }}</h2>
        <ul>
            <li>
            <NuxtLink to='/'>
                <a>Pagina de start</a>
            </NuxtLink>
            </li>
            <li>{{ pageName }}</li>
        </ul>
        </div>
    </div>
    </div>
</template>


<script>
export default {
    props: {
        pageTitle: String,
        pageName: String
    }
}
</script>

<style scoped>
.page-title-area {
    padding-top: 100px!important;
    padding-bottom: 100px!important;
    opacity: 0.9;
}
</style>