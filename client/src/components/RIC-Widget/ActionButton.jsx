import React, { useState, useEffect }  from 'react';

const ActionButton = ({ id, index, listState, triggerDelete, triggerModal }) => {
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
        ? <i data-testid='star' className="fas fa-star ActButton" key={id} onClick={() => {triggerModal(id)}}></i>
        : <input data-testid='x-button' className='ActButton' key={index} type="button" onClick={() => {triggerDelete(index)}} type="button" value='✖'/>
      }
    </span>
  )
};

export default ActionButton;