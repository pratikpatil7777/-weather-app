import logo from "./logo.svg";
import "./index.css";
import { TiWeatherSnow } from "react-icons/ti";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState("");
  // const [cel, setCel] = useState(false);
  // const [far, setFar] = useState(false);
  const [unit, setUnit] = React.useState("C");

  const myUnit = unit === "C" ? "F" : "C";
  async function postName(e) {
    e.preventDefault();

    try {
      if (location === "") {
        return;
      }
      let currWeather = await axios.post("http://54.163.205.146:4000/city", {
        location,
      });
      console.log(currWeather.data);
      setData(currWeather.data);
    } catch (error) {
      console.log(error);
    }
  }
  const convert = () => {
    if (unit === "C") {
      setUnit(myUnit);
    }

    if (unit === "F") {
      setUnit(myUnit);
    }
  };
  return (
    <div>
      {/* <div className="customNavbar">
        <h1>Happy Weather</h1>
      </div> */}
      <div className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Weather App</title>
          <link rel="canonical" href="http://tulsee.live" />
          <meta name="description" content="Weather App" />
        </Helmet>
        <form onSubmit={postName}>
          <h1 className="Heading">Happy Weather</h1>
          <div className="component">
            <input
              className="search"
              type="text"
              style={{ boxShadow: "0px 2px 12px 10px rgba(0, 0, 0, 0.14)" }}
              value={location}
              placeholder="Enter Location"
              onChange={(event) => setLocation(event.target.value)}
            />
            <button type="submit" class="button">
              Search
            </button>

            <button
              class="button"
              onClick={() => {
                setLocation(() => "");
                setData(() => "");
              }}
            >
              Reset
            </button>
            {data.main ? (
              <button class="button" onClick={convert}>
                In °{myUnit}
              </button>
            ) : (
              ""
            )}
          </div>
        </form>

        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {!data.main && location !== "" ? data.main : ""}
              {data.main && unit === "F" ? (
                <h1>{data.main.temp.toFixed()}°F</h1>
              ) : (
                ""
              )}
              {data.main && unit === "C" ? (
                <h1>
                  {(
                    (parseInt(data.main.temp.toFixed()) - 32) *
                    (5 / 9)
                  ).toFixed()}
                  °C
                </h1>
              ) : (
                ""
                // <h1>{data.main.temp.toFixed()}°F</h1>
              )}

              {data.weather ? (
                <p style={{ fontSize: "3em" }}>{data.weather[0].main}</p>
              ) : null}
            </div>
          </div>

          {data.name !== undefined && (
            <div className="bottom">
              <div
                className="humidity"
                style={{ borderRight: "2px solid white", padding: "10px" }}
              >
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div
                className="feels"
                style={{ borderRight: "2px solid white", padding: "10px" }}
              >
                {data.main ? (
                  <>
                    {unit === "C" ? (
                      <p className="bold">
                        {(
                          (parseInt(data.main.feels_like.toFixed()) - 32) *
                          (5 / 9)
                        ).toFixed()}
                        °C
                      </p>
                    ) : (
                      <p className="bold">{data.main.feels_like.toFixed()}°F</p>
                    )}
                  </>
                ) : null}
                <p>Feels Like </p>
              </div>
              <div className="wind" style={{ padding: "10px" }}>
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
