<template>
    <div class="my-5" v-if="zones && zones.length > 0">
        <h3>Zone de lucru</h3>
            <ul class='amenities-list'>
                <li v-for="zone in zones" :key="zone.id">
                    <span>
                        <i class="fa fa-map-marker" aria-hidden="true"></i> {{ zone.name }}
                    </span>
                </li>
            </ul>
    </div>
</template>


<script>
export default {
    props: {
        zones: Array
    }
}
</script>

<style scoped>
.listings-details-desc .amenities-list li span i {
    font-size: 14px!important;
}
</style>