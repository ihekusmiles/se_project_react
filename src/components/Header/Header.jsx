import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

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
        <NavLink to="/">
          <img src={logo} alt="App logo" className="header__logo" />
        </NavLink>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />{" "}
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </NavLink>
      </header>
      {/* Code below is for responsive design eg. adding the profile-btn.svg
        <button
          className="header__profile-btn"
          type="button"
          onClick={handleAddClick}
        >
          <img src={profile} alt="Profile button" className="header__profile" />
        </button> */}
      {/* <p className="header__date-and-location header__alternative">
        {currentDate}, {weatherData.city}
      </p> */}
    </>
  );
}

export default Header;
