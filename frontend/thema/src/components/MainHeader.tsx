import themaLogo from '../assets/thema_logo.svg'
import "./MainHeader.css"

function MainHeader() {
  return (
    <header style={{ backgroundColor: "#CCC", color: "black", padding: "1rem"}}>
      <a href="https://" target="_blank">
        <img src={themaLogo} className="logo thema" alt="Thema logo" />
      </a>
      <a>Spielzeit: </a>
        <button onClick={() => ("")}>
            IMAGINALE 27
        </button> <br />
      <div className='menu'> 
        <button className='menuBtn'>Bookings</button>
        <button className='menuBtn'>Produktionen</button>
        <button className='menuBtn'>Kalender</button>
        <button className='menuBtn'>Ensembles</button>
      </div> 
    </header>
  );
}

export default MainHeader;