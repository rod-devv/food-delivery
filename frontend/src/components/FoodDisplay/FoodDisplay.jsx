import React, { useContext, useState, useEffect } from "react";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoodList, setFilteredFoodList] = useState([]);

  // Update filtered list when food_list, category or searchQuery changes
  useEffect(() => {
    const filtered = food_list.filter((item) => {
      const matchesCategory = category === "All" || category === item.category;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredFoodList(filtered);
  }, [food_list, category, searchQuery]);

  return (
    <div className="food-display" id="food-display">
      <div id="title">
        <h2>Top dishes near you</h2>
      </div>

      <div className="food-search-container">
        <input
          id="search_food"
          type="text"
          placeholder="Search for food..."
          className="food-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item) => (
            <FoodItem
              key={item._id}
              image={item.image}
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
            />
          ))
        ) : (
          <div className="no-results">
            No food items found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
