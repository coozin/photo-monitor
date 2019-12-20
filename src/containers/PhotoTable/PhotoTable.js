import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Actions
// import { getPhotos } from '../../actions';
import { thunk_action_creator, details_action_creator } from "../../actions";

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Constants
const CATEGORIES = ['real estate', 'events', 'food', 'other'];
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

class PhotoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
    };
  }

  createData(market, monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
    return { market, monday, tuesday, wednesday, thursday, friday, saturday, sunday };
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
          rows[CATEGORIES[j]][`${combinedDetails[i].day_of_the_week.toLowerCase()}`] += combinedDetails[i].number_of_photos
        }
      }
    }
    return rows;
  }

  render() {
    const { details } = this.state;
    const { photos } = this.props;

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

    // [
    //   this.createData('Real estate', 100, 100, 100, 100, 100, 100, 100),
    // ];

    console.log('rows (final)', rows)

    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Client Market</TableCell>
              <TableCell>MONDAY</TableCell>
              <TableCell>TUESDAY</TableCell>
              <TableCell>WEDNESDAY</TableCell>
              <TableCell>THURSDAY</TableCell>
              <TableCell>FRIDAY</TableCell>
              <TableCell>SATURDAY</TableCell>
              <TableCell>SUNDAY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.category}>
                <TableCell
                  component="th"
                  scope="row"
                >
                  {row.category}
                </TableCell>
                <TableCell
                  align="right"
                >
                  {row.monday}
                </TableCell>
                <TableCell
                  align="right"
                >
                  {row.tuesday}
                </TableCell>
                <TableCell
                  align="right"
                >
                  {row.wednesday}
                </TableCell>
                <TableCell
                  align="right"
                >
                  {row.thursday}
                </TableCell>
                <TableCell
                  align="right"
                >
                  {row.friday}
                </TableCell>
                <TableCell
                  align="right"
                >
                  {row.saturday}
                </TableCell>
                <TableCell
                  align="right"
                >
                  {row.sunday}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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