// Import images for header
import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/avatar.svg";
import hamburger from "../../assets/profile-btn.svg";
import menuCloseButton from "../../assets/menu_close-btn.svg";

// Import React Router components and React Hooks
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

// Import ToggleSwitch component
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

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

  // Get page location to determine header CSS style
  const headerClass = () => {
    const location = useLocation();
    return location.pathname === "/profile"
      ? "header header__profile-view"
      : "header";
  };

  const changeData = () => {
    const location = useLocation();
    if (location.pathname === "/profile") return "header__change-data";
  };

  return (
    <header className={headerClass()}>
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
            src={menuCloseButton}
            alt="Menu close button"
            className="modal__menu-closeBtnn"
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
        <NavLink
          className="header__nav-link"
          to="/profile"
          onClick={toggleMobileMenu}
        >
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
