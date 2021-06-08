import React, { useState, useEffect } from 'react';

const Cart = ( props ) => {
  // const [cartItems, serCurrentCart] = await useState({}) need to pull a user's cart
  const [isLoading, setLoading] = useState(false)
  const [styleId, setStyleId] = useState('');
  const [styleList, setStyleList] = useState([])
  const [selectedStyle, setStyle] = useState({});
  const [skus, setSKUs] = useState([]);
  const [currentSKU, setSKU] = useState({});
  const [selectedSize, setSize] = useState('');
  const [quantities, setQuantities] = useState([]);
  const [selectedQuantity, setQuantity] = useState('');

  useEffect( () => {
    setLoading(true);
    setStyleList(props.styleList);
    setStyle(props.style);
    setStyleId(selectedStyle.style_id);
    setLoading(false);
  }, [])

  useEffect( () => {
    setSKUs(parseSKUs(selectedStyle));
  }, [selectedStyle])

  useEffect( () => {
    for (var i = 0; i < skus.length; i++) {
      if (Object.values(skus[i]).includes(selectedSize)) {
        setSKU(skus[i]);
        var arrayOfQuantities = []
        for (var j = 0; j < skus[i].quantity; j++) {
          arrayOfQuantities.push(j + 1)
        }
      }
    }
    setQuantities(arrayOfQuantities);

  }, [selectedSize])

  // useEffect( () => {

  // }, [currentSKU])



  function handleStyleClick(value) {
    let list = styleList;
    for (var i = 0; i < list.length; i++) {
      if (list[i].style_id === Number(value)){
        setStyle(list[i]);
        setSKUs(parseSKUs(list[i]));
        return;
      }
    }
  }

  return (
    <div >

    <span className='price'>Price: {props.defaultPrice}</span>
    {/* <span className='sales'></span> */}

      <div>
      {
      isLoading
        ? <p>Loading</p>
        : (styleList.map(style =>
          <div
          key={style.style_id}
          id={style.style_id}
          onClick={(e) => handleStyleClick(e.currentTarget.id)}>
            {style.name}
          </div>))
    }
      </div>

    <select name='size' id='size-select' onChange={(e) => setSize(e.target.value)}>
      <option>Select Size</option>
      {
        isLoading
          ? null
          : skus.map(sku =>
            <option>{sku.size}</option>)
        }
    </select>

    <select name='quantity' id='quantity-select' onChange={(e) => setQuantity(e.target.value)}>
      <option></option>
      {
        !quantities
          ? null
          : quantities.map ( quantity =>
            <option>{quantity}</option>
          )
      }
    </select>
      </div>
  )

  function parseSKUs (style) {
      let arrayOfSizesAndQuantities = []
      for (var key in style.skus) {
        arrayOfSizesAndQuantities.push({
            skuID: key,
            size: style.skus[key].size,
            quantity: style.skus[key].quantity
          })
        }
      return arrayOfSizesAndQuantities
  }


}


export default Cart;
