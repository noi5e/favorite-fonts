import {
  DISLIKE_FONT,
  LIKE_FONT,
  REQUEST_FONTS,
  RECEIVE_FONTS,
  UPDATE_FAVES,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "../actionTypes";

const initialState = {
  isFetching: false,
  fonts: [],
  faveFonts: [],
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DISLIKE_FONT: {
      const modifiedFonts = [...state.fonts];

      for (let i = 0; i < modifiedFonts.length; i++) {
        if (modifiedFonts[i].family === action.font) {
          modifiedFonts[i].liked = false;
          break;
        }
      }

      return Object.assign({}, state, {
        fonts: modifiedFonts
      });
    }

    case LIKE_FONT: {
      const modifiedFonts = [...state.fonts];

      for (let i = 0; i < modifiedFonts.length; i++) {
        if (modifiedFonts[i].family === action.font) {
          modifiedFonts[i].liked = true;
          break;
        }
      }

      return Object.assign({}, state, {
        fonts: modifiedFonts
      });
    }

    case REQUEST_FONTS:
      return Object.assign({}, state, { isFetching: true });

    case RECEIVE_FONTS:
      return Object.assign({}, state, {
        isFetching: false,
        fonts: action.fonts
      });

    case UPDATE_FAVES: {
      const modifiedFonts = [...state.fonts];

      for (let i = 0; i < action.faves.length; i++) {
        for (let j = 0; j < modifiedFonts.length; j++) {
          console.log(
            "fonts: " + action.faves[i].family + ", " + modifiedFonts[j].family
          );

          if (modifiedFonts[j].family === action.faves[i].family) {
            console.log("liking " + modifiedFonts[j].family);
            modifiedFonts[j].liked = true;
            break;
          }
        }
      }

      return Object.assign({}, state, {
        fonts: modifiedFonts
      });
    }

    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, { user: action.user });

    case USER_LOGOUT:
      return Object.assign({}, state, { user: {} });

    default:
      return state;
  }
}
