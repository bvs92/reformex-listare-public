<template>
<div class="mt-5" v-if="projects && projects.length > 0" id="proiecte">
    <h3>Portofoliu proiecte</h3>
    <div class='row' >
        <SingleWorkProject v-for="project in projects" :key="project.id" :project="project" />
    </div>
</div>
</template>


<script>
import SingleWorkProject from "./SingleWorkProject.vue"

export default {
    components: {
        SingleWorkProject
    },

    props: {
        projects: Array
    }
}
</script>