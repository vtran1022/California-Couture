import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery.jsx';
import Cart from './Cart.jsx';
import Atelier from '/Users/julianzthong/Desktop/Hack_Reactor/FEC/client/src/Atelier.js';

/*
Need to get ONE product from the database
With that one product id we need to get all the STYLES that the product has
Styles contains all the pictures related to the styles. Also contains all the sales pricing for the style.
Styles also contains all the inventory of the product styles
*/
function Overview (props) {

  // const [productList, setProductList] = useState(sampleData); don't think this is necessary.
  const [currentProduct, setCurrentProduct] = useState({});
  const [styles, setStyle] = useState([]);

  useEffect( () => {
    Atelier.getInfo(13023)
    .then(data => setCurrentProduct(data))
    Atelier.getStyles(13023)
    .then(data => setStyle(data.results))
  }, [])


  return (
    <div>
      Overview

      <ImageGallery
      productId={ currentProduct.id }
      />

      {/* Star rating will have be an another component */}
      <span className='category'>
        { currentProduct.category }
        </span>
      <span className='name'>
        { currentProduct.name }
        </span>

        {/* {if (currentProduct.description) {
          <p className='product-info'}>{currentProduct.description}</p>
        } */}

        <Cart
        key={ currentProduct.id }
        styleList={ styles }
        defaultPrice={ currentProduct.default_price }
        />

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