import { 
  REQUEST_FONTS, 
  RECEIVE_FONTS,
  USER_LOGIN_SUCCESS
} from "../actionTypes";

const initialState = {
  isFetching: true,
  fonts: [],
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FONTS: 
      return Object.assign({}, state, { isFetching: true });
      
    case RECEIVE_FONTS:
      return Object.assign({}, state, { isFetching: false, fonts: action.fonts });

    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, { user: action.user });

    default:
      return state;
  }
}
