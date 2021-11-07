const app = require('express')()
const needle = require('needle')

const base_url = 'https://reformexapp.eu'

app.get('/categories/all', function (req, res) {

    // categories
    needle('get', base_url + `/api/categories/get/all`, {
      rejectUnauthorized: false,
      json: true,
      'X-API-KEY': process.env.API_KEY
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
    })
    .then(function(resp) {
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ companies: [] })
    });
  });
  


  // judete
  app.get('/judete/all', function (req, res) {
    needle('get', base_url + `/api/judete/get/all`, {
      rejectUnauthorized: false,
      json: true,
      'X-API-KEY': process.env.API_KEY
    })
    .then(function(resp) {
      // console.log(resp.body);
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ judete: [] })
    });
  });


//   export default {
//     path: '/rest',
//     handler: app
//   }


module.exports = app