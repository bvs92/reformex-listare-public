<template>
    <footer class="footer-area">
        <div class='container'>
          <div class='row'>
            <div class='col-lg-4 col-sm-6 col-md-6'>
              <div class='single-footer-widget'>
                <h3>Utile</h3>

                <ul class='link-list'>
                  <li>
                    <NuxtLink
                      to='/inscriere-firma'
                    >
                        <i class='flaticon-left-chevron'></i>  Adaugă firmă
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to='/cautare'
                    >
                      <i class='flaticon-left-chevron'></i> Caută firme
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to='/'
                    >
                      <i class='flaticon-left-chevron'></i> Pagină de start
                    </NuxtLink>
                  </li>
                  <li>
                    <a href='https://www.reformex.ro/contact-2'>
                      <i class='flaticon-left-chevron'></i> Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class='col-lg-4 col-sm-6 col-md-6'>
              <div class='single-footer-widget'>
                <h3>Publicitate</h3>

                <ul class='link-list'>
                  <li>
                    <a href='https://www.reformex.ro/publicitate-prin-anunturi/'>
                      <i class='flaticon-left-chevron'></i> Anunțuri
                    </a>
                  </li>
                  <li>
                    <a href='https://www.reformex.ro/publicitate/'>
                      <i class='flaticon-left-chevron'></i> Articole
                    </a>
                  </li>
                  <li>
                    <a href='https://www.reformex.ro/bannerzon/'>
                      <i class='flaticon-left-chevron'></i> Banner
                    </a>
                  </li>
                  <li>
                    <a href='https://www.reformex.ro/publicitate-pe-reformex/'>
                      <i class='flaticon-left-chevron'></i> Pachete publicitate
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class='col-lg-4 col-sm-6 col-md-6'>
              <div class='single-footer-widget'>
                <h3>Despre proiect</h3>

                <ul class='link-list'>
                  <li>
                    <a href='https://www.reformex.ro/despre-noi/'>
                      <i class='flaticon-left-chevron'></i> Despre noi
                    </a>
                  </li>
                  <li>
                    <a href='https://www.reformex.ro/politica-de-confidentialitate/'>
                      <i class='flaticon-left-chevron'></i> Politica de confidențialitate
                    </a>
                  </li>
                  <li>
                    <a href='https://www.reformex.ro/politica-privind-cookie-urile/'>
                      <i class='flaticon-left-chevron'></i> Politică cookies
                    </a>
                  </li>
                  <li>
                    <a href='https://www.reformex.ro/termene-si-conditii/'>
                      <i class='flaticon-left-chevron'></i> Termene și condiții
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div class='copyright-area mb-4'>
            <p class="p-bottom">
              Găsește pe REFORMEX firme și profesioniști pentru proiectul tău.
            </p>
          </div>
        </div>

        <!-- <div class='footer-image text-center'>
          <img src='~assets/images/footer-image.png' alt='image' />
        </div> -->
      </footer>
</template>

<style scoped>
.p-bottom {
  font-size: 14px;
  font-weight: 300;
  color: black;
}
</style>