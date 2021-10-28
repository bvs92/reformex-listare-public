<template>
<section class='manage-your-business-area background-pattern'>
    <div class='container mb-5'>
        <div class='row align-items-center'>
        <div class='col-lg-6 col-md-12'>
            <div class='manage-your-business-image'>
            <img src='~assets/images/constructor.png' alt='constructor' />
            </div>
        </div>

        <div class='col-lg-6 col-md-12'>
            <div class='manage-your-business-content'>
                <h2 class="littleH">Ești firmă și vrei mai mulți clienți?</h2>
                <h2>
                    Înregistrează-te pe REFORMEX. Este gratuit!
                </h2>
                <p>
                    Îți oferim vizibilitate în rândul clienților noștri și posibilitatea de a folosi platfoma noastră cu șantiere și proiecte, gratuit!
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
</section>
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
</style>