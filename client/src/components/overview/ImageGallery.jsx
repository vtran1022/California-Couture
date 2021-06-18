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

  const handleArrowClick = (e) => {
    switch (e.target.className) {
      case 'left-button' :
        if (photoIndex > 0) {
          let next = photoIndex - 1;
          setPhotoIndex(next);
          setPhoto(photoList[next]);
        }
      case 'right-button' :
        if (photoIndex < photoList.length - 1) {
          let next = photoIndex + 1;
          setPhotoIndex(next);
          setPhoto(photoList[next]);
        }
    }
  }

  return (
    <div
    className={ showView
      ? 'image-gallery-enlarged'
      : 'image-gallery'}
    >

      <div className={showView
        ? 'enlarged-thumbs-overlay'
        : 'default-thumbs-overlay'}>
          {photoList.map((photo, index) =>
            <Thumbnails
            key={index}
            cname={
              (photo === currentPhoto)
              ? 'thumb-selected'
              : 'thumb-not-selected'}
            photo={ photo }
            photoList={ photoList }
            handleThumbnailClick={handleThumbnailClick}/>
          )}
      </div>


          <>
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
      </>



      <a className='left-button' onClick={handleArrowClick}>&#10094;</a>
      <a className='right-button' onClick={handleArrowClick}>&#10095;</a>
      <i className="fas fa-expand enlarge-button" onClick={handleViewClick}></i>
    </div>
  )
}

export default ImageGallery;