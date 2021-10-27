<template>
    <div class="mt-5">
        <h3>Întrebări și răspunsuri</h3>
        <div id='intrebari'>
            <ul class='pricing-list'>
                <li v-b-toggle="`collapse-${index}`" v-for="(item, index) in 5" :key="index">
                    Cât costă serviciile? <span></span>
                    <!-- Element to collapse -->
                    <b-collapse :id="`collapse-${index}`" class="mt-4">
                        <b-card class="content-small">{{index}} - I am collapsible content!</b-card>
                    </b-collapse>
                </li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.content-small {
    font-size: 16px;
    font-weight: 400;
}
</style>