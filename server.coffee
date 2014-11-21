fs = require("fs")
express = require("express")
path = require("path")
favicon = require("serve-favicon")
logger = require("morgan")
cookieParser = require("cookie-parser")
bodyParser = require("body-parser")
app = express()

# Connect to mongodb
mongoose = require("mongoose")
connect = ->
  options = server:
    socketOptions:
      keepAlive: 1

  mongoose.connect "mongodb://localhost/gcdb", options
  return

connect()
mongoose.connection.on "error", console.log
mongoose.connection.on "disconnected", connect

# Bootstrap models
fs.readdirSync(__dirname + "/app/models").forEach (file) ->
  require __dirname + "/app/models/" + file  if ~file.indexOf(".coffee")
  return


# Bootstrap routes
require("./config/routes") app

# View engine setup
app.set "views", path.join(__dirname, "app/views")
app.set "view engine", "jade"

# uncomment after placing your favicon in /public
#app.use(favicon(__dirname + '/public/favicon.ico'));
app.use logger("dev")
app.use bodyParser.json()
app.use bodyParser.urlencoded(extended: false)
app.use cookieParser()
app.use express.static(path.join(__dirname, "public"))

# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error("Not Found")
  err.status = 404
  next err
  return

# error handlers

# development error handler
# will print stacktrace
if app.get("env") is "development"
  app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render "error",
      message: err.message
      error: err

    return


# production error handler
# no stacktraces leaked to user
app.use (err, req, res, next) ->
  res.status err.status or 500
  res.render "error",
    message: err.message
    error: {}

  return

module.exports = app
