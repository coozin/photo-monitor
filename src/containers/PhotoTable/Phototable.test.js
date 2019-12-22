import React from 'react';
import { render, screen } from '@testing-library/react';
import Phototable from './Phototable';

test('show dialog', () => {
  render(<Phototable />);
  const titleElement = screen.getByText(/Photoshoots/i);
  expect(titleElement).toBeInTheDocument();
});
