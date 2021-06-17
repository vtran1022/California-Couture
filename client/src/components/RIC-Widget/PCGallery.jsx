import React, { useState, useEffect } from 'react';
import errimage from '../../imgs/imagenot.png';

const Gallery = ({ gallery }) => {
  const [images, setImages] = useState([]);

  const pullPhotos = (gallery) => {
    const photos = gallery.map((item) => {
      return item.thumbnail_url;
    })

    setImages(photos);
  };

  useEffect(() => {
    gallery.length !== 0
    ? pullPhotos(gallery)
    : null;
  }, [gallery]);

  return (
    <div className='gallery-container'>{images.map((image, i) => (
      <img className='gallery-image' key={i} src={image ? image : errimage} alt='thumbnail-image'></img>
    ))}</div>
  );

};

export default Gallery;