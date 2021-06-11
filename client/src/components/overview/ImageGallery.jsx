import React, { useState, useEffect } from 'react';
import Thumbnails from './Thumbnails.jsx';
import ViewModal from './ViewModal.jsx'


function ImageGallery (props) {
  const [showView, setView] = useState(false);
  const [currentPhoto, setPhoto] = useState(props.photos[0]);
  const [photoList, setPhotoList] = useState(props.photos);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    setPhoto(props.photos[0]);
    setPhotoList(props.photos);
    setPhotoIndex(0);
  }, [props.photos]);

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
    className='image-gallery'
    >
      {showView
      ? <div id='modal-view' class='modal'>
          <ViewModal
          picture={currentPhoto.url}
          handleLeft={handleLeftClick}
          handleRight={handleRightClick}
          close={handleViewClick}/>
          <div id='thumbnails-view'>
          {photoList.map(photo => //clean up later. Not DRY
            <Thumbnails
            key={photoList.indexOf(photo)}
            cname='modal-thumbnails'
            thumbnailUrl={photo.thumbnail_url}
            photoUrl={photo.url}
            photoList={photoList}
            handleThumbnailClick={handleThumbnailClick}/>
            )}
          </div>
        </div>
      : null}
      <img
      className='preview'
      src={currentPhoto.url}
      onClick={() => handleViewClick()}
      />
      <div className='thumbnails'>
        {photoList.map(photo => //clean up later. Not DRY
          <Thumbnails
          key={photoList.indexOf(photo)}
          cname='default'
          thumbnailUrl={photo.thumbnail_url}
          photoUrl={photo.url}
          photoList={photoList}
          handleThumbnailClick={handleThumbnailClick}/>
          )}
        </div>
      <button onClick={() => handleLeftClick()}>Left Arrow</button>
      <button onClick={() => handleRightClick()}>Right Arrow</button>

    </div>
  )
}

export default ImageGallery;