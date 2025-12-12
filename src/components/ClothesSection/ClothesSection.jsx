import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
}) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__container">
        {" "}
        <p className="clothes-section__text">Your items</p>
        <button
          className="clothes-section__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__cards__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </section>
  );
}
