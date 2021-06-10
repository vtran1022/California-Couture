import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../../config.js';
import AvgRating from '../AvgRating.jsx';
import ActionButton from './ActionButton.jsx';

function ProductCard({ productId, index, listState, triggerDelete }) {
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [salePrice, setSale] = useState(0);

  async function fetchProducts() {
    let productData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}`,
    { headers: { 'Authorization': auth.TOKEN } });

    let productStyles = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/styles`,
    { headers: { 'Authorization': auth.TOKEN } });

    const product = productData.data;
    const firstStyle = productStyles.data.results[0];

    setCategory(product.category);
    setName(product.name);
    setImage(firstStyle.photos[0].thumbnail_url);
    setPrice(firstStyle.original_price);

    if (firstStyle.sale_price !== null) {
      setSale(firstStyle.sale_price);
    };
  };

  useEffect(() => {
    fetchProducts().catch((err) => console.log(`Error fetching product info: ${err}`))
  }, [productId]);

  return (
    <div className='ProductCard'>
      <ActionButton
        index={index}
        listState={listState}
        triggerDelete={triggerDelete}/>
      <img src={image} alt={name} className='ProductImage'></img>
      <div>{category}</div>
      <div>{name}</div>
      <div>${price}</div>
      <AvgRating
        productId={productId}/>
    </div>
  );
};

export default ProductCard;

/*
action buttons:
☆ or x

'☆' - will open up comparison modal component
x - will delete the product card

*/