import React, { useState, useCallback, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

const OutfitList = ({ productId, productClick }) => {
  const [initialIndex, setIndex] = useState(0);
  const [outfitItems, setOutfit] = useState([]);
  const [ifExists, setExists] = useState(false);
  const [isRight, setRight] = useState(false);
  const [isLeft, setLeft] = useState(false);

  const local = window.localStorage;
  const listState = 'outfit';
  const stopper = -(outfitItems.length  - 4);

  const addItem = (id) => {
    if (outfitItems.indexOf(id) === -1) {
      setOutfit(prevArray => [...prevArray, id]);
      setExists(true);
    }
  };

  const triggerDelete = useCallback((index) => {
    const currentOutfits = outfitItems.map((item) => item);
    const deleted = currentOutfits.splice(index, 1)[0];

    setOutfit(currentOutfits);

    productId === deleted
    ? setExists(false)
    : null;
  });

  const handleClick = (action) => {
    if (action.type === 'previous') {
      setRight(true);
      setIndex(prevState => prevState + 1);
    } else if (action.type === 'next') {
      setLeft(true);

      (outfitItems.length > 3 && initialIndex > stopper)
      ? setIndex(prevState => prevState - 1)
      : null;
    }
  }

  useEffect(() => {
    setIndex(0);

    (outfitItems.indexOf(productId) !== -1)
    ? setExists(true)
    : setExists(false);

    (outfitItems.length > 4)
    ? setRight(true)
    : setRight(false);
  }, [productId]);

  useEffect(() => {
    if (local.getItem('outfit')) {
      const value = JSON.parse(local.getItem('outfit'));
      setOutfit(value);

      (value.length !== 0 && value.indexOf(productId) !== -1)
      ? setExists(true)
      : null;
    } else {
      local.setItem('outfit', outfitItems);
    }
  }, []);

  useEffect(() => {
    local.setItem('outfit', JSON.stringify(outfitItems));

    (outfitItems.length > 4)
    ? setRight(true)
    : setRight(false);
  }, [outfitItems]);

  useEffect(() => {
    initialIndex === stopper
    ? setRight(false)
    : null;

    initialIndex === 0
    ? setLeft(false)
    : setLeft(true);
  }, [initialIndex]);


  return (
    <div className='OutfitList'>
      <p className='RIC-Title'><b>Your Outfit</b></p>
      {isLeft
          ? <button className='button1' onClick={() => handleClick({ type: 'previous' })}>‹</button>
          : <button data-testid='buttonL' className='button2' disabled>‹</button>
        }
      <div className='RICList'>
          {outfitItems.length !== 0
            ? <>
                <span className='AddCard' onClick={() => addItem(productId)}>
                  {ifExists
                    ? <span id='item-added'>Item Added</span>
                    : <span id='plus-outfit'>＋ <br /> Add to Outfit</span>
                  }
                </span>
              {outfitItems.map((id, i) => (
                <ProductCard
                  key={id}
                  productId={id}
                  index={i}
                  listState={listState}
                  triggerDelete={triggerDelete}
                  offset={initialIndex}
                  productClick={productClick}/>))}
              </>
            : <span data-testid='outfit' className='AddCard' onClick={() => addItem(productId)}>
                {ifExists
                  ? <span id='item-added'>Item Added</span>
                  : <span id='plus-outfit'>＋ <br /> Add to Outfit</span>
                }
              </span>
          }
      </div>
      {isRight
        ? <button className='button1' onClick={() => handleClick({ type: 'next' })}>›</button>
        : <button data-testid='buttonR' className='button2' disabled>›</button>
      }
    </div>
  );

};

export default OutfitList;