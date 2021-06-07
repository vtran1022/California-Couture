import React, { useState } from 'react';

function Cart ( { styleList, defaultPrice } ) {
  // const [cartItems, serCurrentCart] = await useState({}) need to pull a user's cart
  const [size, setSize] = useState({})

  return (
    <div>Cart

    <select name='size' id='size-select' onChange={(e) => setStyle(e.target.value)}>
      <option>Select Size</option>
      { styleList.map( style =>
        <option key={style.style_id}>{style.name}</option>
      )}
    </select>
      </div>
  )

}


export default Cart;