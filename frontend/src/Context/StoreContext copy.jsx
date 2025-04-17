import { createContext, useEffect, useState, useRef } from "react";
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

  // Add these refs to track pending operations
  const updateTimeoutRef = useRef({});
  const lastSyncedCartRef = useRef({});

  const addToCart = async (itemId) => {
    // Update UI immediately for responsiveness
    setCartItems((prev) => {
      const newCount = prev[itemId] ? prev[itemId] + 1 : 1;
      return { ...prev, [itemId]: newCount };
    });

    // Only sync with backend if authenticated
    if (token) {
      // Clear any pending timeout for this item
      if (updateTimeoutRef.current[itemId]) {
        clearTimeout(updateTimeoutRef.current[itemId]);
      }

      // Debounce API calls - wait until user stops clicking rapidly
      updateTimeoutRef.current[itemId] = setTimeout(async () => {
        try {
          // Get the current cart state after all React updates
          const currentCount = cartItems[itemId] || 0;
          const lastSynced = lastSyncedCartRef.current[itemId] || 0;
          const diff = currentCount - lastSynced;

          // Only make API calls if there's a difference to sync
          if (diff > 0) {
            // Add items one by one to ensure consistency
            for (let i = 0; i < diff; i++) {
              await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { token } }
              );
            }
            // Update our tracking of what's been synced
            lastSyncedCartRef.current[itemId] = currentCount;
          }
        } catch (error) {
          console.error("Failed to sync cart with server:", error);
        }
      }, 300); // 300ms debounce
    }
  };

  const removeFromCart = async (itemId) => {
    // Update UI immediately
    setCartItems((prev) => {
      const newCount = prev[itemId] > 0 ? prev[itemId] - 1 : 0;
      return { ...prev, [itemId]: newCount };
    });

    // Only sync with backend if authenticated
    if (token) {
      // Clear any pending timeout for this item
      if (updateTimeoutRef.current[itemId]) {
        clearTimeout(updateTimeoutRef.current[itemId]);
      }

      // Debounce API calls
      updateTimeoutRef.current[itemId] = setTimeout(async () => {
        try {
          const currentCount = cartItems[itemId] || 0;
          const lastSynced = lastSyncedCartRef.current[itemId] || 0;
          const diff = lastSynced - currentCount;

          // Only remove if needed
          if (diff > 0) {
            for (let i = 0; i < diff; i++) {
              await axios.post(
                url + "/api/cart/remove",
                { itemId },
                { headers: { token } }
              );
            }
            lastSyncedCartRef.current[itemId] = currentCount;
          }
        } catch (error) {
          console.error("Failed to sync cart with server:", error);
        }
      }, 300); // 300ms debounce
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
    // Initialize sync state when cart loads
    lastSyncedCartRef.current = { ...response.data.cartData };
  };

  // Initialize lastSyncedCartRef when cart items change significantly
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      lastSyncedCartRef.current = { ...cartItems };
    }
  }, [token]);

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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
