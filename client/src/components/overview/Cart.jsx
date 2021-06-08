import React, { useState, useEffect } from 'react';

const Cart = ( props ) => {
  // const [cartItems, serCurrentCart] = await useState({}) need to pull a user's cart

  const [styleId, setStyleId] = useState('');
  const [styleList, setStyleList] = useState([])
  const [selectedStyle, setStyle] = useState({});
  const [sizes, setSizes] = useState ([]);
  const [quantity, setQuantities] = useState ([]);
  const [selectedSize, setSize] = useState('');
  const [selectedQuantity, setQuantity] = useState('');

  useEffect( () => {
    setStyleList(props.styleList);
    setStyle(props.style);
    setStyleId(selectedStyle.style_id);
  }, [])

  function handleStyleClick(value) {
    let list = styleList;
    for (var i = 0; i < list.length; i++) {
      if (list[i].style_id === Number(value)){
        setStyle(list[i]);
        return
      }
    }
  }

  return (
    <div >Cart

    <span className='price'>{props.defaultPrice}</span>
    {/* <span className='sales'></span> */}

      <div>
      {selectedStyle
      ? (styleList.map(style =>
        <div
        key={style.style_id}
        id={style.style_id}
        onClick={(e) => handleStyleClick(e.currentTarget.id)}>
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