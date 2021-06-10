import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import App from './client/src/components/App.jsx';
import ActionButton from './client/src/components/RIC-Widget/ActionButton.jsx';
import OutfitList from './client/src/components/RIC-Widget/OutfitList.jsx';
import ProductCard from './client/src/components/RIC-Widget/ProductCard.jsx';
import RelatedList from './client/src/components/RIC-Widget/RelatedList.jsx';

// basic render testing, screen.debug() will log the HTML output in test terminal
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });
});

describe('Action Button', () => {
  test('star action button exists on initial render', () => {
    render(<ActionButton />);

    expect(screen.getByDisplayValue('☆')).toBeInTheDocument();
  });
});

describe('Action Button', () => {
  test('delete action button does not exist on initial render', () => {
    render(<ActionButton />);

    expect(screen.queryByDisplayValue('x')).toBeNull();
  });
});

describe('Action Button', () => {
  test('calls the onClick callback handler', async () => {
    const onClick = jest.fn();

    render( <input type="button" value='x' onClick={onClick} /> );

    await userEvent.click(screen.getByDisplayValue('x'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Add to Outfit card showing up', () => {
  test('check for outfit text', () => {
    render(<OutfitList />);

    expect(screen.getByText(/Add to Outfit/)).toBeInTheDocument();
  });
});

describe('Outfit List', () => {
  test('calls the onClick callback handler', async () => {
    const onClick = jest.fn();

    render( <div className='AddCard' onClick={onClick}>
      <div data-testid='outfit'>Add to Outfit</div>
    </div> );

    await userEvent.click(screen.getByTestId('outfit'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// checking rendering for now, need to work on better test for this
describe('Product Card', () => {
  test('check existance', () => {
    render(<ProductCard />);
  });
});

// checking rendering for now, need to work on better test for this
describe('Related List', () => {
  test('check existance', () => {
    render(<RelatedList />);
  });
});