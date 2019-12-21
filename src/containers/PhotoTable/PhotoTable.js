import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import './PhotoTable.css';

// Actions
// import { getPhotos } from '../../actions';
import {
  thunk_action_creator,
  details_action_creator
} from "../../actions";

// Material UI
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

// Libraries
import MaterialTable from 'material-table';

// Constants
const CATEGORIES = ['real estate', 'events', 'food', 'other'];
// const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

class PhotoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      showDialog: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(thunk_action_creator())
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.photos && (!this.props || !this.props.photos || !this.props.photos.length)) {
      this.processResults(nextProps.photos)
    }
    if (nextProps && nextProps.photoshoot_details && (!this.props.photoshoot_details || this.props.photoshoot_details.id !== nextProps.photoshoot_details.id)) {
      this.appendToDetails(nextProps.photoshoot_details)
    }
  }

  processResults(photos) {
    let photoshootIds = []
    for (let i = 0; i < photos.length; i++) {
      console.log(photos[i])
      photoshootIds.push(photos[i].photoshoot_id)
    }

    console.log("photoshootIds", photoshootIds)

    for (let i = 0; i < photoshootIds.length; i++) {
      // console.log(photoshootIds[i])
      this.props.dispatch(details_action_creator(photoshootIds[i]))
    }
  }

  appendToDetails(details) {
    this.setState({
      details: [
        ...this.state.details,
        details
      ]
    })
  }

  showDayBreakdown(day, type, photohoots) {
    console.log("showDayBreakdown day", day)
    console.log("showDayBreakdown type", type)
    console.log("showDayBreakdown photohoots", photohoots)

    this.setState({
      showDialog: true,
      dialogTitle: `${day} - ${type}`,
      dialogPhotohoots: photohoots.filter(photo => photo.day_of_the_week.toLowerCase() === day),
    })
  }

  handleClose = () => {
    this.setState({
      showDialog: false,
    })
  }

  combineDetails(photos, details) {
    let combinedDetails = [];
    let rows = {
      'real estate': {
        category: 'real estate',
        photoshoots: [],
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
      'events': {
        category: 'events',
        photoshoots: [],
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
      'food': {
        category: 'food',
        photoshoots: [],
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
      'other': {
        category: 'other',
        photoshoots: [],
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
    }

    for (let i = 0; i < photos.length; i++) {
      for (let j = 0; j < details.length; j++) {
        if (photos[i].photoshoot_id === details[j].id) {
          combinedDetails.push({
            ...photos[i],
            ...details[j]
          })
        }
      }
    }
    console.log("combinedDetails to be processed", combinedDetails)
    for (let i = 0; i < combinedDetails.length; i++) {
      for (let j = 0; j < CATEGORIES.length; j++) {
        if (combinedDetails[i].type.toLowerCase() === CATEGORIES[j]) {
          rows[CATEGORIES[j]].photoshoots.push(combinedDetails[i]);
          rows[CATEGORIES[j]][`${combinedDetails[i].day_of_the_week.toLowerCase()}`] += combinedDetails[i].number_of_photos;
        }
      }
    }
    return rows;
  }

  render() {
    const {
      details,
      showDialog,
      dialogTitle,
      dialogPhotohoots
    } = this.state;
    const {
      photos
    } = this.props;

    console.log('details in render', details)

    let fullData = [];
    let rows = [];

    if (photos && photos.length > 0 && details && details.length > 0) {
      fullData = this.combineDetails(photos, details);
      for (let j = 0; j < CATEGORIES.length; j++) {
        rows.push(fullData[`${CATEGORIES[j]}`])
      }
    }

    console.log("fullData", fullData)

    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Client Market', field: 'category' },
            {
              title: 'Monday',
              field: 'monday',
              type: 'numeric',
              render: rowData =>
                <div
                  className="cell"
                  onClick={() => this.showDayBreakdown("monday", rowData.category, rowData.photoshoots)}
                >
                  {rowData.monday}
                </div>
            },
            {
              title: 'Tuesday',
              field: 'tuesday',
              type: 'numeric',
              render: rowData =>
                <div
                  className="cell"
                  onClick={() => this.showDayBreakdown("tuesday", rowData.category, rowData.photoshoots)}
                >
                  {rowData.tuesday}
                </div>
            },
            {
              title: 'Wednesday',
              field: 'wednesday',
              type: 'numeric',
              render: rowData =>
                <div
                  className="cell"
                  onClick={() => this.showDayBreakdown("wednesday", rowData.category, rowData.photoshoots)}
                >
                  {rowData.wednesday}
                </div>
            },
            {
              title: 'Thursday',
              field: 'thursday',
              type: 'numeric',
              render: rowData =>
                <div
                  className="cell"
                  onClick={() => this.showDayBreakdown("thursday", rowData.category, rowData.photoshoots)}
                >
                  {rowData.thursday}
                </div>
            },
            {
              title: 'Friday',
              field: 'friday',
              type: 'numeric',
              render: rowData =>
                <div
                  className="cell"
                  onClick={() => this.showDayBreakdown("friday", rowData.category, rowData.photoshoots)}
                >
                  {rowData.friday}
                </div>
            },
            {
              title: 'Saturday',
              field: 'saturday',
              type: 'numeric',
              render: rowData =>
                <div
                  className="cell"
                  onClick={() => this.showDayBreakdown("saturday", rowData.category, rowData.photoshoots)}
                >
                  {rowData.saturday}
                </div>
            },
            {
              title: 'Sunday',
              field: 'sunday',
              type: 'numeric',
              render: rowData =>
                <div
                  className="cell"
                  onClick={() => this.showDayBreakdown("sunday", rowData.category, rowData.photoshoots)}
                >
                  {rowData.sunday}
                </div>
            },
          ]}
          data={rows}
          title="Photoshoots type breakdown"
          options={{
            paging: false,
          }}
          detailPanel={[
            {
              // icon: 'calendar',
              tooltip: "Show Category Data",
              render: rowData => {
                // this would show all photoshoots by client for this market
                console.log("rowData.photoshoots detailPanel", rowData.photoshoots)
                return (
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
                    data={rowData.photoshoots}
                    options={{
                      search: false,
                      sorting: false,
                      paging: false,
                    }}
                    title={`${rowData.category} details`}
                  />
                )
              }
            },
          ]}
        />
        {showDialog &&
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
                search: false,
                sorting: false,
                paging: false,
                title: false
              }}
              title={dialogTitle}
            />
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { photos, photoshoot_details } = state.photos
  console.log("mapStateToProps", state)
  return { photos, photoshoot_details }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ getPhotos }, dispatch)
// }

export default connect(
  mapStateToProps,
  null
)(PhotoTable);