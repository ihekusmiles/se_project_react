// Import button images
import defaultLikeBtn from "../../assets/defaultLikeBtn.svg";
import likedBtn from "../../assets/likedBtn.svg";
// Import context
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, handleLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  // console.log(currentUser); DELETE THIS LINE
  // Check if current user already liked this card. Using optional chain '?' to
  // access a property that might not exist --> if so returns undefined.
  const isLiked = item.likes.some((id) => id === currentUser?._id);
  // Toggle between both images based on boolean value
  const likeImage = isLiked ? likedBtn : defaultLikeBtn;

  // console.log(item.likes); // Checks 'likes' array on console DELETE LATER

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
          {/* Using conditional rendering to show like button ONLY if isLoggedIn is true */}
          {isLoggedIn && (
            <button
              type="button"
              className="card__btn"
              onClick={() => handleLike({ _id: item._id, isLiked })}
            >
              <img
                className="card__like-image"
                src={likeImage}
                alt="Like button"
              />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default ItemCard;
