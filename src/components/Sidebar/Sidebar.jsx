import avatar from "../../assets/avatar.svg";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const changeData = () => {
    const location = useLocation();
    if (location.pathname === "/profile") return "header__profile-change-data";
  };

  return (
    <aside>
      {" "}
      <div className="sidebar__profile">
        <div className="sidebar__user-container">
          <img
            src={avatar}
            alt="Terrence Tegegne"
            className="sidebar__avatar"
          />
          <div>
            <p className="sidebar__username">Terrence Tegegne</p>
            <p className={changeData()}>Change profile data</p>
            <p className={changeData()}>Log out</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
