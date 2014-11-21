var structures = require('../app/controllers/structures.js');

module.exports = function (app) {
  //
  app.get('/', function(req, res) {
    // note: this should be in controller
    res.render('index', { title: 'Express' });
  });
  // app.get('/structure', users.login);
  app.param('id', structures.load);
  app.get('/structures/:id', structures.show);
  app.get('/structures', structures.index);
  app.post('/structures/create', structures.create);
}
