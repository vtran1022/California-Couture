import React from 'react';
import RelatedList from './RIC-Widget/RelatedList.jsx';
import OutfitList from './RIC-Widget/OutfitList.jsx';

// expecting this productId to be linked to current Overview Product
const RICWidget = ({ productId }) => {
  return (
    <div id='RICWid'>
      <RelatedList
        productId={productId}/>
      <OutfitList
        productId={productId}/>
    </div>
  );
};

export default RICWidget;