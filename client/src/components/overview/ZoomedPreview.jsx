import React, { useState } from 'react';

function ZoomedPreview ( { view, preview }) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const magnifierHeight = 150;
  const magnifierWidth = 150;
  const zoomLevel = 2;

  function handleMouseMove (e) {
    const elem = e.target
    const { top, left } = elem.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  }

  function handleMouseEnter (e) {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  }

  function handleMouseLeave () {
    setShowMagnifier(false);
  }

  function checkFunctionality (src) {
    console.log(src)
    console.log(src.width)
    console.log(src.height)
  }


  return (
    <div className='preview-container'>
      <button onClick={() => checkFunctionality(preview)}>Test me Here!!!</button>
      <img
      className='preview'
      id='zoomed-preview'
      src={preview}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      alt='One of the preview pictures of the selected style'
      />
      <div
      className='zoomed-preview'
      style={{
        display: showMagnifier ? "" : "none",
        top: `${y-120}px`,
        left: `${x+410}px`,
        backgroundImage: `url('${preview}')`,
        backgroundSize: `${imgWidth * zoomLevel}px ${
          imgHeight * zoomLevel
        }px`,
        backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
        backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
        }}>
      </div>
    </div>

  )
}

    export default ZoomedPreview;
