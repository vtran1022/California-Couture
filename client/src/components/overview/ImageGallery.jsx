import React, { useState, useEffect } from 'react';
import Thumbnails from './Thumbnails.jsx';
// import ViewModal from './ViewModal.jsx'
import Enlarge from '../../imgs/expand-32.png';


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
    className={
      showView
      ? 'image-gallery-enlarged'
      : 'image-gallery'}
    >


      {/* {showView
      ? <div id='lightbox' className='modal'>
          <ViewModal
          photos={photoList}
          photo={currentPhoto}
          handleLeft={handleLeftClick}
          handleRight={handleRightClick}
          close={handleViewClick}
          handleThumbnailClick={handleThumbnailClick}/>
        </div>
      : null} */}

      <img
      className='preview'
      src={currentPhoto.url}
      onClick={() => handleViewClick()}
      />
      <div className='default-thumbs-overlay'>
        {photoList.map(photo => //clean up later. Not DRY
          <Thumbnails
          key={photoList.indexOf(photo)}
          cname='default-thumb'
          thumbnailUrl={photo.thumbnail_url}
          photoUrl={photo.url}
          photoList={photoList}
          handleThumbnailClick={handleThumbnailClick}/>
          )}
        </div>
      {/* <img class='left-button' src={Left} onClick={() => handleLeftClick()}></img>
      <img class='right-button' src={Right} onClick={() => handleRightClick()}></img> */}
      <a className='left-button' onClick={() => handleLeftClick()}>&#10094;</a>
      <a className='right-button' onClick={() => handleRightClick()}>&#10095;</a>
      <img className='enlarge-button' src={Enlarge} onClick={()=>handleViewClick()}/>
    </div>
  )
}

export default ImageGallery;