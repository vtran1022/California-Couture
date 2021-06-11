import React from 'react';
import RelatedList from './RelatedList.jsx';

export const initialState = { slideIndex: 0 };

export const reducer = (state, action) => {
  switch (action.type) {
    case 'next':
      return { slideIndex: state.slideIndex + 1 };
    case 'previous':
      return {
        slideIndex: state.slideIndex === 0 ? 0 : state.slideIndex - 1
      };
    default:
      throw new Error();
  }
};
