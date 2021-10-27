<template>
    <div class="my-5" v-if="categories && categories.length > 0">
        <h3>Categorii de lucru</h3>
            <ul class='amenities-list'>
                <li v-for="category in categories" :key="category.id">
                    <span>
                        <i class="fa fa-check" aria-hidden="true"></i> {{ category.name }}
                    </span>
                </li>
            </ul>
    </div>
</template>


<script>
export default {
    props: {
        categories: Array
    }
}
</script>

<style scoped>
.listings-details-desc .amenities-list li span i {
    font-size: 14px!important;
}
</style>