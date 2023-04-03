import "../static/TopBar.css";
import logo from "../static/brand_logo.png";
// import SearchComponent from "./Search";
// import { useEffect, useState } from "react";

function TopBar() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [suggestions, setSuggestions] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:8000/search");
  //     const data = await response.json();
  //     setSuggestions(data);
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="top-bar">
      <div className="brand">
        <img src={logo} className="logo" alt="SavourEase" />
      </div>
      {/* <div className="search">
        {!isLoading && (
          <SearchComponent suggestions={suggestions}></SearchComponent>
        )}
      </div> */}
    </div>
  );
}

export default TopBar;
