import TopBar from "../components/TopBar";
import "../static/Home.css";

function Home() {
  return (
    <div className="home-body">
      <TopBar />
      <div className="main">
        <div className="form-col"></div>
        <div className="data-col"></div>
      </div>
    </div>
  );
}

export default Home;
