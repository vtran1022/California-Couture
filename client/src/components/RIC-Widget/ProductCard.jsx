import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../../config.js';
import AvgRating from '../AvgRating.jsx';

function ProductCard({ productId }) {
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
    <div>
      <div>
        <img src={image} alt={name}></img>
        <div>{category}</div>
        <div>{name}</div>
        <div>${price}</div>
        <AvgRating
          productId={productId}/>
      </div>
    </div>
  );
};

export default ProductCard;

/*

- pull productId from relatedList

1) product preview image
2) product category
3) product name
4) product price
5) star rating

*/