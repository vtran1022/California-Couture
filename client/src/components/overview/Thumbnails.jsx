import React from 'react';

function Thumbnail ({ thumbnailUrl, photoUrl, photoList, handleThumbnailClick }) {

  function getPhotoInfo (e) {
    var url = e.target.getAttribute('photo-url');
    var thumbnail_url = e.target.src;
    for (var i = 0; i < photoList.length; i++) {
      if (photoList[i].url === url) {
        var index = i;
        break;
      }
    }
    handleThumbnailClick(url, thumbnail_url, index);
  }

  return (
    <img
    className='thumb'
    src={ thumbnailUrl }
    photo-url={ photoUrl }
    onClick={(e) => getPhotoInfo(e)}></img>
  )
}

export default Thumbnail;