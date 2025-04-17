import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const currency = "$";
  const deliveryCharge = 5;

  // Simplified cart operations - only update local state
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCount = prev[itemId] ? prev[itemId] + 1 : 1;
      return { ...prev, [itemId]: newCount };
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCount = prev[itemId] > 0 ? prev[itemId] - 1 : 0;
      return { ...prev, [itemId]: newCount };
    });
  };

  // New function to synchronize cart with server at checkout
  const syncCartWithServer = async () => {
    if (!token) return false;

    try {
      // Send the entire cart in one request
      const response = await axios.post(
        url + "/api/cart/sync",
        { cartItems },
        { headers: { token } }
      );
      return response.data.success;
    } catch (error) {
      console.error("Failed to sync cart with server:", error);
      return false;
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      } catch (error) {}
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: token }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData({ token: localStorage.getItem("token") });
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
    currency,
    deliveryCharge,
    syncCartWithServer, // Add the new sync function to context
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
