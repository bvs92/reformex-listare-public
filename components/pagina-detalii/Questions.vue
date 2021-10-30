<template>
    <div class="mt-5" v-if="questions && questions.length > 0" id='questions'>
        <h3>Întrebări frecvente</h3>
        <div>
            <ul class='pricing-list'>
                <li v-b-toggle="`collapse-${index}`" v-for="(question, index) in questions" :key="index">
                    {{ question.title }} <span></span>
                    <!-- Element to collapse -->
                    <b-collapse :id="`collapse-${index}`" class="mt-4">
                        <b-card class="content-small">{{ question.text }}</b-card>
                    </b-collapse>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    
    props: ["questions"],

    computed: {
        // questions: function(){
        //     return this.$store.state.questions.questions;
        // }
    },

    // async fetch(){
    //     if(this.company.company){
    //         await this.$store.dispatch('questions/initQuestions', this.company.company.user_id); 
    //     }
    // }
}
</script>

<style scoped>
.content-small {
    font-size: 16px;
    font-weight: 400;
}
</style>