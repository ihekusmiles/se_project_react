import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleChangeDataClick,
  onCardLike,
}) {
  return (
    <section className="profile">
      <Sidebar handleChangeDataClick={handleChangeDataClick} />
      <ClothesSection
        onCardLike={onCardLike}
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
export default Profile;
