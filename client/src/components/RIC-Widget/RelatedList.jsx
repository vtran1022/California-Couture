import React, { useState, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
import { auth } from '../../../../config.js';
import ProductCard from './ProductCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import { initialState, reducer } from './Reducer.jsx';

const RelatedList = ({ productId }) => {
  const listState = 'related';
  const initialState = { slideIndex: 0 };
  const [relatedItems, setRelated] = useState([]);
  const [isModal, setModal] = useState(false);
  const [relatedId, setId] = useState(0);

  const reducer = (state, action) => {
    let len = relatedItems.length - 1;

    switch (action.type) {
      case "PRODUCTS_FETCHED":
        return {
          ...state,
          slideIndex: action.data - 1
        };
      case 'previous':
        return {
          ...state,
          slideIndex: state.slideIndex === len ? len : state.slideIndex + 1
        };
      case 'next':
        return {
          ...state,
          slideIndex: state.slideIndex === 0 ? 0 : state.slideIndex - 1
        };
      default:
        throw new Error();
    }
  };

  //state needs to go here b/c reducer has to initialize first
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchRelated = async () => {
    let relatedData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/related`,
    { headers: { 'Authorization': auth.TOKEN } });

    setRelated(relatedData.data);
    dispatch({ type: "PRODUCTS_FETCHED", data: relatedData.data.length});
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

  return (
    <div>
      <h3>Related Products</h3>
      <div>Index: {state.slideIndex}</div>
      <div className='RICList'>
        <button onClick={() => dispatch({ type: 'previous' })}>‹</button>

        {relatedItems.map((id, i) => (
          <ProductCard
            key={id}
            productId={id}
            listState={listState}
            triggerModal={triggerModal}
            offset={(state.slideIndex - i)}/>
        ))}

        <button onClick={() => dispatch({ type: 'next' })}>›</button>
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