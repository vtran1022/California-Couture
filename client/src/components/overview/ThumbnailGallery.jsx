import React, { useState, useEffect } from 'react';

const ThumbnailGallery = ({ photolist, handleThumbnailClick }) => {
  const [initialIndex, setIndex] = useState(0);
  const [isRight, setRight] = useState(false);
  const [isLeft, setLeft] = useState(false);

  const stopper = -(photolist.length - 7); // this helps makes the right arrow go away and stops the user from scrolling any further

  const handleClick = (action) => {
    if (action.type === 'previous') {
      setRight(true);
      setIndex(prevState => prevState + 1);
    } else if (action.type === 'next') {
      setLeft(true);

      (photolist.length > 6 && initialIndex > stopper)
      ? setIndex(prevState => prevState - 1)
      : null;
    }
  }

  useEffect(() => {
    photolist.length > 7
    ? setRight(true)
    : setRight(false);
  }, [photolist]);

  useEffect(() => {
    initialIndex === stopper
    ? setRight(false)
    : null;

    initialIndex === 0
    ? setLeft(false)
    : setLeft(true);
  }, [initialIndex]);

  return (
    <>
    {isLeft
        ? <button onClick={() => handleClick({ type: 'previous' })}>ˆ</button>
        : <button>x</button> //this exists as a placeholder, so your gallery doesn't shift up/down base on how this appears
      }
    <div className='image-thumbnailgallery' style={{ '--offset': initialIndex }}>
      {photolist.map((photo, i) => (
        <span key={i} style={{ '--offset': initialIndex }}>
          <img src={photo.thumbnail_url}
              alt='thumbnail photo'
              key={i}
              onClick={() => handleThumbnailClick(i)} ></img>
        </span>
      ))}
    </div>
    {isRight
        ? <button onClick={() => handleClick({ type: 'next' })}>ˇ</button>
        : <button>x</button> //this exists as a placeholder, so your gallery doesn't shift up/down base on how this appears
      }
    </>
  )

};

export default ThumbnailGallery;