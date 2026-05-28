import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleChangeDataClick,
}) {
  return (
    <section className="profile">
      <Sidebar handleChangeDataClick={handleChangeDataClick} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
export default Profile;
