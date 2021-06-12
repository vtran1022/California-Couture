import React, { useState, useCallback, useEffect, useReducer } from 'react';
import ProductCard from './ProductCard.jsx';

const OutfitList = ({ productId }) => {
  const listState = 'outfit';
  const [initialIndex, setIndex] = useState(0);
  const [ifOutfit, setExists] = useState(false);
  const [outfitItems, setOutfit] = useState([]);
  const [ifAdded, setAdded] = useState(true);
  const [isRight, setRight] = useState(false);
  const [isLeft, setLeft] = useState(false);

  const addItem = (id) => {
    if (outfitItems.indexOf(id) === -1) {
      setOutfit(prevArray => [...prevArray, id]);
      setExists(true);
    }
    setAdded(false);
  };

  useEffect(() => {
    if (outfitItems.indexOf(productId) !== -1) {
      setAdded(false);
    } else {
      setAdded(true);
    }
  }, [productId]);

  useEffect(() => {
    if (outfitItems.length > 5) {
      setRight(true);
    } else {
      setRight(false);
    }
  }, [outfitItems]);

  const triggerDelete = useCallback((index) => {
    let currentOutfits = outfitItems.map((item) => item);
    currentOutfits.splice(index, 1);

    setOutfit(currentOutfits);
    setAdded(true);

    if (currentOutfits.length === 0) {
      setExists(false);
    };
  });

  const handleClick = (action) => {
    let len = outfitItems.length - 1;
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
      <h3>Your Outfit</h3>
      {isLeft
          ? <button className='button1' onClick={() => handleClick({ type: 'previous' })}>‹</button>
          : <button className='button2'>‹</button>
        }
      <div className='RICList'>
          {ifOutfit
            ? <div>
                <div className='AddCard' onClick={() => addItem(productId)}>
                  {ifAdded
                    ? <span>
                        <span id='plus'>⊕</span>
                        <span id='outfit'>Add to Outfit</span>
                      </span>
                    : <span id='item-added'>Item Added</span>
                  }
                </div>
              {outfitItems.map((id, i) => (
                <ProductCard
                key={id}
                productId={id}
                index={i}
                listState={listState}
                triggerDelete={triggerDelete}
                offset={initialIndex}/>))}
              </div>
            : <div className='AddCard' onClick={() => addItem(productId)}>
                {ifAdded
                  ? <span>
                      <span id='plus'>⊕</span>
                      <span id='outfit'>Add to Outfit</span>
                    </span>
                  : <span id='item-added'>Item Added</span>
                }
              </div>
          }
      </div>
      {isRight
        ? <button className='button1' onClick={() => handleClick({ type: 'next' })}>›</button>
        : <button className='button2'>›</button>
      }
    </div>
  );

};

export default OutfitList;

/*
When clicking 'Add to Outfit', pull the productId of Overview and add productcard
- on click, add the productid to an outfit array
- render the product card of that product id




- custom product list created by user w/ products that they've grouped together for 'outfit'
- similar format to related product cards
- will not be determined internally but unique to user
 - items only added when explicitly added by user
- default, no items
- first card should not contain a product, should have '+' icon and read 'add to outfit'
 - this remains visible even as items are added
- only unique to specific user, same across the board, regardless where they click to
- product can only be added once
- no max # of items to this list
- PERSIST
 - across page navigation
 - even after user has exited site and return later
*/