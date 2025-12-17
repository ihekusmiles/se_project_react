import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  // Setting default behavior if no condition is found with API call
  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  // Separating concerns into consts and using weatherData
  const imageSrc =
    weatherOption?.url ||
    `${
      weatherData.isDay
        ? defaultWeatherOptions.day.url
        : defaultWeatherOptions.night.url
    }`;
  const altText = `${weatherData.isDay ? "daytime" : "nighttime"} ${
    weatherData.condition
  } weather`;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <img src={imageSrc} alt={altText} className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
