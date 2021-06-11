import React, { useState, useEffect } from 'react';

const ViewModal = ({ picture, handleLeft, handleRight, close }) => {
  const [viewPicture, setPicture] = useState()

  return (
    <React.Fragment >
    {/* <img src='client/src/imgs/Navigate-left_36746.png' onClick={() => handleLeft()} />
    <img src='client/src/imgs/Navigate-right_36745.png' onClick={() => handleRight()} /> */}
    {/* <img
    id='enlarged-view'
    src={picture}
    /> */}
    <span class="close cursor" onclick={() => close()}>&times;</span>
    </React.Fragment>
  )
}

export default ViewModal;