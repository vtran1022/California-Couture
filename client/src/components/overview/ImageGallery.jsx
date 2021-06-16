import React, { useState, useEffect } from 'react';
import Thumbnails from './Thumbnails.jsx';
import ZoomedPreview from './ZoomedPreview.jsx';

const ImageGallery = ({ style, styleid, theme }) => {
  const [showView, setView] = useState(false);
  const [photoList, setPhotoList] = useState(style.photos);
  const [currentPhoto, setPhoto] = useState(style.photos[0]);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    setPhotoList(style.photos);
    setPhotoIndex(0);
    setPhoto(style.photos[0]);
  }, [style]);

  const handleViewClick = () => {
    setView(!showView);
  }

  const handleThumbnailClick = (index) => {
    setPhoto(photoList[index]);
    setPhotoIndex(index);
  }

  // function handleArrowClick (e) {
  //   switch
  // }

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
    className={ showView
      ? 'image-gallery-enlarged'
      : 'image-gallery'}
    >
      {showView
        ? <ZoomedPreview
        preview={ currentPhoto.url }
        />
        : <div className='preview-container'>
          <img
            className='preview'
            onClick={handleViewClick}
            src={ currentPhoto.url }
            alt='One of the preview pictures of the selected style'/>
        </div>
      }

      <div className={showView
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