import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';

function OutfitList({ productId }) {
  const [ifOutfit, setExists] = useState(false);
  const [outfitItems, setOutfit] = useState([]);

  function addItem(id) {
    if (outfitItems.indexOf(id) === -1) {
      setOutfit(prevArray => [...prevArray, id]);
      setExists(true);
    }
  };

  return (
    <div>
      <div className='AddCard' onClick={() => addItem(productId)}>
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