// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:time?", (req, res) => {
  const time = /\-/g.test(req.params.time) ? req.params.time : +req.params.time;
  if (time) {
    const dateReq = new Date(time);
    if (
      dateReq.toUTCString() === "Invalid Date" ||
      isNaN(dateReq.valueOf()) === true
    ) {
      res.status(400).send({ error: "Invalid Date" });
    } else {
      const unix = dateReq.valueOf();
      const utc = dateReq.toUTCString();
      res.status(200).send({ unix, utc });
    }
  } else {
    const date = new Date();
    const unix = date.valueOf();
    const utc = date.toUTCString();
    res.status(200).send({ unix, utc });
  }
});

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
