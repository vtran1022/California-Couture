import React from 'react';
import RelatedList from './RIC-Widget/RelatedList.jsx';
import OutfitList from './RIC-Widget/OutfitList.jsx';
import ComparisonModal from './RIC-Widget/ComparisonModal.jsx';

// expecting this productId to be linked to current Overview Product
const RICWidget = ({ productId }) => {
  return (
    <div id='RICWid'>
      <ComparisonModal
        productId={productId}/>
      <RelatedList
        productId={productId}/>
      <OutfitList
        productId={productId}/>
    </div>
  );
};

export default RICWidget;