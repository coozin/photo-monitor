import axios from 'axios';
// import store from '../store';

export const startGetPhotos = () => {
  return {
    type: "START_GET_PHOTOS",
  };
}

export const startGetPhotoshootDetails = () => {
  return {
    type: "START_PHOTOSHOOT_DETAILS",
  }
}

export const getPhotos = data => {
  return {
    type: "GET_PHOTOS",
    data
  };
}

export const getPhotoshootDetails = data => {
  return {
    type: "GET_PHOTOSHOOT_DETAILS",
    data
  };
}

export const getPhotosErr = err => {
  console.log("getPhotosErr = err ", err)
  return {
    type: "GET_PHOTOS_ERR",
    err
  };
}

export const getPhotoshootErr = err => {
  console.log("getPhotoshootErr = err ", err)
  return {
    type: "GET_PHOTOSHOOT_ERR",
    err
  };
}

export const thunk_action_creator = () => {
  return function (dispatch) {
    dispatch(startGetPhotos());
    const request = axios.get('https://frontend-test-api-server.herokuapp.com/photoshoots_daily/?limit=100')
    return request.then(
      response => dispatch(getPhotos(response.data)),
      err => dispatch(getPhotosErr(err.data))
    )
  };
};

export const details_action_creator = id => {
  return function (dispatch) {
    dispatch(startGetPhotoshootDetails());
    const request = axios.get(`https://frontend-test-api-server.herokuapp.com/photoshoot_details/${id}`)
    return request.then(
      response => dispatch(getPhotoshootDetails(response.data)),
      err => dispatch(getPhotoshootErr(err.data))
    )
  };
}