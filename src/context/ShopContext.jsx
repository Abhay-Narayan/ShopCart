import { createContext, useState, useEffect } from "react";
import { PRODUCTS } from "../assets/products";
import PropTypes from "prop-types";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  // Initialize cartItems from localStorage or as an empty array
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Initialize totalItems from localStorage or as 0
  const [totalItems, setTotalItems] = useState(() => {
    const storedTotalItems = localStorage.getItem("totalItems");
    return storedTotalItems ? parseInt(storedTotalItems) : 0;
  });

  // Initialize subtotal from localStorage or as 0
  const [subtotal, setSubtotal] = useState(() => {
    const storedSubtotal = localStorage.getItem("subtotal");
    return storedSubtotal ? parseFloat(storedSubtotal) : 0;
  });

  // Initialize totalPrice from localStorage or as 0
  const [totalPrice, setTotalPrice] = useState(() => {
    const storedTotalPrice = localStorage.getItem("totalPrice");
    return storedTotalPrice ? parseFloat(storedTotalPrice) : 0;
  });

  // Discount rate
  const discountRate = 0.10;

  // Calculate subtotal and total price whenever cartItems change
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newTotalPrice = newSubtotal * (1 - discountRate);

    setSubtotal(newSubtotal);
    setTotalPrice(newTotalPrice);

    // Update localStorage whenever cartItems, subtotal, or totalPrice changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalItems", totalItems.toString());
    localStorage.setItem("subtotal", subtotal.toString());
    localStorage.setItem("totalPrice", totalPrice.toString());
  }, [cartItems, totalItems, subtotal, totalPrice]);

  const addToCart = (Itemid) => {
    const product = PRODUCTS.find((item) => item.id === Itemid);

    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.id === Itemid);

      if (existingItemIndex >= 0) {
        // If item already exists, increase the quantity
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Otherwise, add the item to the cart
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    setTotalItems((prevTotalItems) => prevTotalItems + 1);
  };


  const removeFromCart = (Itemid) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.id === Itemid);

      if (existingItemIndex >= 0) {
        const updatedCart = [...prev];
        const existingItem = updatedCart[existingItemIndex];

        if (existingItem.quantity > 1) {
          // Decrease quantity if more than 1
          existingItem.quantity -= 1;
        } else {
          // Remove item from cart if quantity is 1
          updatedCart.splice(existingItemIndex, 1);
        }
        return updatedCart;
      }

      return prev;
    });

    setTotalItems((prevTotalItems) => (prevTotalItems > 0 ? prevTotalItems - 1 : 0));
  };

  const removeSingle = (Itemid) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== Itemid);
      return updatedCart;
    });

    setTotalItems((prevTotalItems) => {
      const itemToRemove = cartItems.find((item) => item.id === Itemid);
      return itemToRemove ? prevTotalItems - itemToRemove.quantity : prevTotalItems;
    });
  };

  const emptyCart = () => {
    setCartItems([]);
    setTotalItems(0);
    setSubtotal(0);
    setTotalPrice(0);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    totalItems,
    emptyCart,
    subtotal,
    totalPrice,
    removeSingle
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
