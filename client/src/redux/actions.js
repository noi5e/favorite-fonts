import {
  DISLIKE_FONT,
  LIKE_FONT,
  LOAD_DISPLAY_FONTS,
  REQUEST_FONTS,
  RECEIVE_FONTS,
  RESET_DISPLAYED_FONTS,
  UPDATE_FAVES,
  UPDATE_FONT_SIZE,
  UPDATE_SAMPLE_TEXT,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "./actionTypes";

export const dislikeFont = font => ({
  type: DISLIKE_FONT,
  font
});

export const likeFont = font => ({
  type: LIKE_FONT,
  font
});

export const loadDisplayFonts = () => ({
  type: LOAD_DISPLAY_FONTS
});

export const updateFaves = faves => ({
  type: UPDATE_FAVES,
  faves
});

export const userLoginSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  user
});

export const userLogout = () => ({
  type: USER_LOGOUT
});

export const requestFonts = () => ({
  type: REQUEST_FONTS
});

export const receiveFonts = fonts => ({
  type: RECEIVE_FONTS,
  fonts
});

export const resetDisplayedFonts = () => ({
  type: RESET_DISPLAYED_FONTS
});

export const updateFontSize = size => ({
  type: UPDATE_FONT_SIZE,
  size
});

export const updateSampleText = text => ({
  type: UPDATE_SAMPLE_TEXT,
  text
});
