mongoose = require("mongoose")
Structure = mongoose.model("Structure")

# * Load
exports.load = (req, res, next, id) ->
  Structure.load id, (err, structure) ->
    return next(err)  if err
    return next(new Error("not found")) unless structure
    req.structure = structure
    next()
    return

  return

# * List
exports.index = (req, res) ->
  res.json hi: "hello"
  return

# * Show
exports.show = (req, res) ->
  res.json req.structure
  return

# * Create
exports.create = (req, res) ->
  structure = new Structure(req.body)
  console.log req.body
  console.log structure
  structure.validateAndSave (err) ->
    return res.redirect("/structures/" + structure._id) unless err
    res.json done: true
    return

  return
