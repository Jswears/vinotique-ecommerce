"use client";

import { useState, useEffect } from "react";
import { Wine } from "../types";

export function useCart() {
  const [cart, setCart] = useState<Wine[]>([]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setItemCount(cart.reduce((total, item) => total + (item.quantity || 0), 0));
  }, [cart]);

  const addToCart = (wine: Wine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === wine.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === wine.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...wine, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        )
        .filter((item) => (item.quantity || 0) > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return { cart, itemCount, addToCart, updateQuantity, removeItem };
}
