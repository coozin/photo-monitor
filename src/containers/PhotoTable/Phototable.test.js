import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import store from '../../store';

test('render table', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const titleElement = screen.getByText(/Photoshoots/i);
  const marketHeader = screen.getByText(/Client Market/i);

  expect(titleElement).toBeInTheDocument();
  expect(marketHeader).toBeInTheDocument();
});