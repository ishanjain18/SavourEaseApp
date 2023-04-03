import { useState } from "react";

function SearchComponent({ suggestions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);
    setShowDropdown(input.length > 0);
    setIsValid(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    if (suggestions.includes(searchTerm)) {
      // Do search
    } else {
      setIsValid(false);
    }
  };
  return (
    <div className="search-component">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        className={isValid ? "" : "invalid-search"}
      />
      <button onClick={handleSearch}>Search</button>
      {showDropdown && (
        <div className="suggestions-dropdown">
          {suggestions
            .filter((suggestion) => suggestion.includes(searchTerm))
            .map((suggestion) => (
              <div
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
