import themaLogo from "../assets/thema_logo.svg";
import "./MainHeader.css";
import { View } from "./Layout";

type MainHeaderProps = {
  onMenuClick: (view: View) => void;
};

function MainHeader({ onMenuClick }: MainHeaderProps) {
  return (
    <header className="mainHeader">
      <div className="headerRow">
        <a className="logo" href="https://" target="_blank">
          <img src={themaLogo} alt="Thema logo" />
        </a>
        <a className="season">Spielzeit: </a>
        <select>
          <option>2026</option>
        </select>
      </div>

      <div className="menu">
        <button className="menuBtn" onClick={() => onMenuClick("bookings")}>
          Bookings
        </button>
        <button className="menuBtn" onClick={() => onMenuClick("productions")}>
          Produktionen
        </button>
        <button className="menuBtn" onClick={() => onMenuClick("calendar")}>
          Kalender
        </button>
        <button className="menuBtn" onClick={() => onMenuClick("ensembles")}>
          Ensembles
        </button>
      </div>
    </header>
  );
}

export default MainHeader;
