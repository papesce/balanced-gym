const express = require("express");
const path = require("path");
const app = express();
const gym = require("./model/gym.model");
const mongoose = require("mongoose");
require("dotenv").config();

let MONGODB_API;
if (process.env.NODE_ENV === 'production') {
  MONGODB_API = process.env.MONGODB_REMOTE_API;
} else {
  MONGODB_API = process.env.MONGODB_LOCAL_API;
}
console.log("connecting to db:", MONGODB_API);
mongoose.connect(MONGODB_API, { useMongoClient: true });
mongoose.Promise = Promise;


// respond with "hello world" when a GET request is made to the homepage
app.get("/routine", async (req, res) => {
  const routines = await gym.getRoutines2();
  res.send(routines);
});

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
