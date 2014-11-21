mongoose = require("mongoose")
Schema = mongoose.Schema

# super simple for prototyping purposes
StructureSchema = new Schema(
  nodes:
    type: String
    default: ""

  edges:
    type: String
    default: ""
)
StructureSchema.methods = validateAndSave: (cb) ->
  self = this
  @validate (err) ->
    return cb(err)  if err
    self.save cb
    return

  return

StructureSchema.statics =
  # find by id
  load: (id, cb) ->
    # .populate('user', 'name email username')
    # .populate('comments.user')
    @findOne(_id: id).exec cb
    return

  # list all
  list: (options, cb) ->
    criteria = options.criteria or {}
    # sort by date
    @find(criteria).populate("user", "name username").sort(createdAt: -1).limit(options.perPage).skip(options.perPage * options.page).exec cb
    return

mongoose.model "Structure", StructureSchema
