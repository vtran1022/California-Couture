import React, { useState } from 'react';
import ImageGallery from './ImageGallery.jsx';
import sampleData from './sample_data.js';

const Overview = (props) => {
  // const [productList, setProductList] = useState(sampleData)
  // const [currentProduct, setCurrentProduct] = useState(productList[0]);
  return (<div>
    <ImageGallery
    // productId={currentProduct.id}
    />
    {/* Star rating will have be an API wrapper */}
    <span className='product-info'>
      {/* {currentProduct.category} */}
      </span>
    <span className='product-info'>
      {/* {currentProduct.name} */}
      </span>
  </div>)
}


export default Overview;