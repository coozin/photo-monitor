import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';

// Libraries
import MaterialTable from 'material-table';

test('show dialog', async () => {
  const dialogTitle = "Test Title";

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

  render(
    <MaterialTable
      columns={[
        { title: 'Title', field: 'title' },
        { title: 'Day', field: 'day_of_the_week' },
        { title: 'Client ID', field: 'client_id', type: 'numeric' },
        { title: 'Photoshoot #', field: 'photoshoot_id', type: 'numeric' },
        { title: 'Photo Count', field: 'number_of_photos', type: 'numeric' },
        { title: 'Country', field: 'country' },
        { title: 'Package', field: 'package' },
      ]}
      data={dialogPhotohoots}
      options={{
        search: true,
        sorting: true,
        paging: false,
        title: false
      }}
      title={dialogTitle}
    />
  );

  let renderedContent = null;

  await wait(() => renderedContent = screen.getByText(/monday/i), { timeout: 1000, interval: 100 })

  // console.log("renderedTitle", renderedTitle)

  expect(renderedContent).not.toBeNull()
});