import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import RICWidget from '../src/components/RIC-Widget.jsx';
import ActionButton from '../src/components/RIC-Widget/ActionButton.jsx';
import OutfitList from '../src/components/RIC-Widget/OutfitList.jsx';
import ProductCard from '../src/components/RIC-Widget/ProductCard.jsx';
import RelatedList from '../src/components/RIC-Widget/RelatedList.jsx';
import ComparisonModal from '../src/components/RIC-Widget/ComparisonModal.jsx';

// this cleans up everything after each test to avoid memory leaks
afterEach(cleanup);

// basic render testing, screen.debug() will log the HTML output in test terminal
// describe('RICWidget', () => {
//   test('checking both lists render', () => {
//     const { getByText } = render(<RICWidget />);

//     expect(getByText(/Your Outfit/)).toBeInTheDocument();
//     expect(getByText(/Related Products/)).toBeInTheDocument();
//   });
// });

// describe('RelatedList', () => {
//   test('arrow button should not exist initial render', () => {
//     const { getByTestId } = render(<RelatedList />);

//     expect(getByTestId('buttonL')).toBeDisabled();
//     expect(getByTestId('buttonR')).toBeDisabled();
//   });
// });

// describe('OutfistList', () => {
//   test('arrow button should not exist initial render', () => {
//     const { getByTestId } = render(<OutfitList />);

//     expect(getByTestId('buttonL')).toBeDisabled();
//     expect(getByTestId('buttonR')).toBeDisabled();
//   });
// });

// describe('OutfitList', () => {
//   test('Check that Add Outfit card exists', () => {
//     const { getByText } = render(<OutfitList />);

//     expect(getByText(/Add to Outfit/)).toBeInTheDocument();
//   });
// });

// describe('Action Button', () => {
//   test('calls the onClick callback handler for x button', async () => {
//     const onClick = jest.fn();

//     const { getByTestId } = render( <ActionButton triggerDelete={onClick}/> );

//     await userEvent.click(getByTestId('x-button'));

//     expect(onClick).toHaveBeenCalledTimes(1);
//   });
// });



// describe('OutfitList', () => {
//   test('Check that Add Outfit card exists', () => {
//     const { getByText } = render(<ProductCard />);

//     expect(getByText(/ALu/)).toBeInTheDocument();
//   });
// });




// describe('Outfit List', () => {
//   test('calls the onClick callback handler', async () => {
//     const onClick = jest.fn();

//     render( <div className='AddCard' onClick={onClick}>
//       <div data-testid='outfit'>Add to Outfit</div>
//     </div> );

//     await userEvent.click(screen.getByTestId('outfit'));

//     expect(onClick).toHaveBeenCalledTimes(1);
//   });
// });

// // checking rendering for now, need to work on better test for this
// describe('Product Card', () => {
//   test('check existance', () => {
//     render(<ProductCard />);
//   });
// });

// // checking rendering for now, need to work on better test for this
// describe('Related List', () => {
//   test('check existance', () => {
//     render(<RelatedList />);
//   });
// });

// describe('Comparison Modal', () => {
//   test('comparison modal to not exist on initial render', () => {
//     render(<RelatedList />);

//     expect(screen.queryByText('Comparing')).toBeNull();
//   });
// });

// need to re-write tests