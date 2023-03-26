import TopBar from "../components/TopBar";
import { useEffect } from "react";
import "../static/Home.css";
import { useState } from "react";
import FormGroup from "../components/FormGroup";
import CategoryRow from "../components/CategoryRow.js";
import IntroContainer from "../components/IntroContainer";

function Home() {
  const [recommendations, setRecommendations] = useState({});

  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (Object.keys(recommendations).length > 0) {
      setShowCard(true);
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
          {!showCard && <IntroContainer />}
          {showCard &&
            Object.keys(recommendations).map((category) => {
              return (
                <CategoryRow
                  key={category}
                  categoryData={recommendations[category]}
                  category={category}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;

// Object.keys(recommendations[category]).map((recipe) => {
//   return (
//     <DishCard dishData={recommendations[category][recipe]} />
//   );
// });
