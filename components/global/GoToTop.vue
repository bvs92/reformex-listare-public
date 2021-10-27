<template>
<div v-if="isVisible" class='go-top active' @click="scrollToTop()">
    <!-- <i class='flaticon-direction'></i> -->
    <i class="fa fa-arrow-up" aria-hidden="true"></i>
</div>
</template>

<script>
export default {
    data(){
        return {
            isVisible: false
        }
    },

    methods: {
        scrollToTop(){
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },

        toggleVisibility(){
            if (window.pageYOffset > 300) {
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
        }
    },

    mounted(){
        window.addEventListener('scroll', this.toggleVisibility, true);
    }
}
</script>