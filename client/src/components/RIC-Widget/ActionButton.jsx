import React, { useState, useEffect }  from 'react';

const ActionButton = ({ id, index, listState, triggerDelete, triggerModal, offset }) => {
  const [isStar, setStar] = useState(true);

  const setAction = () => {
    listState === 'related'
    ? setStar(true)
    : setStar(false);
  };

  useEffect(() => {
    setAction();
  }, [listState]);

  return (
    <span className='ActionButton'>
      {isStar
        ? <i data-testid='star' className="fas fa-star" id='ActButton' key={id} onClick={() => {triggerModal(id)}}></i>
        : <i data-testid='x-button' className="fas fa-times" id='ActButton' key={index} type="button" value='✖' onClick={() => {triggerDelete(index)}}></i>
      }
    </span>
  )
};

export default ActionButton;