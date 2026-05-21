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

// Import useContext and CurrentUserContext
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
}) {
  // const currentUser = useContext(CurrentUserContext);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  // Boolean function that toggles menu (opened/closed)
  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };

  // Get page location to determine header CSS style
  const location = useLocation(); // Hook is called at the top level
  const headerClass = () => {
    return location.pathname === "/profile"
      ? "header header__profile-view"
      : "header";
  };

  // const changeData = () => {
  //   const location = useLocation();
  //   if (location.pathname === "/profile") return "header__change-data";
  // };

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
        {/* Using conditional rendering to show completely different elements */}
        {currentUser._id ? (
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
        ) : (
          <button
            className="header__register-btn"
            type="button"
            onClick={() => {
              handleRegisterClick();
            }}
          >
            Sign Up
          </button>
        )}
        <NavLink
          className="header__nav-link"
          to="/profile"
          onClick={toggleMobileMenu}
        >
          {/* Using conditional rendering to show completely different elements */}
          {currentUser._id ? (
            <div className="header__user-container">
              <p className="header__username">Hector Robles</p>
              <img
                src={avatar}
                alt="Terrence Tegegne"
                className="header__avatar"
              />
            </div>
          ) : (
            <button
              className="header__login-btn"
              type="button"
              onClick={() => {
                handleLoginClick();
              }}
            >
              Log In
            </button> // Change className and CSS
          )}
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
