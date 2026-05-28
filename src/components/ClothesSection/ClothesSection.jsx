import ItemCard from "../ItemCard/ItemCard";

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  // Subscribe ClothesSection to the context and extract currentUser
  const { currentUser } = useContext(CurrentUserContext);
  // filter clothingItems: This creates a new array containing
  // only the items that belong to the current user.

  const myItems = clothingItems.filter(
    (item) => item.owner === currentUser._id,
  );

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
        {myItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              handleLike={onCardLike}
            />
          );
        })}
      </ul>
    </section>
  );
}
