import DishCard from "./DishCard";
import { useState, useEffect } from "react";

const CategoryRow = ({ categoryData, category }) => {
  const [headerText, setHeaderText] = useState("");

  useEffect(() => {
    switch (category) {
      case "course":
        setHeaderText("Consider these recipes based on Course...");
        break;
      case "diet":
        setHeaderText(
          "Try these similar recipes based on your dietary preferences..."
        );
        break;
      case "cuisine":
        setHeaderText("Consider these recipes with a matching cuisine...");
        break;
      case "ingredients":
        setHeaderText("Try these dishes based on your ingredients preferences");
        break;

      default:
        setHeaderText("Here are some recommended recipes for you...");
        break;
    }
  }, [category]);
  return (
    <div style={{}}>
      <h3 style={{ fontWeight: "400", fontSize: "24px", paddingLeft: 16 }}>
        {headerText}
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginRight: 20,
          backgroundColor: "#F8F8F8",
          borderRadius: 10,
        }}
      >
        {Object.keys(categoryData).map((recipe) => {
          return <DishCard dishData={categoryData[recipe]} />;
        })}
      </div>
    </div>
  );
};

export default CategoryRow;
