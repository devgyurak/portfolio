import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio website', () => {
  render(<App />);
  const nameElement = screen.getByText(/Jeongseop Lim/i);
  expect(nameElement).toBeInTheDocument();
});