import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import App from './client/src/components/App.jsx';
import ActionButton from './client/src/components/RIC-Widget/ActionButton.jsx';
import OutfitList from './client/src/components/RIC-Widget/OutfitList.jsx';

// basic render testing, screen.debug() will log the HTML output in test terminal
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });
});

describe('Add to Outfit card showing up', () => {
  test('check for outfit text', () => {
    render(<OutfitList />);

    expect(screen.getByText('Add to Outfit')).toBeInTheDocument();
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

// need to add integration test to test that delete button appears after userClicks

/*
use 'queryBy' to search for elements that shouldn't be there
use 'findBy'for asynchronous elements which will be there eventually
*/

/*
'fireEvent.change' func to simulate interactions of an end user, only change events
'userEvent.type' func triggers a change event, but also keyDown, keyPress, and keyUp events

Example:

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);

    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    OR

    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});

*/

