import React, { useState } from 'react';
import Thumbnails from './Thumbnails.jsx';
import Atelier from '/Users/julianzthong/Desktop/Hack_Reactor/FEC/client/src/Atelier.js';


function ImageGallery (props) {
  const [viewState, setView] = useState('default');
  const [thumbnailList, setThumbnail] = useState(props)
  // const [productId, setId] = useState(props.productId);

  return (
    <div
    onClick={() => setView( 'expanded' )}
    >
      Image Gallery
      <Thumbnails />

    </div>
  )
}

export default ImageGallery;