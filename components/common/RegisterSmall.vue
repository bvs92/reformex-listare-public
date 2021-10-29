<template>
<div class='mt-5 background-simple-pattern overflow-hidden'>
    <div class=''>
        <div class='row align-items-center'>
            <div class='col-lg-4 col-md-12'>
                <div class='manage-your-business-image'>
                <img src='~assets/images/comunitate.png' alt='Fii și tu parte din comunitatea Reformex!' />
                </div>
            </div>

            <div class='col-lg-8 col-md-12'>
                <div class='manage-your-business-content'>
                    <h2 class="littleH">Fii și tu parte din comunitatea noastră!</h2>
                    <h2>
                        Ai o firmă? Obține vizibilitate și clienți.
                    </h2>
                    <p>
                        Înregistrează firma în platforma noastră, vei găsi clienții ușor și gratuit. De asemenea, vei fi listat ca în rezultatele de mai sus la căutările clienților.
                    </p>
                    <NuxtLink to='/inscriere-firma'>
                        <a class='default-btn'>
                        <i class='flaticon-more'></i> Adaugă firmă
                        </a>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.manage-your-business-area {
    margin-top: 80px;
}

.littleH {
    font-size: 20px;
    color: #696969;
    font-weight: 600;
}

.overflow-hidden {
    overflow: hidden;
}
</style>