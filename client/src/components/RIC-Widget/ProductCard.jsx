import React, { useState, useEffect } from 'react';
import AvgRating from '../AvgRating.jsx';
import ActionButton from './ActionButton.jsx';
import Atelier from '../../Atelier.js';

const ProductCard = ({ productId, index, listState, triggerDelete, triggerModal, offset }) => {
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState({default: 0, salePrice: null});

  const fetchProducts = () => {
    Atelier.getInfo(productId)
    .then((product) => {
      setCategory(product.category);
      setName(product.name);
    })
    .catch((err) => console.log(`Error fetching product info: ${err}`));

    Atelier.getStyles(productId).then((data) => {
      const firstStyle = data.results[0];
      setImage(firstStyle.photos[0].thumbnail_url);
      setPrice({
        default: firstStyle.original_price,
        salePrice: firstStyle.sale_price
      });
    })
    .catch((err) => console.log(`Error fetching style info: ${err}`));
  };

  useEffect(() => {
    fetchProducts();
  }, [productId]);

  return (
    <div className='ProductCard' style={{ '--offset': offset }}>
      <ActionButton
        index={index}
        id={productId}
        listState={listState}
        triggerDelete={triggerDelete}
        triggerModal={triggerModal}/>

      <img className='ProductImage' src={image} alt={name}></img>
      <div className='ProductInfo'>
        <span id='prod-category'>{category}</span>
        <br />
        <b id='prod-name' /*onClick holder here*/>{name}</b>
        <br />
        {price.salePrice
          ? <span id="sale-price">${price.salePrice}<strike>${price.default}</strike> </span>
          : <span id='prod-price'>${price.default}</span>
        }
        <AvgRating
          productId={productId}/>
      </div>
    </div>
  );
};

export default ProductCard;

/*

onClick product name - navigate to detail page. Need to pass the productId back up to App and re-render page

Future Enhancements ???
*/