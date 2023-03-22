import "../static/TopBar.css";
import logo from "../static/brand_logo.png";

function TopBar() {
  return (
    <div className="top-bar">
      <div className="brand">
        <img src={logo} className="logo" alt="SavourEase" />
      </div>
      <div className="search">searchbar</div>
    </div>
  );
}

export default TopBar;
