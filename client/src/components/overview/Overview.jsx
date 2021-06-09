import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery.jsx';
import Cart from './Cart.jsx';
import Atelier from '../../Atelier.js';
import { auth } from '../../../../config.js';

/*
Need to get ONE product from the database
With that one product id we need to get all the STYLES that the product has
Styles contains all the pictures related to the styles. Also contains all the sales pricing for the style.
Styles also contains all the inventory of the product styles
*/
function Overview (props) {

  // const [productList, setProductList] = useState(sampleData); don't think this is necessary.
  const [isLoading, setLoading] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({});
  const [styles, setStyleList] = useState([]);
  const [style, setStyle] = useState({});

  useEffect( () => {
    async function fetchData () {
      setLoading(true);
      var product = await Atelier.getInfo(13023)
      var styleList = await Atelier.getStyles(13023)
      setStyleList(styleList.results);
      setStyle(styleList.results[0]);
      setCurrentProduct(product);
      setLoading(false);
      }
    fetchData()
    }, []);


  return (
    <div>
      Overview

      <ImageGallery
      className='image-gallery'
      productId={ currentProduct.id }
      product={ currentProduct }
      />

      {/* Star rating will have be an another component */}
      <span className='category'>
        { currentProduct.category }
        </span>
        <br></br>
      <span className='name'>
        { currentProduct.name }
        </span>

        {/* {if (currentProduct.description) {
          <p className='product-info'}>{currentProduct.description}</p>
        } */}
        {isLoading
        ? <div>Loading</div>
        : <Cart
        className='cart'
        key={ currentProduct.id }
        styleList={ styles }
        style={ style }
        defaultPrice={ currentProduct.default_price }
        />
      }
      <button>
        Facebook
      </button>
      <button>
        Twitter
      </button>
      <button>
        Pinterest
      </button>
    </div>)
}


export default Overview;
