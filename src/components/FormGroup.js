import { useEffect, useState } from "react";
import MultiSelect from "../components/MultiSelect";
import { getFormOptions, fetchRecommendations } from "../services/APIService";
import NumberInput from "../components/NumberInput.js";
import { Button } from "@mui/material";
import { getRandomNumber } from "../utilities/HelperFunctions";
import {
  MIN_TIME,
  MAX_TIME,
  MIN_SERVINGS,
  MAX_SERVINGS,
} from "../utilities/constants";

function FormGroup({ recommendations, setRecommendations }) {
  useEffect(() => {
    getFormOptions().then((response) => {
      setIngredOptions(response.ingredients);
      setCourseOptions(response.course);
      setDietOptions(response.diet);
      setCuisineOptions(response.cuisine);
    });
  }, []);

  const [ingredOptions, setIngredOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [dietOptions, setDietOptions] = useState([]);
  const [cuisineOptions, setCuisineOptions] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [time, setTime] = useState(getRandomNumber(1, 30));
  const [servings, setServings] = useState(getRandomNumber(1, 5));
  const [course, setCourse] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [diet, setDiet] = useState([]);

  const [requestData, setRequestData] = useState({});

  useEffect(() => {
    setRequestData({ ingredients, time, servings, course, cuisine, diet });
  }, [ingredients, time, servings, course, cuisine, diet]);

  const handleSumbit = () => {
    fetchRecommendations(JSON.stringify(requestData)).then((data) => {
      setRecommendations(data);
    });
  };
  return (
    <>
      <MultiSelect
        options={ingredOptions}
        setValue={setIngredients}
        label="Add Ingredients"
        placeholder="Search for Ingredients"
      />
      <NumberInput
        value={time}
        setValue={setTime}
        min={MIN_TIME}
        max={MAX_TIME}
        label="Minutes to prepare"
      />
      <NumberInput
        value={servings}
        setValue={setServings}
        min={MIN_SERVINGS}
        max={MAX_SERVINGS}
        label="Enter Number of People"
      />
      <MultiSelect
        options={courseOptions}
        setValue={setCourse}
        label="Add Course"
        placeholder="Search for Course Options"
      />
      <MultiSelect
        options={dietOptions}
        setValue={setDiet}
        label="Add Diet"
        placeholder="Search for Diet"
      />
      <MultiSelect
        options={cuisineOptions}
        setValue={setCuisine}
        label="Add Cuisine"
        placeholder="Search for Cuisine"
      />
      <div className="btn-grp">
        <Button variant="contained" onClick={handleSumbit}>
          Get Recommendations
        </Button>
      </div>
    </>
  );
}

export default FormGroup;
