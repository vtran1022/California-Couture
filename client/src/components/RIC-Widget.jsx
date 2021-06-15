import React from 'react';
import RelatedList from './RIC-Widget/RelatedList.jsx';
import OutfitList from './RIC-Widget/OutfitList.jsx';

const RICWidget = ({ productId, productClick }) => {
  return (
    <div className='RICWid' id='RICWid'>
      <RelatedList
        productId={productId}
        productClick={productClick}/>
        <br />
        <br />
      <OutfitList
        productId={productId}/>
    </div>
  );
};

export default RICWidget;