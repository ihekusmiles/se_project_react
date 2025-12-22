import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import hamburger from "../../assets/profile-btn.svg";
import closeMenu from "../../assets/menu_close-btn.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  // Boolean function that toggles menu (opened/closed)
  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
    console.log("The toggleswitch is now set to:", { isMobileMenuOpened });
  };

  return (
    <header className="header">
      <div className="header__date-location">
        <NavLink to="/">
          <img src={logo} alt="App logo" className="header__logo" />
        </NavLink>
        <p className="header__data">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div
        className={`header__mobile-menu ${
          isMobileMenuOpened ? "mobile-menu_opened" : ""
        }`}
      >
        <button
          className="header__menu-close"
          type="button"
          onClick={toggleMobileMenu}
        >
          <img
            src={closeMenu}
            alt="Menu close button"
            className="modal__closeBtn"
          />
        </button>
        <ToggleSwitch />{" "}
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={() => {
            handleAddClick();
            toggleMobileMenu();
          }}
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
      </div>

      <button
        className="header__profile-btn"
        type="button"
        onClick={toggleMobileMenu}
      >
        {" "}
        <img src={hamburger} alt="Profile button" className="header__profile" />
      </button>
    </header>
  );
}

export default Header;
