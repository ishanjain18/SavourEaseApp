import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MultiselectInput = ({ apiUrl }) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setItems(data.ingredients);
      setIsLoading(false);
    };
    fetchData();
  }, [apiUrl]);

  const handleItemSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <ul>
            {filteredItems.map((item) => (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => handleItemSelect(item)}
                  />
                  {item.name} - {item.frequency}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

MultiselectInput.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default MultiselectInput;
