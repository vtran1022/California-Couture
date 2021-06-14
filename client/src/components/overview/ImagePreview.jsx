import React, { useState } from 'react';

function ImagePreview ( { preview }) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const magnifierHeight = 150;
  const magnifieWidth = 150;
  const zoomLevel = 2.5;

  function handleMouseMove (e) {
    const elem = e.target
    const { top, left } = elem.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  }

  return (
    <div className='preview-container'>
      <img
      className='preview'
      src={preview}
      onMouseEnter={(e) => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
      alt='One of the preview pictures of the selected style'
      />
      <div>

      </div>
    </div>
  )
}

export default ImagePreview;