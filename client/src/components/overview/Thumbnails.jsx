import React from 'react';

function Thumbnail (props) {

  function getBothUrls (e) {
    var url = e.target.getAttribute('photo-url');
    var thumbnail_url = e.target.src;
    props.handleThumbnailClick(url, thumbnail_url)
  }

  return (
    <img
    className='thumbnail'
    src={props.thumbnailUrl}
    photo-url={props.photoUrl}
    onClick={(e) => getBothUrls(e)}></img>
  )
}

export default Thumbnail;