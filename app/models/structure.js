var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// super simple for prototyping purposes
var StructureSchema = new Schema({
  nodes: { type: String, default: '' },
  edges: { type: String, default: '' }
});

StructureSchema.methods = {
  validateAndSave: function(cb) {
    var self = this;
    this.validate(function (err) {
      if (err) return cb(err);
      self.save(cb);
    });
  }
}

StructureSchema.statics = {
  // find by id
  load: function (id, cb) {
    this.findOne({ _id : id })
      // .populate('user', 'name email username')
      // .populate('comments.user')
      .exec(cb);
  },
  // list all
  list: function (options, cb) {
    var criteria = options.criteria || {}
    this.find(criteria)
      .populate('user', 'name username')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
}

mongoose.model('Structure', StructureSchema);
