import React, { Component } from 'react';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

// Libraries
import MaterialTable from 'material-table';

class DialogDetails extends Component {
  render() {
    const {
      showDialog,
      dialogPhotohoots,
      dialogTitle,
      handleClose,
    } = this.props;
    return (
      <Dialog
        open={showDialog}
        // maxWidth="md"
        fullScreen
      >
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
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DialogDetails;