const express = require("express");
const path = require("path");
const app = express();

const routineApi = require("./api/routine.api");
const exerciseApi = require("./api/exercise.api");
const muscleApi = require("./api/muscle.api");
const muscleGroupApi = require("./api/muscleGroup.api");
const serieApi = require("./api/serie.api");
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
mongoose.connect(MONGODB_API, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log("Error: cannot connect to mongo db. Exiting...", error);
    process.exit(0);
  }
});
mongoose.Promise = Promise;

// Enable cors for dev
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routineApi.api(app);
exerciseApi.api(app);
muscleApi.api(app);
muscleGroupApi.api(app);
serieApi.api(app);

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 5000);

// console.log(__dirname);
app.use(
  express.static(path.join(__dirname, "../build"), {
    maxAge: 31557600000
  })
);

console.log(path.join(__dirname, "./assets"));
app.use(express.static(path.join(__dirname, "./assets")));

app.get("/*", (req, res) => {
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
