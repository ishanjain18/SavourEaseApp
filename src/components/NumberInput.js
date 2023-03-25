import React from "react";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const NumberInput = ({ min, max, label, value, setValue }) => {
  const handleSliderChange = (event, value) => {
    setValue(value);
  };

  const handleInputChange = (event) => {
    let inputValue = event.target.value;
    if (inputValue < 0) {
      inputValue = 0;
    } else if (inputValue > max) {
      inputValue = max;
    }
    setValue(inputValue);
  };

  return (
    <div style={{ minWidth: 180 }}>
      <Typography id="minutes-input" gutterBottom>
        {label}
      </Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Slider
          value={value}
          min={min}
          max={max}
          onChange={handleSliderChange}
          style={{ margin: 16 }}
          aria-labelledby="minutes-input"
        />
        <TextField
          type="number"
          value={value}
          onChange={handleInputChange}
          inputProps={{ min: min, max: max }}
          style={{ minWidth: 75 }}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default NumberInput;
