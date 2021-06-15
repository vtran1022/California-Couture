import React, { useState, useEffect, useCallback, useReducer } from 'react';
import ProductCard from './ProductCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import Atelier from '../../Atelier.js';

const RelatedList = ({ productId, productClick }) => {
  const listState = 'related';
  const [initialIndex, setIndex] = useState(0);
  const [relatedItems, setRelated] = useState([]);
  const [isModal, setModal] = useState(false);
  const [relatedId, setId] = useState(0);
  const [isRight, setRight] = useState(false);
  const [isLeft, setLeft] = useState(false);

  const fetchRelated = async () => {
    let product = await Atelier.getRelated(productId);
    setRelated(product);
  };

  useEffect(() => {
    fetchRelated().catch((err) => console.log(`Error fetching related info: ${err}`));
    setIndex(0);
    setLeft(false);
  }, [productId]);

  useEffect(() => {
    relatedItems.length > 5
    ? setRight(true)
    : setRight(false)
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
  }

  return (
    <div>
      <h4 className='RIC-Title'>Related Products</h4>
      {isLeft
          ? <button className='button1' onClick={() => handleClick({ type: 'previous' })}>‹</button>
          : <button disabled data-testid='buttonL' className='button2'>‹</button>
        }
      <div className='RICList' style={{ '--offset': initialIndex }}>
        {relatedItems.map((id, i) => (
          <ProductCard
            key={id}
            productId={id}
            listState={listState}
            triggerModal={triggerModal}
            offset={initialIndex}
            productClick={productClick}/>
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
          : <button disabled data-testid='buttonR' className='button2'>›</button>
        }
    </div>
  );
};

export default RelatedList;