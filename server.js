const express = require("express"),
  app = express(),
  server = require("http").createServer(app),
  path = require("path"),
  chalk = require("chalk"),
  registerRoutes = require("./routes"),
  db = require("./database"),
  Express = require("./express"),
  Config = require(path.resolve("./configuration"));

const config = Config.getConfig();

//@ start server
server.listen(config.PORT, () => {
  console.log(
    chalk`{green Node Js server running on {green.bold ${
      config.PORT
      }} port at {green.bold ${config.MODE_TYPE}}..}`
  );
});

//@ Initialize express
Express.init(app);

//@ connect mongodb
db.connectMongoDB(config);

//@ register routes
console.log("registering routes");
registerRoutes.registerRoutes(app);
console.log("routes registered successfully");

module.exports = app;
