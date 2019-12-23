import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import App from '../../App';
import store from '../../store';

test('render details table', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // get all button
  const catDetailButtons = screen.getAllByRole("button");

  // getting the first button "real estate" is first category
  fireEvent.click(catDetailButtons[0])

  let detailsTableHeader = {}

  // await "real estate" since this is the first result
  await wait(
    () => detailsTableHeader = screen.getByText(/real estate/i),
    {
      timeout: 1000,
      interval: 100,
    }
  )

  // expect it to be in document
  expect(detailsTableHeader).toBeInTheDocument();
});