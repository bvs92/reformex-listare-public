<template>
<div class='add-listings-box'>
    <h3>Formular de înregistrare</h3>

    <form @submit.prevent="submitRegister">
    <div class='row'>
        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-building-o" aria-hidden="true"></i> Nume firmă
            </label>
            <input
                type='text'
                class='form-control'
                placeholder='Firma Mea SRL'
                v-model="company_name"
                required
            />
            <template v-if="validation_errors">
                <span v-if="validation_errors['company_name']" class="error-text">
                    <i class="fa fa-times" aria-hidden="true"></i> Această informație este obligatorie.
                </span>
            </template>
            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-info-circle" aria-hidden="true"></i> Cod Unic Înregistrare (CUI)
            </label>
            <input
                type='text'
                class='form-control'
                placeholder='CUI firmă'
                v-model="cui"
                required
            />
            <template v-if="validation_errors">
                <span v-if="validation_errors['cui']" class="error-text">
                    <i class="fa fa-times" aria-hidden="true"></i> Această informație este obligatorie.
                </span>
            </template>

            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-info-circle" aria-hidden="true"></i> Număr Înmatriculare (Registrul Comerțului)
            </label>
            <input
                type='text'
                class='form-control'
                placeholder='J00/000/2021'
                v-model="register_number"
                required
            />
            <template v-if="validation_errors">
                <span v-if="validation_errors['register_number']" class="error-text">
                    <i class="fa fa-times" aria-hidden="true"></i> Această informație este obligatorie.
                </span>
            </template>
            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-user" aria-hidden="true"></i> Numele tău
            </label>
            <input
                type='text'
                class='form-control'
                placeholder='Popescu Marian'
                v-model="owner_name"
                required
            />
            <template v-if="validation_errors">
                <span v-if="validation_errors['owner_name']" class="error-text">
                    <i class="fa fa-times" aria-hidden="true"></i> Această informație este obligatorie.
                </span>
            </template>
            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-phone" aria-hidden="true"></i> Număr telefon
            </label>
            <input
                type='text'
                class='form-control'
                placeholder='0700 000 000'
                v-model="phone"
                required
            />
            <template v-if="validation_errors">
                <span v-if="validation_errors['phone']" class="error-text">
                    <i class="fa fa-times" aria-hidden="true"></i> Această informație este obligatorie.
                </span>
            </template>
            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-at" aria-hidden="true"></i> Adresă de e-mail
            </label>
            <input
                type='email'
                class='form-control'
                placeholder='adresa@email.ro'
                v-model="email"
                required
            />
            <template v-if="validation_errors">
                <span v-if="validation_errors['email']" class="error-text">
                    <i class="fa fa-times" aria-hidden="true"></i> {{ validation_errors['email'][0] }}
                </span>
            </template>
            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-map-marker" aria-hidden="true"></i> Adresă firmă
            </label>
            <input
                type='text'
                class='form-control'
                placeholder='Strada X Număr Y, Oraș, Județ, România'
                v-model="address"
                required
            />
            <template v-if="validation_errors">
                <span v-if="validation_errors['address']" class="error-text">
                    <i class="fa fa-times" aria-hidden="true"></i> Această informație este obligatorie.
                </span>
            </template>
            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
            <div class='form-group d-flex'>
                <label class="col-lg-7 py-2">
                    Filtru Antispam. {{ first_number }} + {{ second_number }} = ?
                </label>
                <input
                    type='number'
                    class='form-control col-lg-5'
                    placeholder='Numar'
                    v-model="sum_numbers"
                    required
                    @keyup="checkAntispam"
                />
            </div>
        </div>

        <div class="col-lg-12">
            <div class='add-listings-btn'>
                <button v-if="!send_loading" type='submit' class="text-black" :class="{cursor: !antispam_filter_ok}" :disabled="!antispam_filter_ok ? true : false"><i class="fa fa-paper-plane-o" aria-hidden="true" ></i> Trimite cererea de înregistrare</button>
                <b-button variant="success" disabled v-else>
                    <b-spinner small type="grow"></b-spinner>
                    Se trimite cererea de înregistrare...
                </b-button>
            </div>
        </div>



    </div>
    </form>
</div>
</template>

<script>
import {BASE_URL} from '@/config.js';
import axios from 'axios';
import https from 'https';

export default {
    data(){
        return {
            company_name: '',
            cui: '',
            register_number: '',
            owner_name: '',
            email: '',
            address: '',
            phone: '',

            validation_errors: [],
            send_loading: false,
            only_once: false,

            first_number: null,
            second_number: null,
            sum_numbers: null,
            antispam_filter_ok: false
        }
    },

    computed: {
        
    },

    methods: {

        resetFilter(){
            this.generateNumbers();
            this.antispam_filter_ok = false;
            this.sum_numbers = null;
        },

        generateNumbers(){
            this.first_number = this.generateRandomInt(20);
            this.second_number = this.generateRandomInt(20);
        },

        generateRandomInt(max) {
            return Math.floor(Math.random() * max);
        },

        checkAntispam: function(){
            let sum = this.first_number + this.second_number;
            if(parseInt(this.sum_numbers) == sum){
                this.antispam_filter_ok = true
            } else {
                this.antispam_filter_ok = false;
            }
        },

        resetForm: function(){
            this.company_name = '';
            this.cui = '';
            this.register_number = '';
            this.owner_name = '';
            this.email = '';
            this.address = '';
            this.phone = '';
            this.validation_errors = [];
        },

        showToast: function(type, text){
            this.$toasted.show(text, { 
                type: type == 'error' ? "error" : "success", 
                theme: "toasted-primary",
                position: "bottom-center", 
                duration : 4000,
                iconPack: 'fontawesome',
                icon: type == 'error' ? 'fa-times' : 'fa-check'
            })
        },

        async submitRegister(){
            this.send_loading = true;
            this.only_once = true;

            if(this.validation_errors.length > 0){
                this.validation_errors = [];
            }

            let formData = new FormData();
            formData.append('company_name', this.company_name);
            formData.append('owner_name', this.owner_name);
            formData.append('email', this.email);
            formData.append('phone', this.phone);
            formData.append('address', this.address);
            formData.append('cui', this.cui);
            formData.append('register_number', this.register_number);

            axios.defaults.httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });

            let the_url = `${BASE_URL}/api/company/form/register`;
            await axios.post(the_url, formData, {
                headers: {'Access-Control-Allow-Origin': "*"},
                mode: 'cors',
            }).then(async response => {
                if(response.data.success){
                    await this.resetForm();
                    await this.resetFilter();
                    this.showToast('success', "Felicitări! Cererea de înregistrare a fost trimisă cu succes.");
                } else if(response.data.validation_errors) {
                    this.showToast('error', "Am întâmpinat erori. Verifică datele introduse în formular.");
                    this.validation_errors = response.data.validation_errors;
                } else {
                    this.showToast('error', "Ceva nu a funcționat corect. Verifică datele introduse în formular. Reîncarcă pagina dacă eroarea persistă.");
                }
            }).finally(() => {
                this.send_loading = false;
                this.only_once = false;
            });

        }
    },

    created(){
        this.generateNumbers();
    }
}
</script>

<style scoped>
.error-text {
    color: red;
    font-size: 12px;
    padding: 3px;
}

.cursor {
    cursor: not-allowed;
}
</style>