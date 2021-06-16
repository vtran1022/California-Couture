import React from 'react';
import RelatedList from './RIC-Widget/RelatedList.jsx';
import OutfitList from './RIC-Widget/OutfitList.jsx';

const RICWidget = ({ productId, productClick, toggleOverlay, related }) => {
  return (
    <div className='RICWid'>
      <RelatedList
        productId={productId}
        productClick={productClick}
        toggleOverlay={toggleOverlay}
        related={related}/>
        <br />
        <br />
      <OutfitList
        productId={productId}
        productClick={productClick}/>
    </div>
  );
};

export default RICWidget;