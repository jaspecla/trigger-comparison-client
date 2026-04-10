import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App.jsx';

test('renders heading', () => {
  render(<App />);
  const heading = screen.getByText(/Received Blob Messages/i);
  expect(heading).toBeInTheDocument();
});
