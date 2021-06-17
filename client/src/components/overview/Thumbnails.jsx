import React from 'react';

function Thumbnail ({ cname, photo, photoList, handleThumbnailClick }) {

  function getPhotoInfo (e) {
    var url = e.target.getAttribute('photo-url');
    for (var i = 0; i < photoList.length; i++) {
      if (photoList[i].url === url) {
        var index = i;
        break;
      }
    }
    handleThumbnailClick(index);
  }

  return (
    <img
    className={ cname }
    src={ photo.thumbnail_url }
    photo-url={ photo.url }
    alt='photo-thumbnail'
    onClick={getPhotoInfo}></img>
  )
}

export default Thumbnail;