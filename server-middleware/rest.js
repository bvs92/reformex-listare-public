const app = require('express')()
const needle = require('needle')

const base_url = 'https://reformexapp.eu'

app.get('/categories/all', function (req, res) {
    needle('get', base_url + `/api/categories/get/all`, {
      rejectUnauthorized: false,
      json: true,
    })
    .then(function(resp) {
      // console.log(resp.body);
      res.send(resp.body);
    })
    .catch(function(err) {
      res.send({ categories: [] })
    });
  });


  app.get('/judete/all', function (req, res) {
    needle('get', base_url + `/api/judete/get/all`, {
      rejectUnauthorized: false,
      json: true,
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