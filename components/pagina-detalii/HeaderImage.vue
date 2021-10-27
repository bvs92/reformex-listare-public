<template>
    <div class='listings-details-image' v-if="company">
     
        <div class="black-cover"></div>
        <img src='~assets/images/reformex-cover-heads.png' alt='firma' />
     

        <div class='container' v-if="company.company">
            <div class='container'>
                <div class='listings-details-content'>
                    <h1 class="my-3 big-title">{{ company.company.name }}</h1>

                    <span class='meta' v-if="company.first_categories && company.first_categories.length > 0">
                        <i class="fa fa-info" aria-hidden="true"></i>
                        <span class="mr-2 span-category" v-for="category in company.first_categories" :key="category.id">{{ category.name }}</span>
                    </span>
                

                    <ul class='d-flex align-items-center'>
                        <li class='phone-number'>
                        <a v-if="phoneHidden" @click.prevent="showPhone" class="hiddenPhone">
                            <i class="fa fa-phone-square" aria-hidden="true"></i> Arată telefon
                        </a>
                        <a :href="'tel:' + company.company.phone" v-else>
                            <i class="fa fa-phone-square" aria-hidden="true"></i> {{ company.company.phone }}
                        </a>
                        </li>
                        <li class='time' v-if="company.badge">
                            <!-- <i class="fa fa-info" aria-hidden="true"></i> -->
                            <span>Stare firmă</span>
                            <template v-if="company.badge.verified == 1">Verificată</template>
                            <template v-else>Neverificată</template>
                        </li>
                        <li class='location' v-if="company.company.location">
                            <!-- <i class="fa fa-map-marker" aria-hidden="true"></i> -->
                            <span>Locație firmă</span>
                            <template v-if="company.company.location.value">{{ company.company.location.value }}</template>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        

        <!-- <div class='container-fluid'>
        <ul class='share-save'>
            <li>
            <div class='share'>
                <i class='bx bx-share-alt'></i> Partajează
            </div>

            <div class='social'>
                <a href='#' >
                <i class="fa fa-facebook-square" aria-hidden="true"></i>
                </a>
                <a href='#' >
                <i class="fa fa-twitter-square" aria-hidden="true"></i>
                </a>
            </div>
            </li>
        </ul>
        </div> -->
    </div>
</template>


<script>
export default {
    data(){
        return {
            phoneHidden: true
        }
    },

    props: ["company"],


    methods: {
        showPhone: function(){
            this.phoneHidden = !this.phoneHidden;
        }
    }
}
</script>

<style scoped>
.hiddenPhone {
    cursor: pointer;
}

.span-category {
    background: #e8e8e8;
    padding: 4px;
    border-radius: 5px;
    color: #00999d;
}

.black-cover {
    display: block;
    width: 100%;
    height: 100%;
    background: rgb(24,34,34);
background: linear-gradient(0deg, rgba(24,34,34,1) 0%, rgba(31,194,179,1) 100%);
    position: absolute;
    opacity: 0.8;
}

.big-title {
    font-size: 34px!important;
}
</style>