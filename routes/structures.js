var structures = require('../app/controllers/structures');

module.exports = function (app, passport) {
  // app.get('/structure', users.login);
  app.param('id', structures.load);
}

// var express = require('express');
// var router = express.Router();

// var mongoose = require('mongoose');

// [> GET users listing. <]
// router.get('/', function(req, res) {
  // var kitty = new Structure({ name: 'Zildjian' });
  // kitty.save(function (err) {
    // console.log('meow');
  // });
// });

// module.exports = router;
