require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

if (!process.env.API_KEY) {
  // We should exit out if you don't have an API key in the .env file.
  console.log("you don't have an api key so not going to do it lol");
  process.exit(1); // Set exit() to something other than 0 so it doesn't look like the exit was 'okay'.
}

GenerateURL = (city) =>
  `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;

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
    // if(err){
    //     res.render('index',{ weather: null, error:'Error,please try again'});
    // }else{
    const w = JSON.parse(body);
    // if(weather.main == undefined){
    //     res.render('index', {weather: null, error: 'Error, please try again'});
    // } else {
    const weather = `It's ${w.main.temp} degrees in ${w.name}!`;
    res.render("index", { weather: weather, error: null }); //.render() when you want to pass through data.
    // }
    // }
  });
});

//could you make the url a function that, when passed the city and API then return the string or the response?
