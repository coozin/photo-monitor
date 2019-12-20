import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Actions
// import { getPhotos } from '../../actions';
import { thunk_action_creator } from "../../actions";

// Material UI
// import Table from '@material-ui/core/Table';

class PhotoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(thunk_action_creator())
  }

  render() {
    return (
      <div>
        table will go here
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { data } = state.photos
  console.log("mapStateToProps", state)
  return { data }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ getPhotos }, dispatch)
// }

export default connect(
  mapStateToProps,
  null
)(PhotoTable);