import React from "react";
import { useState, useEffect } from "react";

const ItemListContainer = () => {
  const [flights, setFlights] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <div>ItemListContainer</div>;
};

export default ItemListContainer;
