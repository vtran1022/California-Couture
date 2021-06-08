import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../config.js';
import ProductCard from './ProductCard.jsx';

// expecting this productId to be linked to current Overview Product
function OutfitList({ productId }) {
  const [ifOutfit, setExists] = useState(false);
  const [outfitItems, setOutfit] = useState([]);

  function addItem() {
    if (productId !== 0 && outfitItems.indexOf(productId) === -1) {
      setOutfit(prevArray => [...prevArray, productId]);
      setExists(true);
    }
  };

  useEffect(() => {
    addItem();
  }, [productId]);

  return (
    <div>
      <h1>Testing-OutfitList</h1>
      <div className='AddCard'>
        <div>+</div>
        <div>Add to Outfit</div>
      </div>
      <div>
        {ifOutfit
          ? <div> {outfitItems.map((id, index) => (
            <ProductCard
              productId={id} key={index}/>))} </div>
          : null
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