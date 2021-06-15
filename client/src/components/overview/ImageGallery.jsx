import React, { useState, useEffect } from 'react';
import Thumbnails from './Thumbnails.jsx';
import ZoomedPreview from './ZoomedPreview.jsx';

function ImageGallery ({ photos, styleid, theme }) {
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

  function handleThumbnailClick (index) {
    setPhoto(photoList[index]);
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
      {showView
        ? <ZoomedPreview
        view={showView}
        preview={ currentPhoto.url }
        />
        : <div className='preview-container'>
          <img
            className='preview'
            onClick={handleViewClick}
            src={ currentPhoto.url}
            alt='One of the preview pictures of the selected style'/>
        </div>
      }

      <div className=
      {showView
        ? 'enlarged-thumbs-overlay'
        : 'default-thumbs-overlay'}
      >
        {photoList.map((photo, index) =>
          <Thumbnails
          key={index}
          cname={
            (photo === currentPhoto)
            ? 'thumb-selected'
            : 'thumb-not-selected'
          }
          photo={ photo }
          photoList={ photoList }
          handleThumbnailClick={handleThumbnailClick}/>
          )}
        </div>

      <a className='left-button' onClick={handleLeftClick}>&#10094;</a>
      <a className='right-button' onClick={handleRightClick}>&#10095;</a>
      <i className="fas fa-expand enlarge-button" onClick={handleViewClick}></i>
    </div>
  )
}

export default ImageGallery;