/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './client/src/components/App.jsx';

describe("Overview Tests", () => {
  test('adds 1 + 1 to equal 2', () => {
    expect(1 + 1).toBe(2);
  });
});

describe('App', () => {

  test('renders App component', () => {
    render(<App />);

    screen.getByText('Price');
  });
});