import React, { useState, useCallback, useEffect, useReducer } from 'react';
import ProductCard from './ProductCard.jsx';

const OutfitList = ({ productId, productClick }) => {
  const [initialIndex, setIndex] = useState(0);
  const [outfitItems, setOutfit] = useState([]);
  const [ifAdded, setAdded] = useState(false);
  const [isRight, setRight] = useState(false);
  const [isLeft, setLeft] = useState(false);

  const local = window.localStorage;
  const listState = 'outfit';
  const len = outfitItems.length - 1;
  const stopper = -(len - 3);

  const addItem = (id) => {
    if (outfitItems.indexOf(id) === -1) {
      setOutfit(prevArray => [...prevArray, id]);
      setAdded(true);
    }
    setAdded(false);
  };

  const triggerDelete = useCallback((index) => {
    let currentOutfits = outfitItems.map((item) => item);
    currentOutfits.splice(index, 1);

    setOutfit(currentOutfits);
    setAdded(true);
  });

  const handleClick = (action) => {
    switch (action.type) {
      case 'next':
        setLeft(true);

        if (len < 3) {
          return setIndex(prevState => prevState = 0);
        } else if (initialIndex > stopper) {
            return setIndex(prevState => prevState - 1);
        }

      case 'previous':
        setRight(true);
        setIndex(prevState => prevState + 1);
    }
  }

  useEffect(() => {
    local.getItem('outfit')
    ? setOutfit(JSON.parse(local.getItem('outfit')))
    : local.setItem('outfit', outfitItems);
  }, []);

  useEffect(() => {
    (outfitItems.indexOf(productId) !== -1)
    ? setAdded(false)
    : setAdded(true);
  }, [productId]);

  useEffect(() => {
    local.setItem('outfit', JSON.stringify(outfitItems));

    (outfitItems.length > 4)
    ? setRight(true)
    : setRight(false)
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
    <div>
      <h4 className='RIC-Title'>Your Outfit</h4>
      {isLeft
          ? <button className='button1' onClick={() => handleClick({ type: 'previous' })}>‹</button>
          : <button disabled data-testid='buttonL' className='button2'>‹</button>
        }
      <div className='RICList'>
          {outfitItems.length !== 0
            ? <>
                <span className='AddCard' onClick={() => addItem(productId)}>
                  {ifAdded
                    ? <span id='plus-outfit'>＋ <br /> Add to Outfit</span>
                    : <span id='item-added'>Item Added</span>
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
            : <span className='AddCard' onClick={() => addItem(productId)}>
                {ifAdded
                  ? <span id='plus-outfit'>＋ <br /> Add to Outfit</span>
                  : <span id='item-added'>Item Added</span>
                }
              </span>
          }
      </div>
      {isRight
        ? <button className='button1' onClick={() => handleClick({ type: 'next' })}>›</button>
        : <button disabled data-testid='buttonR' className='button2'>›</button>
      }
    </div>
  );

};

export default OutfitList;