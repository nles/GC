var structures = require('../app/controllers/structures');

module.exports = function (app) {
  //
  router.get('/', function(req, res) {
    // note: this should be in controller
    res.render('index', { title: 'Express' });
  });
  // app.get('/structure', users.login);
  app.param('id', structures.load);
  app.get('/structures/:id', structures.show);
  app.get('/structures', structures.index);
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
