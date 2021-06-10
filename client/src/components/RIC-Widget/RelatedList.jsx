import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../../config.js';
import ProductCard from './ProductCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';

const RelatedList = ({ productId }) => {
  const listState = 'related';
  const [relatedItems, setRelated] = useState([]);

  const fetchRelated = async () => {
    let relatedData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/related`,
    { headers: { 'Authorization': auth.TOKEN } });

    setRelated(relatedData.data);
  };

  useEffect(() => {
    fetchRelated().catch((err) => console.log(`Error fetching product info: ${err}`))
  }, [productId]);

  return (
    <div>
      <h3>Related Products</h3>
      <div className='RICList'>
        {relatedItems.map((id) => (
          <ProductCard
            key={id}
            productId={id}
            listState={listState}/>))}
      </div>
      <ComparisonModal
        productId={productId}/>
    </div>
  );

};

export default RelatedList;


/*
- get product Id from overview design product to then map over that list


List Behavior

- list is determined internally & related to current product view
- # of related products finite
- displayed in a carousel fashion
 - scrolling horizontally
 - first item on left hand side
 - arrows appear on left/right
  - click to scroll thru list
  - only one item per scroll click
  - left arrow is hidden if at first item at far lest
  - right arrow hidden if last item at far right
 - any prod not on screen should appear offscreen in carousel
*/