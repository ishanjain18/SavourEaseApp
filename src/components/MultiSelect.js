import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { capitalizeWords } from "../utilities/HelperFunctions";

const MultiSelect = ({ options, setValue, label, placeholder }) => {
  const [searchValue] = useState("");
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const filteredOptions = options.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );

    setChoices(filteredOptions);
  }, [searchValue, options]);

  return (
    <div>
      <Autocomplete
        multiple
        noOptionsText="No Options"
        options={choices}
        getOptionLabel={(choice) => capitalizeWords(choice)}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={placeholder}
          />
        )}
        onChange={(event, value) => setValue(value.map((item) => item))}
      />
    </div>
  );
};

export default MultiSelect;
