import {
  DISLIKE_FONT,
  FETCH_DISPLAY_FONTS,
  LIKE_FONT,
  LOAD_ALL_FONTS,
  LOAD_FAVORITE_FONTS,
  REQUEST_FONTS,
  RECEIVE_FONTS,
  RESET_FONT_OPTIONS,
  UPDATE_FAVES,
  UPDATE_FONT_SIZE,
  UPDATE_SAMPLE_TEXT,
  UPDATE_SEARCH_TERM,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "./actionTypes";

export const dislikeFont = font => ({
  type: DISLIKE_FONT,
  font
});

export const fetchDisplayFonts = () => ({
  type: FETCH_DISPLAY_FONTS
});

export const likeFont = font => ({
  type: LIKE_FONT,
  font
});

export const loadAllFonts = () => ({
  type: LOAD_ALL_FONTS
});

export const loadFavoriteFonts = () => ({
  type: LOAD_FAVORITE_FONTS
});

export const requestFonts = () => ({
  type: REQUEST_FONTS
});

export const receiveFonts = fonts => ({
  type: RECEIVE_FONTS,
  fonts
});

export const resetFontOptions = () => ({
  type: RESET_FONT_OPTIONS
});

export const updateFaves = faves => ({
  type: UPDATE_FAVES,
  faves
});

export const updateFontSize = size => ({
  type: UPDATE_FONT_SIZE,
  size
});

export const updateSampleText = text => ({
  type: UPDATE_SAMPLE_TEXT,
  text
});

export const updateSearchTerm = searchTerm => ({
  type: UPDATE_SEARCH_TERM,
  searchTerm
});

export const userLoginSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  user
});

export const userLogout = () => ({
  type: USER_LOGOUT
});
