require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

//check that the API key actually exists before doing anything else.

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log(process.env.DAVID_ENV);
  res.render("index");
});

//try and make a app.get("/london") <-- try and return London weather. URL parsing.

app.listen(8080, () => {
  console.log("Listening on port 8080 baby");
});

app.post("/", (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`; //use the API_KEY with environment variables rather than hardcoding it.
  request(url, (err, response, body) => {
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
