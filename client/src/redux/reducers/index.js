import {
  DISLIKE_FONT,
  FETCH_DISPLAY_FONTS,
  LIKE_FONT,
  LOAD_ALL_FONTS,
  LOAD_FAVORITE_FONTS,
  RECEIVE_FONTS,
  REQUEST_FONTS,
  UPDATE_FAVES,
  UPDATE_FONT_SIZE,
  UPDATE_SAMPLE_TEXT,
  UPDATE_SEARCH_TERM,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "../actionTypes";

const initialState = {
  isFetching: false,
  displayPosition: 0,
  displayedFonts: [],
  fonts: [],
  fontSize: "40px",
  moreFontsToLoad: true,
  sampleText: "The quick brown fox jumped over the lazy dog.",
  searchTerm: "",
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

    case FETCH_DISPLAY_FONTS: {
      if (state.searchTerm.length > 0) {
        // if there's a search term, we need to load from the fonts matching search term, NOT all fonts.
        let newDisplayedFonts = state.fonts.filter(
          font => font.family.indexOf(state.searchTerm) > -1
        );

        let moreFontsToLoad =
          state.displayPosition + 30 < newDisplayedFonts.length;
        newDisplayedFonts = newDisplayedFonts.slice(
          state.displayPosition,
          state.displayPosition + 30
        );

        return Object.assign({}, state, {
          displayPosition: state.displayPosition + 30,
          displayedFonts: state.displayedFonts.concat(newDisplayedFonts),
          moreFontsToLoad
        });
      } else {
        const loadedFonts = state.fonts.slice(
          state.displayPosition,
          state.displayPosition + 30
        );

        return Object.assign({}, state, {
          displayPosition: state.displayPosition + 30,
          displayedFonts: state.displayedFonts.concat(loadedFonts),
          moreFontsToLoad: state.displayPosition + 30 < state.fonts.length
        });
      }
    }

    case LOAD_ALL_FONTS: {
      return Object.assign({}, state, {
        displayedFonts: state.fonts.slice(0, 32),
        displayPosition: 32,
        moreFontsToLoad: true
      });
    }

    case LOAD_FAVORITE_FONTS: {
      const favoriteFonts = state.fonts.filter(font => font.liked);
      let moreFontsToLoad = favoriteFonts.length > 32;
      const displayedFonts = favoriteFonts.slice(0, 32);

      return Object.assign({}, state, {
        displayedFonts,
        displayPosition: 32,
        moreFontsToLoad
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
        displayPosition: 32
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

    case UPDATE_FONT_SIZE:
      return Object.assign({}, state, { fontSize: action.size });

    case UPDATE_SAMPLE_TEXT: {
      let newSampleText = "";

      if (action.text.length === 0) {
        newSampleText = "The quick brown fox jumped over the lazy dog.";
      } else {
        newSampleText = action.text;
      }

      return Object.assign({}, state, { sampleText: newSampleText });
    }

    case UPDATE_SEARCH_TERM: {
      if (action.searchTerm.length > 0) {
        // filter all fonts for those font names matching search term
        let newDisplayedFonts = state.fonts.filter(
          font => font.family.indexOf(action.searchTerm) > -1
        );

        // 32 fonts displayed at one time. if there are more than 32, there are moreFontsToLoad.
        let moreFontsToLoad = newDisplayedFonts.length > 32;
        newDisplayedFonts = newDisplayedFonts.slice(0, 32);

        return Object.assign({}, state, {
          searchTerm: action.searchTerm,
          displayedFonts: newDisplayedFonts,
          displayPosition: 32,
          moreFontsToLoad
        });
      } else {
        // if the user enters a search term, then deletes it, reset the displayed fonts to default settings.
        return Object.assign({}, state, {
          displayedFonts: state.fonts.slice(0, 32),
          displayPosition: 32,
          moreFontsToLoad: true,
          searchTerm: action.searchTerm
        });
      }
    }

    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, { user: action.user });

    case USER_LOGOUT:
      return Object.assign({}, state, { user: {} });

    default:
      return state;
  }
}
