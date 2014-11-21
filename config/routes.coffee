structures = require("../app/controllers/structures")
module.exports = (app) ->
  #
  app.get "/", (req, res) ->
    # note: this should be in controller
    res.render "index",
      title: "Express"

    return

  app.param "id", structures.load
  app.get "/structures/:id", structures.show
  app.get "/structures", structures.index
  app.post "/structures/create", structures.create
  return
