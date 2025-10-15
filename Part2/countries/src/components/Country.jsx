import axios from "axios";
import { useEffect, useState } from "react";

import weatherService from "../services/weatherService";

const Country = ({ props }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  useEffect(() => {
    const weatherData = weatherService
      .getWeather(props?.capital)
      .then((response) => setWeather(response));
  }, []);
  return (
    <>
      <h1>{props?.name?.common}</h1>
      <p>Capital {props?.capital}</p>
      <p>Area {props?.area}</p>

      <h2>Languages</h2>
      <ul>
        {props?.languages &&
          Object.values(props?.languages)?.map((language) => (
            <li key={language}>{language}</li>
          ))}
      </ul>
      <div>{props?.flag}</div>
      <div>
        {weather && (
          <div>
            <h2>Weather in {props?.capital[0]}</h2>
            <p>Temperature: {weather?.main?.temp}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
              alt=""
            />
            <p>Wind: {weather?.wind?.speed} m/s</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Country;
