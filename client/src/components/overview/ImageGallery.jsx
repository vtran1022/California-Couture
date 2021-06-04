import React, { useState } from 'react';
import Thumbnails from './Thumbnails.jsx';

function ImageGallery (props) {
  const [viewState, setView] = useState('default');
  // const [productId, setId] = useState(props.productId);

  return (
    <div
    // onClick={() => setView('expanded')}
    >{viewState}
    {/* takes an the array of thumbnails and displays it in ThumbnailView <ThumbnailView /> */}

    </div>
  )
}

export default ImageGallery;