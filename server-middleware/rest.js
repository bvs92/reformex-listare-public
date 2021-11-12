const app = require('express')()
const needle = require('needle')

const API_LOCAL = process.env.API_LOCAL

const base_url = 'https://beta.reformex.ro'
// const base_url = 'http://127.0.0.1:8000'

app.get('/categories/all', function (req, res) {

    // categories
    needle('get', base_url + `/api/categories/get/all`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      // console.log(resp.body);
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ categories: [] })
    });
  });

  // single category
  app.get(`/categories/single/:category_slug`, function (req, res) {
    // console.log(req.headers);
  
    needle('get', base_url + `/api/categories/get/single/${req.params.category_slug}`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ category: null })
    });
  });

  // category companies
  app.get(`/companies/category/get/:category_slug/:page`, function (req, res) {
    // console.log(req.headers);
    
    needle('get', base_url + `/api/companies/category/get/${req.params.category_slug}/${req.params.page}`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ companies: [] })
    });
  });
  

  app.get('/companies/get/top', function (req, res) {
    needle('get', base_url + `/api/companies/get/top`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      // console.log(resp.body);
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ judete: [] })
    });
  });


  // search
  app.get('/companies/search/:category_slug/:location_slug/:page', function (req, res) {
    needle('get', base_url + `/api/companies/search/${req.params.category_slug}/${req.params.location_slug}/${req.params.page}`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      // console.log(resp.body);
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ judete: [] })
    });
  });

  // search verified
  app.get('/companies/search/verified/:category_slug/:location_slug/:page', function (req, res) {
    needle('get', base_url + `/api/companies/search/verified/${req.params.category_slug}/${req.params.location_slug}/${req.params.page}`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      // console.log(resp.body);
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ judete: [] })
    });
  });

  // category, location companies
  // category companies
  app.get(`/companies/location/category/get/:category_slug/:location_slug/:page`, function (req, res) {
    // console.log(req.headers);
    
    needle('get', base_url + `/api/companies/location/category/get/${req.params.category_slug}/${req.params.location_slug}/${req.params.page}`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ companies: [] })
    });
  });

  app.get(`/companies/verified/location/category/get/:category_slug/:location_slug/:page`, function (req, res) {
    // console.log(req.headers);
    
    needle('get', base_url + `/api/companies/verified/location/category/get/${req.params.category_slug}/${req.params.location_slug}/${req.params.page}`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ companies: [] })
    });
  });


  app.get('/company/get/public/:username', function (req, res) {

    // categories
    needle('get', base_url + `/api/company/get/public/${req.params.username}`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      // console.log(base_url);
      // console.log(req);
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ categories: [] })
    });
  });




  // inactiva, luat oadata cu company
  app.get('/company_questions/public/get:user_id', function (req, res) {

    // categories
    needle('get', base_url + `/api/company/get/public/${req.params.user_id}`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      // console.log(resp.body);
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ categories: [] })
    });
  });
  

// reviews
app.get('/company_reviews/get/all/public', function (req, res) {
  needle('get', base_url + `/api/company_reviews/get/all/public`, {
    rejectUnauthorized: false,
    json: true,
    headers: {
      'X-API-KEY': API_LOCAL,
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(function(resp) {
    // console.log(resp.body);
    res.send(resp.body);
  })
  .catch(function(err) {
    res.send({ judete: [] })
  });
});


// project photos
app.get('/work-project/get/photos/:project_id', function (req, res) {
  needle('get', base_url + `/api/work-project/get/photos/${req.params.project_id}`, {
    rejectUnauthorized: false,
    json: true,
    headers: {
      'X-API-KEY': API_LOCAL,
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(function(resp) {
    // console.log(resp.body);
    res.send(resp.body);
  })
  .catch(function(err) {
    res.send({ judete: [] })
  });
});


  // judete
  app.get('/judete/all', function (req, res) {
    needle('get', base_url + `/api/judete/get/all`, {
      rejectUnauthorized: false,
      json: true,
      headers: {
        'X-API-KEY': API_LOCAL,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(resp) {
      // console.log(resp.body);
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ judete: [] })
    });
  });


    // single location
    app.get(`/locations/single/:location_slug`, function (req, res) {
      // console.log(req.headers);
    
      needle('get', base_url + `/api/locations/get/single/${req.params.location_slug}`, {
        rejectUnauthorized: false,
        json: true,
        headers: {
          'X-API-KEY': API_LOCAL,
          'Access-Control-Allow-Origin': '*'       }
      })
      .then(function(resp) {
        res.send(resp.body);
      })
      .catch(function(err) {
        res.send({ category: null })
      });
    });


//   export default {
//     path: '/rest',
//     handler: app
//   }


module.exports = app