import React, { useState, useEffect } from 'react';

const ViewModal = ({ picture, handleLeft, handleRight, close }) => {
  const [viewPicture, setPicture] = useState()

  return (
    <React.Fragment >
    <img src='client/src/imgs/Navigate-left_36746.png' onClick={() => handleLeft()} /> {/* Need to fix path */}
    <img src='client/src/imgs/Navigate-right_36745.png' onClick={() => handleRight()} /> {/* Need to fix path */}
    <img
    src={picture}
    />
    <button className='close-view' onClick={() => close()}>x</button>
    </React.Fragment>
  )
}

export default ViewModal;