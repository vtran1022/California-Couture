import React from 'react';

const initialState = {count: 0};

const Reducer = (state, action) => {
  switch (action.type) {
    case 'next':
      return {count: state.count + 1};
    case 'previous':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
};

export default {
  initialState,
  Reducer
};
