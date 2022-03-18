<template>
    <div class='listings-widget listings_contact_details' v-if="company">
        <h3>Detalii contact</h3>
        <ul>
            <li>
                <i class="fa fa-phone-square" aria-hidden="true"></i>
                <a v-if="isHidden" @click.prevent="showPhone" class="phone-hidden">Arată telefon</a>
                <a :href="'tel:' + company.company.phone" v-else class="phone" rel="nofollow">{{ company.company.phone }}</a>
            </li>
            <li v-if="company.company.location">
                <i class="fa fa-map-marker" aria-hidden="true"></i> <template v-if="company.company.location.value">{{ company.company.location.value }}</template>
            </li>
            <li v-if="company.public_profile && company.public_profile.website">
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                    <a :href="formatWebsite(company.public_profile.website)" rel="nofollow" target="_blank"> {{ company.public_profile.website }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isHidden: true
        }
    },

    props: ["company"],

    methods: {
        showPhone: function(){
            this.isHidden = !this.isHidden;
        },

        formatWebsite: function(website){

            if(website.includes('facebook.com') || website.includes('instagram.com') || website.includes('youtube.com') || website.includes('twitter.com')){
                this.format_social_link(website);
            } else {
                if(website.includes('https:://') || website.includes('http:://')){
                    return website;
                } else if (website.includes('https//')){
                    let final_url = website.split('https//');
                    return 'https://' + final_url[1];
                } else if(website.includes('http//')) {
                    let final_url = website.split('http//');
                    return 'https://' + final_url[1];
                } else {
                    return 'https://' + website;
                }
            }
        },

        format_social_link: function(profile){

            if(profile.includes('facebook.com')){
                let $splitted = profile.split('facebook.com/');
                return 'https://www.facebook.com/' + $splittted[1];
            } else if(profile.includes('instagram.com')){
                let $splitted = profile.split('instagram.com/');
                return 'https://www.instagram.com/' + $splittted[1];
            } else if(profile.includes('twitter.com')){
                let $splitted = profile.split('twitter.com/');
                return 'https://www.twitter.com/' + $splittted[1];
            } else if(profile.includes('youtube.com')){
                let $splitted = profile.split('youtube.com/');
                return 'https://www.youtube.com/' + $splittted[1];
            } 
        }
    },
}
</script>

<style scoped>
.phone-hidden {
    font-weight: bold;
    cursor: pointer;
}
.phone {
    font-weight: bold;
    color: rgb(12, 105, 220)!important;
}

.listings-sidebar .listings_contact_details ul li:last-child {
    padding-bottom: 14px!important;
}
</style>