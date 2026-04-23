import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio website', () => {
  render(<App />);
  expect(screen.getByText('Devgyurak')).toBeInTheDocument();
  expect(screen.getByText('이규락')).toBeInTheDocument();
  expect(screen.getByText('dev@devgyurak.com')).toBeInTheDocument();
});
