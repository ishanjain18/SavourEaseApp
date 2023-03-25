import TopBar from "../components/TopBar";
import { useEffect } from "react";
import "../static/Home.css";
import { useState } from "react";
import FormGroup from "../components/FormGroup";
import DishCard from "../components/DishCard";

function Home() {
  const [recommendations, setRecommendations] = useState({});

  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (Object.keys(recommendations).length > 0) {
      setShowCard(true);
      console.log(showCard);
    }
  }, [recommendations]);

  return (
    <div className="home-body">
      <TopBar />
      <div className="main">
        <div className="form-col">
          <FormGroup
            recommendations={recommendations}
            setRecommendations={setRecommendations}
          />
        </div>
        <div className="data-col">
          {Object.keys(recommendations).map((category) => {
            return Object.keys(recommendations[category]).map((recipe) => {
              console.log(recommendations[category][recipe]);
              return <DishCard dishData={recommendations[category][recipe]} />;
            });
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
