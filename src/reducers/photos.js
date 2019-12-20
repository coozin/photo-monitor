const defaultState = {
  photos: [],
}

const painting = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_PHOTOS':
      console.log("GET_PHOTOS state", state)
      console.log("GET_PHOTOS action", action)
      return state
    default:
      return state
  }
}

export default painting;