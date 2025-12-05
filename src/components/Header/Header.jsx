import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
// import profile from "../../assets/profile-btn.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <>
      {" "}
      <header className="header">
        <img src={logo} alt="App logo" className="header__logo" />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>

        {/* Code below is for responsive design eg. adding the profile-btn.svg
        <button
          className="header__profile-btn"
          type="button"
          onClick={handleAddClick}
        >
          <img src={profile} alt="Profile button" className="header__profile" />
        </button> */}
      </header>
      <p className="header__date-and-location header__alternative">
        {currentDate}, {weatherData.city}
      </p>
    </>
  );
}

export default Header;
