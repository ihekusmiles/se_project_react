import sunny from "../../assets/sunny.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75° F</p>
      <img src={sunny} alt="Sunny weather" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
