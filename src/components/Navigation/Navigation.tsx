import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./Navigation.css";

function Navigation() {
  const context = useContext(AppContext);
  if (!context) return null;
  const { setActivePage } = context;

  return (
    <div className="nav-container">
      <button className="logo" onClick={() => setActivePage("")}>
        mind-full
      </button>

      <ul className="nav-items-list">
        <li>
          <button className="nav-item" onClick={() => setActivePage("")}>
            home
          </button>
        </li>

        <li>
          <button className="nav-item" onClick={() => setActivePage("notes")}>
            notes
          </button>
        </li>

        <li>
          <button className="nav-item">change theme</button>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
