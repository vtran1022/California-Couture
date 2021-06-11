import React, { useState, useCallback, useEffect, useReducer } from 'react';
import ProductCard from './ProductCard.jsx';

const OutfitList = ({ productId }) => {
  const listState = 'outfit';
  const [initialIndex, setIndex] = useState(0);
  const [ifOutfit, setExists] = useState(false);
  const [outfitItems, setOutfit] = useState([]);
  const [ifAdded, setAdded] = useState(true);

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

    switch (action.type) {
      case 'next':
        return setIndex(prevState => len < 4 ? 0 : prevState - 1);
      case 'previous':
        return setIndex(prevState => prevState === 0 ? 0 : prevState + 1);
    }
  }

  return (
    <div>
      <h3>Your Outfit</h3>
      <div className='RICList'>
      <button className='buttonL brl' onClick={() => handleClick({ type: 'previous' })}>‹</button>
      <button className='buttonR brl' onClick={() => handleClick({ type: 'next' })}>›</button>

          {ifOutfit
            ? <div>
                <div className='AddCard' onClick={() => addItem(productId)}>
                  {ifAdded
                    ? <div>
                        <div>⊕</div>
                        <div>Add to Outfit</div>
                      </div>
                    : <div>Item Already Added</div>
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
                  ? <div>
                      <div>⊕</div>
                      <div>Add to Outfit</div>
                    </div>
                  : <div>Item Already Added</div>
                }
              </div>
          }
      </div>
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