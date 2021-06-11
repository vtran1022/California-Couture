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
        ? <input key={id} type="button" value='☆' onClick={() => {triggerModal(id)}}/>
        : <input key={index} type="button" value='ⓧ' onClick={() => {triggerDelete(index)}} />
      }
    </div>
  )
};

export default ActionButton;

/*
action buttons:
☆ or x

'☆' - will open up comparison modal component
x - will delete the product card

*/