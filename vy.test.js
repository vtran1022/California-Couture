import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './client/src/components/App.jsx';

// basic render testing, screen.debug will log the HTML output in test terminal
describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.debug();
  });
});

/*
'getByText' is a search func that 'grabs' a text within the HTML
- accepts a string as input or a regular expression: screen.getByText(/Outfit/) - this is used for a partial match
*/
describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    expect(screen.getByText('Add to Outfit')).toBeInTheDocument();
  });
});

/*
'getByRole' - used to retrieve elements by attributes or by their implicit roles, like a button.
- a feature is that it will suggest roles if you provide a role that is not available
*/

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.getByRole('button');
  });
});

/*
use 'queryBy' to search for elements that shouldn't be there
use 'findBy'for asynchronous elements which will be there eventually
*/