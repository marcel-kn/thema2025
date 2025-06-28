import themaLogo from "../assets/thema_logo.svg";
import "./MainHeader.css";

function MainHeader() {
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
        <button className="menuBtn">Bookings</button>
        <button className="menuBtn">Produktionen</button>
        <button className="menuBtn">Kalender</button>
        <button className="menuBtn">Ensembles</button>
      </div>
    </header>
  );
}

export default MainHeader;
