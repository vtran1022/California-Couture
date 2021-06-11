import React, { useState, useEffect } from 'react';
import Thumbnails from './Thumbnails.jsx'
import Left from '../../imgs/Navigate-left_36746.png';
import Right from '../../imgs/Navigate-right_36745.png';
const ViewModal = ({ photos, photo, handleLeft, handleRight, close, handleThumbnailClick }) => {
  const [viewPicture, setPicture] = useState()

  return (
    <React.Fragment >
    <span className="close-cursor" onClick={() => close()}>&times;</span>
    <img src={Left} onClick={() => handleLeft()} />
    <img
    id='lightbox-pic'
    src={photo.url}
    />
    <img src={Right} onClick={() => handleRight()} />
    <div id='modal-thumbnails'>
      {photos.map(photo => //clean up later. Not DRY
        <Thumbnails
        key={photos.indexOf(photo)}
        cname='modal-thumbnail'
        thumbnailUrl={photo.thumbnail_url}
        photoUrl={photo.url}
        photoList={photos}
        handleThumbnailClick={handleThumbnailClick}/>
        )}
    </div>
    </React.Fragment>
  )
}

export default ViewModal;