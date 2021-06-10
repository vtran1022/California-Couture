import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import Ratings from './client/src/components/RatingsReview.jsx';
import Breakdown from './client/src/components/ratings/Breakdown.jsx';
import FormModal from './client/src/components/ratings/FormModal.jsx';
import ReviewTile from './client/src/components/ratings/ReviewTile.jsx';


describe('Ratings & Reviews', () => {
  test('Should render a Re', () => {
    render(<Ratings />)
  });
});