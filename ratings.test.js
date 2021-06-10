import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import RatingsReview from './client/src/components/RatingsReview.jsx';
import Breakdown from './client/src/components/ratings/Breakdown.jsx';
import FormModal from './client/src/components/ratings/FormModal.jsx';
import ReviewTile from './client/src/components/ratings/ReviewTile.jsx';

console.log('in test')

describe('Ratings & Reviews', () => {
  test('render the Ratings and Reviews component', () => {
    render(<Ratings />)
  });
});