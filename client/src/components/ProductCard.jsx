import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../config.js';

// take in destructing {productId}
function ProductCard() {
  const productId = 13027; //placeholder for testing
  // const []

  async function fetchProducts() {
    let productData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}`,
    { headers: { 'Authorization': auth.TOKEN } });

    let productStyles = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/styles`,
    { headers: { 'Authorization': auth.TOKEN } });

    console.log(productData.data);
    console.log(productStyles.data);
  };

  useEffect(() => {
    fetchProducts().catch((err) => console.log(`Error fetching product info: ${err}`))
  }, []);

  return (
    <div>
      <h1>Testing-ProductCard</h1>
      <div></div>
    </div>
  );
};

export default ProductCard;

/*

- pull productId from relatedList

1) product preview image
2) product category
3) product price
4) star rating

*/