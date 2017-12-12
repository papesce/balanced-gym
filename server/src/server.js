const express = require("express");
const path = require("path");
const app = express();
const api = require("./api");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");


let MONGODB_API;
if (process.env.NODE_ENV === "production") {
  MONGODB_API = process.env.MONGODB_REMOTE_API;
} else {
  MONGODB_API = process.env.MONGODB_LOCAL_API;
}
console.log("connecting to db:", MONGODB_API);
mongoose.connect(MONGODB_API, { useMongoClient: true });
mongoose.Promise = Promise;

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

api(app);

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 5000);

console.log(__dirname);
app.use(
  express.static(path.join(__dirname, "../build"), {
    maxAge: 31557600000
  })
);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
