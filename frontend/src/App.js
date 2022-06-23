import logo from "./logo.svg";
import "./App.css";
import { TiWeatherSnow } from "react-icons/ti";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("");
  const [result, setResult] = useState("");
  async function postName(e) {
    e.preventDefault();

    try {
      let currentWeather = await axios.post("http://localhost:4000/city", {
        location,
      });
      console.log(currentWeather.data);
      setResult(currentWeather.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Weather App</title>
        <link rel="canonical" href="http://tulsee.live" />
        <meta name="description" content="Weather App" />
      </Helmet>
      <form onSubmit={postName}>
        <input
          type="text"
          value={location}
          placeholder="Enter City Name here..."
          onChange={(event) => setLocation(event.target.value)}
        />
        <button type="submit"> Search </button>
        {/* <{result ? { result } : ""}/>
         */}
      </form>
      <div className="final">{result ? result : ""}</div>
      {/* <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default App;
