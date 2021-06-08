import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../config.js';
import ProductCard from './ProductCard.jsx';

function OutfitList() {
  const [outfitItems, setOutfit] = useState([]);

  function handleItem() {

  };

  return (
    <div>
      <h1>Testing-OutfitList</h1>
      <div className='AddCard'>
        <div>+</div>
        <div>Add to Outfit</div>

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