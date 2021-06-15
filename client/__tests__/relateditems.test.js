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
describe('RICWidget', () => {
  test('checking both lists render', () => {
    const { getByText } = render(<RICWidget />);

    expect(getByText(/Your Outfit/)).toBeInTheDocument();
    expect(getByText(/Related Products/)).toBeInTheDocument();
  });
});

describe('RelatedList', () => {
  test('arrow button should not exist initial render', () => {
    const { getByTestId } = render(<RelatedList />);

    expect(getByTestId('buttonL')).toBeDisabled();
    expect(getByTestId('buttonR')).toBeDisabled();
  });
});

describe('Related List', () => {
  test('style - offset should be 0 initially', () => {
    const { getByTestId } = render( <RelatedList /> );

    const list = (getByTestId('RICList'));

    expect(list).toHaveStyle({'--offset': '0'});
  });
});

describe('OutfistList', () => {
  test('arrow button should not exist initial render', () => {
    const { getByTestId } = render(<OutfitList />);

    expect(getByTestId('buttonL')).toBeDisabled();
    expect(getByTestId('buttonR')).toBeDisabled();
  });
});

describe('OutfitList', () => {
  test('Check that Add Outfit card exists', () => {
    const { getByText } = render(<OutfitList />);

    expect(getByText(/Add to Outfit/)).toBeInTheDocument();
  });
});

describe('OutfitList', () => {
  test('calls the onClick callback handler', async () => {
    const onClick = jest.fn();

    render( <div className='AddCard' onClick={onClick}>
      <div data-testid='outfit'>Add to Outfit</div>
    </div> );

    await userEvent.click(screen.getByTestId('outfit'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Action Button', () => {
  test('calls the onClick callback handler for x button', async () => {
    const onClick = jest.fn();

    const { getByTestId } = render( <ActionButton triggerDelete={onClick}/> );

    await userEvent.click(getByTestId('x-button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Product Card', () => {
  test('calls the onClick callback handler for product card', async () => {
    const onClick = jest.fn();

    const { getByTestId } = render( <ProductCard productClick={onClick}/> );

    await userEvent.click(getByTestId('productcard'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Product Card', () => {
  test('product card to be visible', () => {
    const { getByTestId } = render( <ProductCard /> );

    const product = (getByTestId('productcard'));

    expect(product).toBeVisible();
  });
});

describe('ComparisonModal', () => {
  test('check modal rendering', () => {
    const { getByText } = render(<ComparisonModal />);

    expect(getByText(/Comparing/)).toBeInTheDocument();
  });
});

describe('Comparison Modal', () => {
  test('modal to be visible', () => {
    const { getByTestId } = render( <ComparisonModal /> );

    const modal = (getByTestId('c-modal'));

    expect(modal).toBeVisible();
  });
});