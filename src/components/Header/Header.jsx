import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick }) {
  return (
    <header className="header">
      <img src={logo} alt="App logo" className="header__logo" />
      <p className="header__date-and-location">June 15, New York</p>
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
    </header>
  );
}

export default Header;
