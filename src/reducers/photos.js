const defaultState = {
  photos: [],
}

const painting = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_PHOTOS':
      return state
    default:
      return state
  }
}
  
export default painting;