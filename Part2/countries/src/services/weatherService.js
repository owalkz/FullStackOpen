import axios from "axios";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const getWeather = (capital) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
    )
    .then((response) => response.data);
};

export default { getWeather };
