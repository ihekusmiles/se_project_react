import defaultLikeBtn from "../../assets/defaultLikeBtn.svg";
function ItemCard({ item, onCardClick, handleLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__parent">
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
        />{" "}
        <div className="card__name-like-container">
          {" "}
          <h2 className="card__name">{item.name}</h2>
          <img
            className="card__like-btn"
            src={defaultLikeBtn}
            alt="Like button"
          />
        </div>
      </div>
    </li>
  );
}

export default ItemCard;
