import React, { useState, useEffect }  from 'react';

const ActionButton = ({ id, index, listState, triggerDelete, triggerModal }) => {
  const [isStar, setStar] = useState(true);
  const [button, setButton] = useState('☆');

  const setAction = () => {
    if (listState === 'related') {
      setStar(true);
    } else if (listState === 'outfit') {
      setStar(false);
    }
  }

  useEffect(() => {
    setAction();
  }, [listState]);

  return (
    <div className='ActionButton'>
      {isStar
        ? <i className="fas fa-star" id='ActButton' key={id} onClick={() => {triggerModal(id)}}></i>
        : <i className="fas fa-times" id='ActButton' key={index} type="button" value='✖' onClick={() => {triggerDelete(index)}}></i>
      }
    </div>
  )
};

export default ActionButton;