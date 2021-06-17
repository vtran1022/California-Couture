import React, { useState, useEffect } from 'react';
import ImageGallery from './overview/ImageGallery.jsx';
import Cart from './overview/Cart.jsx';
import Description from './overview/Description.jsx';
import Atelier from '../Atelier.js';
import { auth } from '../../../config.js';

const Overview = ({ theme, productId, styles, product }) => {
  const [currentProduct, setCurrentProduct] = useState(product);
  const [styleId, setStyleId] = useState(productId);
  const [styleList, setStyleList] = useState(styles);
  const [style, setStyle] = useState(styles[0]);
  // const [cartItems, serCurrentCart] = await useState({})

  useEffect(() => {
    setStyleList(styles);
    setStyle(styles[0]);
    setStyleId(styles[0].style_id)
    setCurrentProduct(product);
    }, [styles]);

  const handleStyleSelect = (value) => {
    for (var i = 0; i < styleList.length; i++) {
      if (styleList[i].style_id === Number(value)){
        setStyle(styleList[i]);
        return;
      }
    }
  }

  return (
    <div data-testid="overview-1" className='overview'>
        <ImageGallery
          key='1'
          style={ style }
          styleid={ styleId }
          theme= { theme }
        />

        <Cart
        key='2'
        stylesList={ styles }
        style={ style }
        handleStyleSelect={ handleStyleSelect }
        currentProduct={ currentProduct }
        />

        <Description
        key='3'
        currentProduct={ currentProduct }
        />

    </div>)

}


export default Overview;
