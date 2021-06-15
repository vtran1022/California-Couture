import React, { useState, useEffect } from 'react';
import ImageGallery from './overview/ImageGallery.jsx';
import Cart from './overview/Cart.jsx';
import Description from './overview/Description.jsx';
import Atelier from '../Atelier.js';
import { auth } from '../../../config.js';

function Overview ({ theme, productId }) {
  // const [cartItems, serCurrentCart] = await useState({}) need to pull a user's cart
  const [currentProduct, setCurrentProduct] = useState({});
  const [styleId, setStyleId] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [styles, setStyleList] = useState([]);
  const [style, setStyle] = useState({});
  const [currentPhoto, setPhoto] = useState('');

  useEffect(() => {
    async function fetchData () {
      try {
        var product = await Atelier.getInfo(productId).catch((err) => console.log(err));
        var styleList = await Atelier.getStyles(productId).catch((err) => console.log(err));
        setStyleList(styleList.results);
        setStyle(styleList.results[0]);
        setCurrentProduct(product);
        setStyleId(styleList.results[0].style_id)
        setLoading(false);
      } catch (err) {
        console.log(err)
      }}
    fetchData();
    }, [productId]);

  function handleStyleSelect (value) {
    let list = styles;
    for (var i = 0; i < list.length; i++) {
      if (list[i].style_id === Number(value)){
        setStyle(list[i]);
        return;
      }
    }
  }

  return (
    <div data-testid="overview-1" className='overview'>
      {isLoading
        ? null
        : <ImageGallery
          key='999999'
          photos={ style.photos }
          styleid={ styleId }
          theme= { theme }
        />
      }
      {isLoading
        ? null
        : <Cart
        key='899999'
        stylesList={ styles }
        style={ style }
        handleStyleSelect={ handleStyleSelect }
        currentProduct={ currentProduct }
        />
      }

      {isLoading
        ? null
        : <Description
        key='799999'
        currentProduct={ currentProduct }
        />
      }

      {/* <button>
        Facebook
      </button>
      <button>
        Twitter
      </button>
      <button>
        Pinterest
      </button> */}


    </div>)

}


export default Overview;
