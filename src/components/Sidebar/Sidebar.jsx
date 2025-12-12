import avatar from "../../assets/avatar.svg";

export default function Sidebar() {
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
          <p className="sidebar__username">Terrence Tegegne</p>
        </div>
      </div>
    </aside>
  );
}
