import React, { useState, useEffect } from 'react';
import Thumbnails from './Thumbnails.jsx';



function ImageGallery (props) {
  // const [viewState, setView] = useState('default');
  const [currentPhoto, setPhoto] = useState(props.photos[0]);
  const [photoList, setPhotoList] = useState(props.photos);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    setPhoto(props.photos[0]);
    setPhotoList(props.photos);
  }, [props.photos])

  function handleThumbnailClick (url, thumbnail_url) {
    setPhoto({
      url: url,
      thumbnail_url: thumbnail_url
      });
  }

  async function handleLeftClick () {
    if (photoIndex > 0) {
      let next = photoIndex - 1;
      await setPhotoIndex(next);
      await setPhoto(photoList[next]);
    }
  }

  async function handleRightClick () {
    if (photoIndex < photoList.length - 1) {
      let next = photoIndex + 1;
      await setPhotoIndex(next);
      await setPhoto(photoList[next]);
    }
  }

  return (
    <div
    className='image-gallery'
    // onClick={() => setView( 'expanded' )}
    >
      <button onClick={() => handleLeftClick()}>Left Arrow</button>
      <img className='preview' src={currentPhoto.url}></img>
      <div className='thumbnails'>
        {
          photoList.map(photo =>
          <Thumbnails
          key={photoList.indexOf(photo)}
          thumbnailUrl={photo.thumbnail_url}
          photoUrl={photo.url}
          handleThumbnailClick={handleThumbnailClick}/>
          )}
        </div>
        <button onClick={() => handleRightClick()}>Right Arrow</button>
    </div>
  )
}

export default ImageGallery;