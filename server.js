require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

APIKeyExists = () => process.env.API_KEY != undefined;

GenerateURL = (city) =>
  `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;

if (!APIKeyExists()) {
  console.log(
    "Couldn't find an API key under process.env.API_KEY so going to exit out."
  );
  process.exit(1); // Set exit() to something other than 0 so it doesn't look like the exit was 'okay'.
}

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});

app.post("/", (req, res) => {
  request(GenerateURL(req.body.city), (err, response, body) => {
    if (err) {
      res.render("index", { error: "Error,please try again" });
    } else {
      const w = JSON.parse(body);
      console.log("it's all good. No errors");
      if (weather.main == undefined) {
        res.render("index", {
          weather: null,
          error: "Error, please try again",
        });
      } else {
        const weather = `It's ${w.main.temp} degrees in ${w.name}!`;
        res.render("index", { weather: weather, error: null }); //.render() when you want to pass through data.
      }
    }
  });
});
