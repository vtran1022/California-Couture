import React, { useState, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
import { auth } from '../../../../config.js';
import ProductCard from './ProductCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';

const RelatedList = ({ productId }) => {
  const listState = 'related';
  const [initialIndex, setIndex] = useState(0);
  const [relatedItems, setRelated] = useState([]);
  const [isModal, setModal] = useState(false);
  const [relatedId, setId] = useState(0);

  const fetchRelated = async () => {
    let relatedData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/related`,
    { headers: { 'Authorization': auth.TOKEN } });

    setRelated(relatedData.data);
    // setIndex(relatedData.data.length);
  };

  useEffect(() => {
    fetchRelated().catch((err) => console.log(`Error fetching product info: ${err}`))
  }, [productId]);

  const triggerModal = useCallback((id) => {
    if (!isModal) {
      setId(id);
      setModal(true);
    } else if (isModal) {
      setModal(false);
    }
  });

  const handleClick = (action) => {
    let len = relatedItems.length

    switch (action.type) {
      case 'next':
        return setIndex(prevState => len < 5 ? 0 : prevState - 1);
      case 'previous':
        return setIndex(prevState => prevState === 0 ? 0 : prevState + 1);
    }
  }

  return (
    <div>
      <h3>Related Products</h3>
      <div className='RICList'>
        <button className='buttonL brl' onClick={() => handleClick({ type: 'previous' })}>‹</button>
        <button className='buttonR brl' onClick={() => handleClick({ type: 'next' })}>›</button>

        {relatedItems.map((id, i) => (
          <ProductCard
            key={id}
            productId={id}
            listState={listState}
            triggerModal={triggerModal}
            offset={initialIndex}/>
        ))}
      </div>

      {isModal
        ? <ComparisonModal
            productId={productId}
            relatedId={relatedId}
            trigger={triggerModal}/>
        : null}
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