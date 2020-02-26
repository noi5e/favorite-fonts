import {
  DISLIKE_FONT,
  LIKE_FONT,
  REQUEST_FONTS,
  RECEIVE_FONTS,
  UPDATE_FAVES,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  LOAD_DISPLAY_FONTS
} from "../actionTypes";

const initialState = {
  isFetching: false,
  displayPosition: 0,
  displayedFonts: [],
  fonts: [],
  moreFontsToLoad: true,
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

    case LOAD_DISPLAY_FONTS: {
      const loadedFonts = state.fonts.slice(state.displayPosition, state.displayPosition + 30);

      return Object.assign({}, state, {
        displayPosition: state.displayPosition + 30,
        displayedFonts: state.displayedFonts.concat(loadedFonts),
        moreFontsToLoad: state.displayPosition + 30 < state.fonts.length
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

    case RECEIVE_FONTS: {
      return Object.assign({}, state, {
        isFetching: false,
        fonts: action.fonts,
        displayedFonts: action.fonts.slice(0, 32),
        displayPosition: 32,
      });
    }

    case UPDATE_FAVES: {
      const modifiedFonts = [...state.fonts];

      for (let i = 0; i < action.faves.length; i++) {
        for (let j = 0; j < modifiedFonts.length; j++) {
          if (modifiedFonts[j].family === action.faves[i].family) {
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
