import React, { useState, useEffect } from 'react';
import Thumbnails from './Thumbnails.jsx';

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

  function handleZoomLens (imgId, resultId) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    img.parentElement.insertBefore(lens, img);
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
  }

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
      <div className='preview-container'>
      <img
      className='preview'
      id='preview'
      src={currentPhoto.url}
      onClick={handleViewClick}
      />
      <div className='zoomed-preview'></div>
      </div>
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