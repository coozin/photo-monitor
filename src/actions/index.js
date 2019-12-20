import axios from 'axios';
// import store from '../store';

export const startGetPhotos = () => {
  return {
    type: "START_GET_PHOTOS",
  };
}

export const getPhotos = data => {
  return {
    type: "GET_PHOTOS",
    data
  };
}

export const thunk_action_creator = () => {
  return function (dispatch) {
    dispatch(startGetPhotos());
    const request = axios.get('https://frontend-test-api-server.herokuapp.com/photoshoots_daily/')
    return request.then(
      response => dispatch(getPhotos(response)),
      err => console.log(err)
    )
  };
};

// axios.get('https://frontend-test-api-server.herokuapp.com/photoshoots_daily/')
//     .then((response) => {
//       // handle success
//       console.log("response", response)
//       return {
//         type: 'GET_PHOTOS',
//         result: response
//       }
//     })
//     .catch(function (error) {
//       // handle error
//       return {
//         type: 'GET_PHOTOS',
//         result: error
//       }
//     })