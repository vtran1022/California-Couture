import React, { useState, useEffect } from 'react';
import AvgRating from '../AvgRating.jsx';

const Cart = ( { stylesList, style, handleStyleSelect, currentProduct } ) => {
  const [skus, setSKUs] = useState(parseSKUs(style));
  const [currentSKU, setSKU] = useState({});
  const [selectedSize, setSize] = useState('');
  const [quantities, setQuantities] = useState([]);
  const [selectedQuantity, setQuantity] = useState('');
  const [price, setPrice] = useState({
    default: currentProduct.default_Price,
    sale: style.sale_price
  })

  function handleSubmit (e) {
    e.preventDefault();
  }

  useEffect( () => {
    setPrice({
      default: currentProduct.default_price,
      sale: style.sale_price
    });
  }, [style])

  useEffect( () => {
    let len = skus.length;
    for (let i = 0; i < len; i++) {
      if (Object.values(skus[i]).includes(selectedSize)) {
        setSKU(skus[i]);
        var arrayOfQuantities = [];
        for (let j = 0; j < skus[i].quantity; j++) {
          arrayOfQuantities.push(j + 1);
        }
      }
    }
    setQuantities(arrayOfQuantities);
  }, [selectedSize]);

  return (
    <form className='cart' data-testid="cart-1" onSubmit={handleSubmit}>

      <div className='cart-ratings'>
      <AvgRating productId={ currentProduct.id } />
      </div>

      <span id='name'>{currentProduct.name}</span><br></br>

      <span id='category'>{currentProduct.category}</span><br></br>

      {!price.sale
        ?<span className='price'>Price: ${price.default}</span>
        :<span className='price-sale'>Price: ${price.sale} <strike>${price.default}</strike></span>}

      <div className='styles-box'>
        <h1><strong>Style</strong> > <em>{style.name}</em></h1>
        <div className='styles'>
        {stylesList.map( (stylePic, index) => {
          return <div className='style' key={stylePic.style_id}>
            <span className='style-caption'>{stylePic.name}</span>
            <img
            className={
              (stylePic === style)
              ? 'style-selected'
              : 'style-not-selected'}
            key={stylePic.style_id}
            pic-id={stylePic.style_id}
            src={stylePic.photos[0].thumbnail_url}
            alt={stylePic.name}
            onClick={(e) => handleStyleSelect(e.currentTarget.getAttribute('pic-id'))}/>
          </div>
        })}
        </div>
      </div>

      <div className='size-select'>
      <select name='size' id='size-select' onChange={(e) => setSize(e.target.value)}>
        <option>Select Size</option>
        {skus.map((sku, index) =>
        <option key={index}>{sku.size}</option>)}
      </select>
      </div>


      <div className='quantity-select'>
      {!quantities
       ? null
       : <select name='quantity' id='quantity-select' onChange={(e) => setQuantity(e.target.value)}>
          <option>Quantity</option>
          {quantities.map ((quantity, index) =>{
            if (index < 15) {
              return <option key={index}>{quantity}</option>;
            }})
          }
      </select>
    }
      </div>

      <div className="cart-submit">
        {!selectedQuantity
        ?  <input type="submit" value="Add to Cart" hidden ></input>
        : <input type="submit" value="Add to Cart" ></input>
        }
      </div>
    </form>

  )

  function parseSKUs (style) {
      let arrayOfSizesAndQuantities = [];
      for (var key in style.skus) {
        arrayOfSizesAndQuantities.push({
            skuID: key,
            size: style.skus[key].size,
            quantity: style.skus[key].quantity
          });
        }
      return arrayOfSizesAndQuantities;
  }

}


export default Cart;
