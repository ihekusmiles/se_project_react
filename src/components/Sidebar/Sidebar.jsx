import { useLocation } from "react-router-dom";

// Import useContext and CurrentUserContext
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Sidebar({ handleChangeDataClick, handleLogOutClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const changeData = () => {
    if (location.pathname === "/profile") return "sidebar__profile-change-data";
  };

  return (
    <aside>
      {" "}
      <div className="sidebar__profile">
        <div className="sidebar__user-container">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="sidebar__avatar"
          />
          <p className="sidebar__username">{currentUser.name}</p>
        </div>
        <div>
          <button
            className={changeData()}
            type="button"
            onClick={() => {
              handleChangeDataClick();
            }}
          >
            Change profile data
          </button>
          <button
            className="sidebar__profile-logout"
            type="button"
            onClick={() => {
              handleLogOutClick();
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
