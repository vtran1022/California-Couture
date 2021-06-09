import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './client/src/components/App.jsx';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    // screen.debug();
    expect(screen.getByText('Add to Outfit')).toBeInTheDocument();
  });
});