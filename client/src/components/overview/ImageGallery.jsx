import React, { useState } from 'react';
import Thumbnails from './Thumbnails.jsx';



function ImageGallery (props) {
  // const [viewState, setView] = useState('default');
  const [currentPhoto, setPhoto] = useState(props.photos[0])

  function handleThumbnailClick (url, thumbnail_url) {
    setPhoto({
      url: url,
      thumbnail_url: thumbnail_url
      })
  }

  function handleLeftClick () {

  }

  function handleRightClick () {

  }

  return (
    <div
    className='image-gallery'
    // onClick={() => setView( 'expanded' )}
    >
      <button onClick={handleLeftClick}>Left Arrow</button>
      <img className='preview' src={currentPhoto.url}></img>
      <div className='thumbnails'>
        {
          props.photos.map( photo =>
          <Thumbnails
          key={props.photos.indexOf(photo)}
          thumbnailUrl={photo.thumbnail_url}
          photoUrl={photo.url}
          handleThumbnailClick={handleThumbnailClick}/>
          )
        }
        </div>
        <button onClick={handleRightClick}>Right Arrow</button>
    </div>
  )
}

export default ImageGallery;