import React, { useState, useEffect } from 'react';
import Thumbnails from './Thumbnails.jsx';
import Enlarge from '../../imgs/expand-32.png';


function ImageGallery ({ photos, styleid }) {
  const [showView, setView] = useState(false);
  const [currentPhoto, setPhoto] = useState(photos[0]);
  const [photoList, setPhotoList] = useState(photos);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    setPhoto(photos[0]);
    setPhotoList(photos);
    setPhotoIndex(0);
  }, [photos]);

  function handleViewClick () {
    setView(!showView);
  }

  function handleThumbnailClick (url, thumbnail_url, index) {
    setPhoto({
      url: url,
      thumbnail_url: thumbnail_url
      });
    setPhotoIndex(index);
  }

   function handleLeftClick () {
    if (photoIndex > 0) {
      let next = photoIndex - 1;
      setPhotoIndex(next);
      setPhoto(photoList[next]);
    }
  }

   function handleRightClick () {
    if (photoIndex < photoList.length - 1) {
      let next = photoIndex + 1;
      setPhotoIndex(next);
      setPhoto(photoList[next]);
    }
  }

  return (
    <div
    className={
      showView
      ? 'image-gallery-enlarged'
      : 'image-gallery'}
    >
      <img
      className='preview'
      src={currentPhoto.url}
      />
      <div className=
      {showView
        ? 'enlarged-thumbs-overlay'
        : 'default-thumbs-overlay'}
      >
        {photoList.map((photo, index) =>
          <Thumbnails
          key={index}
          thumbnailUrl={photo.thumbnail_url}
          photoUrl={photo.url}
          photoList={photoList}
          handleThumbnailClick={handleThumbnailClick}/>
          )}
        </div>

      <a className='left-button' onClick={() => handleLeftClick()}>&#10094;</a>
      <a className='right-button' onClick={() => handleRightClick()}>&#10095;</a>
      <img className='enlarge-button' src={Enlarge} onClick={()=>handleViewClick()}/>
    </div>
  )
}

export default ImageGallery;