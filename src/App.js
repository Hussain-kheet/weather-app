import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/Current-Weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api";
import { useState } from "react";
import Forecaste from "./components/forecaste/Forecaste";

function App() {
  const [currentweather, setCurrentweather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleonSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split("");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentweather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentweather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleonSearchChange} />
      {currentweather && <CurrentWeather data={currentweather} />}
      {forecast && <Forecaste data={forecast} />}
    </div>
  );
}

export default App;
