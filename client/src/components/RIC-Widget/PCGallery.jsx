import React, { useState, useEffect } from 'react';
import errimage from '../../imgs/imagenot.png';

const Gallery = ({ gallery, mouseOut }) => {
  const [images, setImages] = useState([]);

  const pullPhotos = (gallery) => {
    const photos = gallery.map((item) => item.thumbnail_url)

    setImages(photos);
  };

  useEffect(() => {
    gallery.length !== 0
    ? pullPhotos(gallery)
    : null;
  }, [gallery]);

  return (
    <div className='gallery-container'>
      {isLeft
        ? <button className='g-button1' onClick={() => handleClick({ type: 'previous' })}>‹</button>
        : <button className='g-button2'>‹</button>
      }
      <div className='g-container' style={{ '--offset': initialIndex }}/* onMouseOut={mouseOut} */>
        {images.map((image, i) => (
        <span key={i} className='g-image-container'>
          <img className='gallery-image' src={image ? image : errimage} alt='thumbnail-image'></img>
        </span>
        ))}
      </div>
      {isRight
        ? <button className='g-button1' onClick={() => handleClick({ type: 'next' })}>›</button>
        : <button className='g-button2'>›</button>
      }
    </div>
  );

};

export default Gallery;