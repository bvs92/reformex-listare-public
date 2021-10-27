<template>
<div>
    <b-card v-for="(item, index) in 6" :key="index" class="mb-3">
        <b-skeleton animation="wave" width="95%"></b-skeleton>
        <b-skeleton animation="wave" width="65%"></b-skeleton>
        <b-skeleton animation="wave" width="95%"></b-skeleton>
        <b-skeleton animation="wave" width="90%"></b-skeleton>
        <b-skeleton animation="wave" width="98%"></b-skeleton>
        <b-skeleton animation="wave" width="80%"></b-skeleton>
        <b-skeleton animation="wave" width="70%"></b-skeleton>
        <b-skeleton animation="wave" width="80%"></b-skeleton>
        <b-skeleton animation="wave" width="97%"></b-skeleton>
    </b-card>
</div>
</template>