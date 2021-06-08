import React, { useState, useEffect } from 'react';

const Cart = ( props ) => {
  // const [cartItems, serCurrentCart] = await useState({}) need to pull a user's cart

  const [styleId, setStyleId] = useState('');
  const [selectedStyle, setStyle] = useState(props.styleList);
  const [sizes, setSizes] = useState ([]);
  const [quantity, setQuantities] = useState ([]);
  const [selectedSize, setSize] = useState('');
  const [selectedQuantity, setQuantity] = useState('');

  useEffect( () => {
    setStyle(props.styleList);
  }, [])

  function handleStyleClick(value) {
    // iterate over the stylesList.
    // if the stylesList contains the value as a value
    // setStyle that style
    let list = props.styleList;
    // let listed = list.styleList;
    for (var i = 0; i < list.length; i++) {
      if (Object.values(list[i]).includes(Number(value))){
        setStyle(list[i])
      }
    }
  }

  return (
    <div >Cart
      <div>
      {selectedStyle.length
      ? (props.styleList.map(
        style => <div
        key={style.style_id}
        onClick={(e) => handleStyleClick(e.target.getAttribute('key'))}>
          {style.name}
        </div>))
      : <p>No Product Selected</p>
    }
      </div>

    <select name='size' id='size-select' onChange={(e) => setSize(e.target.value)}>
      <option>Select Size</option>
      {
        selectedStyle.length
        ? selectedStyle.map( entry =>
          {for (var key in entry.skus) {
             <option>
              {entry.skus[key].size}
            </option>
          }} )
          : null
        }
    </select>

    <select name='quantity' id='quantity-select' onChange={(e) => setQuantity(e.target.value)}>
      <option></option>
    </select>
      </div>
  )



}
// function parseSKUs (style) {
  //   let arrayOfSizesAndQuantities = []
  //   console.log(style)
  //   for (var key in style.style) {
    //     console.log(key)
    //     console.log(style.style)
    //     arrayOfSizesAndQuantities.push({
      //       skuID: key,
      //       size: style.style[key]
      //     })
      //   }
      //   console.log(arrayOfSizesAndQuantities)
// }

export default Cart;