import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../../config.js';
import ProductCard from './ProductCard.jsx';

// take in destructing { productId } from overview design product
function RelatedList() {
  const productId = 13027; //placeholder for testing
  const [relatedItems, setRelated] = useState([]);

  async function fetchRelated() {
    let relatedData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/related`,
    { headers: { 'Authorization': auth.TOKEN } });

    setRelated(relatedData.data);
  };

  useEffect(() => {
    fetchRelated().catch((err) => console.log(`Error fetching product info: ${err}`))
  }, [productId]);

  return (
    <div>
      <h1>Testing-RelatedList</h1>
      <div>
        {relatedItems.map((id, index) => (
          <ProductCard
            productId={id} key={index}/>))}
      </div>
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