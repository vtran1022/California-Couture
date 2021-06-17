import React, { useState, useEffect } from 'react';
import errimage from '../../imgs/imagenot.png';

const Gallery = ({ gallery }) => {
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
      {images.map((image, i) => (
      <span key={i} className='g-image-container'>
        <img className='gallery-image' src={image ? image : errimage} alt='thumbnail-image'></img>
      </span>
      ))}
    </div>
  );

};

export default Gallery;