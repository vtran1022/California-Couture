import React, { useState, useEffect }  from 'react';

function ActionButton({ index, listState, triggerDelete }) {
  const [isStar, setStar] = useState(true);
  const [button, setButton] = useState('☆');

  function setAction() {
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
        ? <input type="button" value='☆' />
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