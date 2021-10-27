<template>
    <section class='error-area bg-f9f9f9 ptb-100'>
        <div class='container'>
          <div class='error-content'>
            <img src='~assets/images/error.png' alt='eroare 404' />
            <h3>Eroare 404 : Pagina nu există.</h3>
            <p>
              Pagina pe care o cauți nu exsită.
            </p>
            <NuxtLink to='/'>
              <a class='default-btn'>Înapoi la pagina de start</a>
            </NuxtLink>
          </div>
        </div>
      </section>
</template>

<script>
export default {
  head: {
    title: 'Pagină inexistentă - 404',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Pagina inexistentă.'
      }
    ]
  }
}
</script>