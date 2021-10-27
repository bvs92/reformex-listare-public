<template>
<div class='add-listings-box'>
    <br/>
    <div class='row'>
        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-user" aria-hidden="true"></i> Numele tău
            </label>
            <input
                type='text'
                class='form-control'
                placeholder='Popescu Marian'
            />
            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-at" aria-hidden="true"></i> Adresă de e-mail
            </label>
            <input
                type='text'
                class='form-control'
                placeholder='adresa@email.ro'
            />
            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-phone-square" aria-hidden="true"></i> Număr de telefon
            </label>
            <input
                type='text'
                class='form-control'
                placeholder='0700 000 000'
            />
            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
            <div class='form-group'>
            <label>
                <i class="fa fa-map-marker" aria-hidden="true"></i> Oraș, Cod poștal, Locație
            </label>
            <input
                type='text'
                class='form-control'
                placeholder='Bucuresti'
            />
            </div>
        </div>

        <div class='col-lg-12 col-md-12'>
              <div class='form-group'>
                <label>
                  <i class="fa fa-align-justify" aria-hidden="true"></i> Descrie cererea ta cât mai clar:
                </label>
                <textarea
                  rows='5'
                  class='form-control'
                  placeholder='Detalii proiect...'
                ></textarea>
              </div>
        </div>

        <div class="col-lg-12">
            <div class='add-listings-btn'>
                <button type='submit' class="text-black">Trimite mesaj</button>
            </div>
        </div>

    </div>
</div>
</template>