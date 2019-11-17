import { REQUEST_FONTS, RECEIVE_FONTS } from "../actionTypes";

const initialState = {
  isFetching: true,
  fonts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FONTS: 
      return Object.assign({}, state, { isFetching: true });
      
    case RECEIVE_FONTS:
      return Object.assign({}, state, { isFetching: false });

    default:
      return state;   
  }
}
