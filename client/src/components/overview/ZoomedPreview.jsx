import React, { useState } from 'react';

const ZoomedPreview = ({ preview }) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const magnifierHeight = 150;
  const magnifierWidth = 250;
  const zoomLevel = 2;

  const handleMouseMove = (e) => {
    const elem = e.target
    const { top, left } = elem.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setXY([x, y]);
  }

  const handleMouseEnter = (e) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  }

  const handleMouseLeave= () => {
    setShowMagnifier(false);
  }

  return (
    <div className='zoomed-preview-container'>
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
        left: `${(x - magnifierWidth / 2) + (1180/2)}px`,
        top: `${y - magnifierHeight / 2  }px`,
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
