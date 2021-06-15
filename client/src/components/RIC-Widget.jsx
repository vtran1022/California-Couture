import React from 'react';
import RelatedList from './RIC-Widget/RelatedList.jsx';
import OutfitList from './RIC-Widget/OutfitList.jsx';

const RICWidget = ({ productId, productClick, toggleOverlay }) => {
  return (
    <div className='RICWid' id='RICWid'>
      <RelatedList
        productId={productId}
        productClick={productClick}
        toggleOverlay={toggleOverlay}/>
        <br />
        <br />
      <OutfitList
        productId={productId}
        productClick={productClick}/>
    </div>
  );
};

export default RICWidget;