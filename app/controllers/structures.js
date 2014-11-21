var mongoose = require('mongoose')
var Structure = mongoose.model('Structure')

// * Load
exports.load = function (req, res, next, id){
  Structure.load(id, function (err, structure) {
    if (err) return next(err);
    if (!structure) return next(new Error('not found'));
    req.structure = structure;
    next();
  });
};

// * List
exports.index = function (req, res){
  res.json({"hi":"hello"});
};

// * Show
exports.show = function (req, res){
  res.json(req.structure);
};

// * Create
exports.create = function (req, res) {
  var structure = new Structure(req.body);
  console.log(req.body)
  console.log(structure)
  structure.validateAndSave(function(err) {
    if (!err) { return res.redirect('/structures/'+structure._id); }
    res.json({done:true})
  });
};
