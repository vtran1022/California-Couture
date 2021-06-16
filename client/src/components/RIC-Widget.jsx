import React from 'react';
import RelatedList from './RIC-Widget/RelatedList.jsx';
import OutfitList from './RIC-Widget/OutfitList.jsx';

const RICWidget = ({ productId, productClick, toggleOverlay, related, product }) => {
  return (
    <div className='RICWid'>
      <RelatedList
        productId={productId}
        productClick={productClick}
        toggleOverlay={toggleOverlay}
        related={related}
        product={product}/>
        <br />
        <br />
      <OutfitList
        productId={productId}
        productClick={productClick}/>
    </div>
  );
};

export default RICWidget;