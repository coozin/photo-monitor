import React from 'react';
import DialogDetails from './DialogDetails';

import { render, fireEvent, screen, wait } from '@testing-library/react';

test('show dialog', async () => {
  const handleClose = jest.fn();
  const showDialog = true;
  const dialogPhotohoots = [
    {
      id: 14,
      day_of_the_week: "MONDAY",
      type: "Real Estate",
      client_id: 94,
      photoshoot_id: 14,
      title: "Aubrey",
      number_of_photos: 42,
      country: "France",
      package: "XS",
    }
  ];
  const dialogTitle = "Title";
  const { getByRole } = render(<DialogDetails open={showDialog} dialogPhotohoot={dialogPhotohoots} handleClose={handleClose} dialogTitle={dialogTitle} />);
  // const content = queryByText("monday");
  // expect(content).toBeNull();

  const closeButton = await wait(() => getByRole("Dialog"))

  fireEvent.click(closeButton)
  expect(handleClose).toHaveBeenCalledTimes(1)

  // const handleClose = jest.fn()
  // const { getByText } = render(<button onClick={handleClose}>Close</button>)
  // fireEvent.click(getByText(/Close/i))
  // expect(handleClose).toHaveBeenCalledTimes(1)
});