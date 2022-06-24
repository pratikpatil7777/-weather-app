const express = require("express");
const request = require("request");
const app = express();
const cors = require("cors");
var options = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(options));
app.get("/", cors(), async (req, res) => {
  let city = req.query.city;
  var request = require("request");
  request(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac7162a5301f68933e690486b0461860`,
    function (error, response, body) {
      let data = JSON.parse(body);

      try {
        if (response.statusCode === 200) {
          res.send(data);
        } else {
          console.log(response.statusCode);
        }
      } catch (e) {
        response.send(e.message);
      }
    }
  );
});

app.post("/city", cors(), async (req, res) => {
  let city = req.body;

  var request = require("request");
  request(
    `https://api.openweathermap.org/data/2.5/weather?q=${city["location"]}&units=imperial&appid=ac7162a5301f68933e690486b0461860`,
    function (error, response, body) {
      let data = JSON.parse(body);
      console.log(data);
      try {
        if (response.statusCode === 200) {
          res.send(data);
        } else {
          //   res.send("No data found");
          console.log(response.statusCode);
        }
      } catch (e) {
        response.send(e.message);
      }
    }
  );
});

app.listen(process.env.PORT || 4000, () =>
  console.log("Server started on port 4000")
);
