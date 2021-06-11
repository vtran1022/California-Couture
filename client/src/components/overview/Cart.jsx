import React, { useState, useEffect } from 'react';

const Cart = ( props ) => {
  // const [cartItems, serCurrentCart] = await useState({}) need to pull a user's cart
  // const [styleId, setStyleId] = useState('');
  // const [isLoading, setLoading] = useState(false);
  const [skus, setSKUs] = useState(parseSKUs(props.style));
  const [currentSKU, setSKU] = useState({});
  const [selectedSize, setSize] = useState('');
  const [quantities, setQuantities] = useState([]);
  const [selectedQuantity, setQuantity] = useState('');
  const [price, setPrice] = useState({
    default: props.defaultPrice,
    sale: props.style.sale_price
  })

  function handleSubmit (e) {
    e.preventDefault();
  }

  useEffect( () => {
    setPrice({
      default: props.currentProduct.default_price,
      sale: props.style.sale_price
    });
  }, [props.style])

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

      <span id='name'>{props.currentProduct.name}</span><br></br>

      <span id='category'>{props.currentProduct.category}</span><br></br>

      {!price.sale
        ?<span className='price'>Price: {price.default}</span>
        :<span className='price-sale'>Price: <strike>{price.default}</strike>{price.sale}</span>}

      <div className='styles-box'>
        <h1>Style: {props.style.name}</h1>
        <div className='styles'>
        {props.stylesList.map(style => {
          return <div className='style' key={style.style_id}>
            <span id='style-name'>{style.name}</span>
            <img
            id='style-pic'
            key={style.style_id}
            pic-id={style.style_id}
            src={style.photos[0].thumbnail_url}
            onClick={(e) => props.handleStyleSelect(e.currentTarget.getAttribute('pic-id'))}/>
          </div>
        })}
        </div>
      </div>

      <div>
      <select name='quantity' id='quantity-select' onChange={(e) => setQuantity(e.target.value)}>
        <option></option>
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

      <div>
      <select name='size' id='size-select' onChange={(e) => setSize(e.target.value)}>
        <option>Select Size</option>
        {skus.map(sku =>
        <option key={sku.quantity + 50}>{sku.size}</option>)}
      </select>
      </div>

      <div className="cart-submit">
        <input type="submit" value="Add to Cart" onSubmit={(e) => handleSubmit(e)}></input>
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
