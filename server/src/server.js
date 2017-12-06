const express = require('express')
const path = require('path')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/routine', function (req, res) {
  res.send('hello world')
})

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "../../client/build"), { maxAge: 31557600000 }));

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});
