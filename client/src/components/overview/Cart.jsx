import React, { useState, useEffect } from 'react';

const Cart = ( { stylesList, style, handleStyleSelect, currentProduct } ) => {
  // const [cartItems, serCurrentCart] = await useState({}) need to pull a user's cart
  // const [styleId, setStyleId] = useState('');
  // const [isLoading, setLoading] = useState(false);
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
    for (var i = 0; i < skus.length; i++) {
      if (Object.values(skus[i]).includes(selectedSize)) {
        setSKU(skus[i]);
        var arrayOfQuantities = [];
        for (var j = 0; j < skus[i].quantity; j++) {
          arrayOfQuantities.push(j + 1);
        }
      }
    }
    setQuantities(arrayOfQuantities);
  }, [selectedSize]);

  return (
    <form className='cart' data-testid="cart-1">

      {/* Star Rating goes here */} <span className='cart-ratings'>Star Rating PlaceHolder</span>

      <span id='name'>{currentProduct.name}</span><br></br>

      <span id='category'>{currentProduct.category}</span><br></br>

      {!price.sale
        ?<span className='price'>Price: {price.default}</span>
        :<span className='price-sale'>Price: <strike>{price.default}</strike>{price.sale}</span>}

      <div className='styles-box'>
        <h1><strong>Style</strong> > <em>{style.name}</em></h1>
        <div className='styles'>
        {stylesList.map(style => {
          return <div className='style' key={style.style_id}>
            <label>
              <span className='style-caption'>
                <span>{style.name}</span>
                </span>
              <input type="radio" name="check" className='check'/>
              <img
              key={style.style_id}
              pic-id={style.style_id}
              src={style.photos[0].thumbnail_url}
              onClick={(e) => handleStyleSelect(e.currentTarget.getAttribute('pic-id'))}/>
            </label>
          </div>
        })}
        </div>
      </div>

      <div className='size-select'>
      <select name='size' id='size-select' onChange={(e) => setSize(e.target.value)}>
        <option>Select Size</option>
        {skus.map(sku =>
        <option key={sku.quantity + 50}>{sku.size}</option>)}
      </select>
      </div>

      <div className='quantity-select'>
      <select name='quantity' id='quantity-select' onChange={(e) => setQuantity(e.target.value)}>
        <option>------</option>
        {
          !quantities
          ? null
          : quantities.map ((quantity, index) =>{
            if (index < 15) {
              return <option key={quantity + 20}>{quantity}</option>
            }}
            )
          }
      </select>
      </div>

      <div className="cart-submit">
        <input type="submit" value="Add to Cart" ></input>
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
