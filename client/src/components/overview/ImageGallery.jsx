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
    switch (e.target.id) {
      case 'left-button' :
        if (photoIndex > 0) {
          let next = photoIndex - 1;
          setPhotoIndex(next);
          setPhoto(photoList[next]);
        }
        break;
      case 'right-button' :
        if (photoIndex < photoList.length - 1) {
          let next = photoIndex + 1;
          setPhotoIndex(next);
          setPhoto(photoList[next]);
        }
        break;
    }
  }

  return (
    <div
    className='image-gallery'
    >

      <div className='image-gallery-overlay'>
        <div id='thumbs-reel'>
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
          {/* <i className="fas fa-expand enlarge-button" onClick={handleViewClick}></i> */}
          </div>
        {/* <a id='left-button' onClick={handleArrowClick}>&#10094;</a> */}
        {/* <a id='right-button' onClick={handleArrowClick}>&#10095;</a> */}
      </div>



        <div className='preview-container'>
          <img
            className='preview'
            onClick={handleViewClick}
            src={ currentPhoto.url }
            alt='One of the preview pictures of the selected style'/>
        </div>

    </div>
  )
}

export default ImageGallery;