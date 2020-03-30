import {
  DISLIKE_FONT,
  DISPLAY_MORE_FONTS,
  HIDE_PAGE_UP_BUTTON,
  LIKE_FONT,
  LOAD_ALL_FONTS,
  LOAD_FAVORITE_FONTS,
  RECEIVE_FONTS,
  REQUEST_FONTS,
  RESET_FONT_OPTIONS,
  SHOW_PAGE_UP_BUTTON,
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
  moreFontsToDisplay: true,
  pageUpButtonIsVisible: false,
  sampleText: "The quick brown fox jumped over the lazy dog.",
  searchMatchesFonts: true,
  searchTerm: "",
  user: {},
  userHasEnteredSampleText: false,
  viewingFavorites: false
};

// helper function for generating displayed fonts (app displays 32 fonts to begin with, then loads more)
const getDisplayState = (searchTerm, fonts) => {
  if (searchTerm.length > 0) {
    // filter all fonts for those font names matching search term
    let matchingFonts = fonts.filter(
      font => font.family.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );

    let searchMatchesFonts = matchingFonts.length > 0;

    // app displays 32 fonts at one time. if there are more than 32 matching fonts, then flags this var as true
    let moreFontsToDisplay = matchingFonts.length > 32;

    return {
      displayedFonts: matchingFonts.slice(0, 32),
      displayPosition: 32,
      moreFontsToDisplay,
      searchMatchesFonts,
      searchTerm
    };
  } else {
    // handles case for when user deletes the searchTerm (resets displayedFonts to default, ie. all fonts)
    return {
      displayedFonts: fonts.slice(0, 32),
      displayPosition: 32,
      moreFontsToDisplay: fonts.length > 32,
      searchMatchesFonts: true,
      searchTerm
    };
  }
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

    // if the user scrolls to the bottom of the page, this action fetches more fonts
    case DISPLAY_MORE_FONTS: {
      if (state.searchTerm.length > 0) {
        // if there's a search term entered, we need to load from the fonts matching search term, NOT all fonts.
        let newDisplayedFonts = state.fonts.filter(
          font =>
            font.family.toLowerCase().indexOf(state.searchTerm.toLowerCase()) >
            -1
        );

        let moreFontsToDisplay =
          state.displayPosition + 30 < newDisplayedFonts.length;
        newDisplayedFonts = newDisplayedFonts.slice(
          state.displayPosition,
          state.displayPosition + 30
        );

        return Object.assign({}, state, {
          displayPosition: state.displayPosition + 30,
          displayedFonts: state.displayedFonts.concat(newDisplayedFonts),
          moreFontsToDisplay
        });
      } else {
        // if there's no search term entered, load new fonts straight from all fonts
        const loadedFonts = state.fonts.slice(
          state.displayPosition,
          state.displayPosition + 30
        );

        return Object.assign({}, state, {
          displayPosition: state.displayPosition + 30,
          displayedFonts: state.displayedFonts.concat(loadedFonts),
          moreFontsToDisplay: state.displayPosition + 30 < state.fonts.length
        });
      }
    }

    case HIDE_PAGE_UP_BUTTON:
      return Object.assign({}, state, {
        pageUpButtonIsVisible: false
      });

    // if the user navigates to All Fonts, this action resets the displayed fonts
    case LOAD_ALL_FONTS: {
      if (state.searchTerm.length > 0) {
        const {
          displayedFonts,
          displayPosition,
          moreFontsToDisplay,
          searchMatchesFonts
        } = getDisplayState(state.searchTerm, state.fonts);

        return Object.assign({}, state, {
          displayedFonts,
          displayPosition,
          moreFontsToDisplay,
          searchMatchesFonts,
          viewingFavorites: false
        });
      } else {
        return Object.assign({}, state, {
          displayedFonts: state.fonts.slice(0, 32),
          displayPosition: 32,
          moreFontsToDisplay: true,
          searchMatchesFonts: true,
          viewingFavorites: false
        });
      }
    }

    // if the user navigates to their Favorite Fonts, this action resets the displayed fonts
    case LOAD_FAVORITE_FONTS: {
      if (state.searchTerm.length > 0) {
        const favoriteFonts = state.fonts.filter(font => font.liked);

        const {
          displayedFonts,
          displayPosition,
          moreFontsToDisplay,
          searchMatchesFonts
        } = getDisplayState(state.searchTerm, favoriteFonts);

        return Object.assign({}, state, {
          displayedFonts,
          displayPosition,
          moreFontsToDisplay,
          searchMatchesFonts,
          viewingFavorites: true
        });
      } else {
        const favoriteFonts = state.fonts.filter(font => font.liked);

        const {
          displayedFonts,
          displayPosition,
          moreFontsToDisplay
        } = getDisplayState("", favoriteFonts);

        return Object.assign({}, state, {
          displayedFonts,
          displayPosition,
          moreFontsToDisplay,
          searchMatchesFonts: true,
          viewingFavorites: true
        });
      }
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

    case RESET_FONT_OPTIONS: {
      const fonts = state.viewingFavorites
        ? state.fonts.filter(font => font.liked)
        : state.fonts;

      return Object.assign(
        {},
        state,
        {
          searchTerm: "",
          sampleText: "The quick brown fox jumped over the lazy dog.",
          fontSize: "40px"
        },
        getDisplayState("", fonts)
      );
    }

    case SHOW_PAGE_UP_BUTTON:
      return Object.assign({}, state, {
        pageUpButtonIsVisible: true
      });

    // this action updates the list of all fonts, so that it accurately represents user's faves
    //   ie. the heart button on each font card is accurately filled in (or not)
    case UPDATE_FAVES: {
      const modifiedFonts = [...state.fonts];

      for (let i = 0; i < modifiedFonts.length; i++) {
        let notAFave = true;

        for (let j = 0; j < action.faves.length; j++) {
          if (action.faves[j].family === modifiedFonts[i].family) {
            notAFave = false;
          }

          if (j === action.faves.length - 1 && notAFave) {
            modifiedFonts[i].liked = false;
          } else {
            modifiedFonts[i].liked = true;
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

      return Object.assign({}, state, {
        sampleText: newSampleText,
        userHasEnteredSampleText: action.text.length > 0
      });
    }

    case UPDATE_SEARCH_TERM: {
      let fonts = state.viewingFavorites
        ? state.fonts.filter(font => font.liked)
        : state.fonts;

      return Object.assign(
        {},
        state,
        getDisplayState(action.searchTerm, fonts)
      );
    }

    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, { user: action.user });

    case USER_LOGOUT:
      return Object.assign({}, state, { user: {} });

    default:
      return state;
  }
}
