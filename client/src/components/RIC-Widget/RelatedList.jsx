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
  // const [imageCarousel, setCarousel] = useState([]);
  const [isRight, setRight] = useState(false);
  const [isLeft, setLeft] = useState(false);

  const fetchRelated = async () => {
    let relatedData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/related`,
    { headers: { 'Authorization': auth.TOKEN } });

    setRelated(relatedData.data);
    // setCarousel(relatedData.data.slice(0, 5));
  };

  useEffect(() => {
    fetchRelated().catch((err) => console.log(`Error fetching product info: ${err}`));
    setIndex(0);
    setLeft(false);
  }, [productId]);

  useEffect(() => {
    if (relatedItems.length > 5) {
      setRight(true);
    } else {
      setRight(false);
    }
  }, [relatedItems]);

  const triggerModal = useCallback((id) => {
    if (!isModal) {
      setId(id);
      setModal(true);
    } else if (isModal) {
      setModal(false);
    }
  });

  const handleClick = (action) => {
    let len = relatedItems.length - 1;
    let stopper = -(len - 4);

    switch (action.type) {
      case 'next':
        setLeft(true);

        if (len < 4) {
          return setIndex(prevState => prevState = 0);
        } else if (initialIndex > stopper) {
            return setIndex(prevState => prevState - 1);
        } else if (initialIndex === stopper) {
          return setRight(false);
        }

      case 'previous':
        setRight(true);

        if (initialIndex === 0) {
          setLeft(false);
          setIndex(prevState => prevState = 0);
        } else {
          setIndex(prevState => prevState + 1);
        }
    }

    // switch (action.type) {
    //   case 'next':
    //     let lastE = imageCarousel[imageCarousel.length - 1];
    //     let nextI = relatedItems.indexOf(lastE);
    //     let updatedNext = relatedItems.slice(nextI + 1, nextI + 6);

    //     if (updatedNext.length !== 5) {
    //       updatedNext = relatedItems.slice(-5);
    //     }

    //     return setCarousel(prevState => prevState = updatedNext);

    //   case 'previous':
    //     let firstE = imageCarousel[0];
    //     let prevI = relatedItems.indexOf(firstE);
    //     let updatedPrev;

    //     if (prevI > 4) {
    //       let i = prevI - 5;
    //       updatedPrev = relatedItems.slice(i, prevI);
    //     } else {
    //       updatedPrev = relatedItems.slice(0, 5);
    //     }

    //     return setCarousel(prevState => prevState = updatedPrev);
    // }
  }

  return (
    <div>
      <h3>Related Products</h3>
      {isLeft
          ? <button className='button1' onClick={() => handleClick({ type: 'previous' })}>‹</button>
          : <button className='button2'>‹</button>
        }
      <div className='RICList' style={{ '--offset': initialIndex }}>
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

        {isRight
          ? <button className='button1' onClick={() => handleClick({ type: 'next' })}>›</button>
          : <button className='button2'>›</button>
        }
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