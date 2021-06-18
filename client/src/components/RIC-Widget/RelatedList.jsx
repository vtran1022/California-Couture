import React, { useState, useEffect, useCallback, useReducer } from 'react';
import ProductCard from './ProductCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import Atelier from '../../Atelier.js';

const RelatedList = ({ productId, productClick, toggleOverlay, related, product }) => {
  const [initialIndex, setIndex] = useState(0);
  const [relatedItems, setRelated] = useState([]);
  const [isModal, setModal] = useState(false);
  const [relatedId, setId] = useState(0);
  const [isRight, setRight] = useState(false);
  const [isLeft, setLeft] = useState(false);

  const listState = 'related';
  const stopper = -(relatedItems.length - 5);

  const fetchRelated = () => {
    let uniqueProducts = [...new Set(related)];
    setRelated(uniqueProducts);
  };

  const triggerModal = useCallback((id) => {
    if (!isModal) {
      setId(id);
      setModal(true);
    } else if (isModal) {
      setModal(false);
    }
  });

  const handleClicks = (action) => {
    if (action.type === 'previous') {
      setRight(true);
      setIndex(prevState => prevState + 1);
    } else if (action.type === 'next') {
      setLeft(true);

      (relatedItems.length > 4 && initialIndex > stopper)
      ? setIndex(prevState => prevState - 1)
      : null;
    }
  }

  useEffect(() => {
    setIndex(0);
    setLeft(false);
  }, [productId]);

  useEffect(() => {
    fetchRelated();

    related.length > 5
    ? setRight(true)
    : setRight(false)
  }, [related]);

  useEffect(() => {
    initialIndex === stopper
    ? setRight(false)
    : null;

    initialIndex === 0
    ? setLeft(false)
    : setLeft(true);
  }, [initialIndex]);

  useEffect(() => {
    toggleOverlay();
  }, [isModal]);

  useEffect(() => {
    if (isModal) {
      window.addEventListener('click', triggerModal);
      return () => {
        window.removeEventListener('click', triggerModal);
      }
    }
  }, [isModal]);

  return (
    <div className='RelatedList-container'>
      <span className='RIC-Title'><b>Related Products</b></span>
      <div className='RelatedList'>
        {isLeft
            ? <button className='button1' onClick={() => handleClicks({ type: 'previous' })}>‹</button>
            : <button data-testid='buttonL' className='button2' disabled>‹</button>
          }
        <div data-testid='RICList' className='RICList' style={{ '--offset': initialIndex }}>
          {relatedItems.map((id, i) => (
            <ProductCard
              key={id}
              productId={id}
              listState={listState}
              triggerModal={triggerModal}
              offset={initialIndex}
              productClick={productClick}
              toggleOverlay={toggleOverlay}/>
          ))}
        </div>

        {isModal
          ? <ComparisonModal
              relatedId={relatedId}
              trigger={triggerModal}
              product={product}/>
          : null
        }

          {isRight
            ? <button data-testid='buttonR2' className='button1' onClick={() => handleClicks({ type: 'next' })}>›</button>
            : <button data-testid='buttonR' className='button2' disabled>›</button>
          }
      </div>
    </div>
  );
};

export default RelatedList;