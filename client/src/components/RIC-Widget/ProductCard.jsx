import React, { useState, useEffect } from 'react';
import AvgRating from '../AvgRating.jsx';
import ActionButton from './ActionButton.jsx';
import Atelier from '../../Atelier.js';

const ProductCard = ({ productId, index, listState, triggerDelete, triggerModal, offset, productClick }) => {
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState({default: 0, salePrice: null});

  const fetchProducts = async () => {
    let productData = await Atelier.getInfo(productId);
    let productStyles = await Atelier.getStyles(productId);

    const firstStyle = productStyles.results[0];

    setCategory(productData.category);
    setName(productData.name);
    setImage(firstStyle.photos[0].thumbnail_url);
    setPrice({
      default: firstStyle.original_price,
      salePrice: firstStyle.sale_price
      });
  };

  useEffect(() => {
    fetchProducts().catch((err) => console.log(`Error fetching product/style info: ${err}`));
  }, [productId]);

  return (
    <span className='ProductCard' style={{ '--offset': offset }}>
      <ActionButton
        index={index}
        id={productId}
        listState={listState}
        triggerDelete={triggerDelete}
        triggerModal={triggerModal}/>

      <div data-testid='productcard' onClick={() => productClick(productId)}>
        <img className='ProductImage' src={image} alt={name}></img>
        <span id='prod-category'>{category}</span>
        <br />
        <b id='prod-name'>{name}</b>
        <br />
        {price.salePrice
          ? <> <b id="sale-price">${price.salePrice} &nbsp; </b> <strike id='prod-price'>${price.default}</strike> </>
          : <span id='prod-price'>${price.default}</span>
        }
        <br />
        <span id='prod-star'>
          <AvgRating
            productId={productId}/>
        </span>
      </div>
    </span>
  );
};

export default ProductCard;

/*
Future Enhancements ???
*/