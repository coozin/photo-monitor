const defaultState = {
  photos: [],
  photoshoot_details: {},
}

const painting = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_PHOTOS':
      console.log("GET_PHOTOS state", state)
      console.log("GET_PHOTOS action", action)
      return {
        ...state,
        photos: action.data
      }
    case 'GET_PHOTOSHOOT_DETAILS':
      console.log("GET_PHOTOSHOOT_DETAILS state", state)
      console.log("GET_PHOTOSHOOT_DETAILS action", action)
      return {
        ...state,
        photoshoot_details: action.data
      }
    default:
      return state
  }
}

export default painting;