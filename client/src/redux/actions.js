import axios from "axios";

import {
  DISLIKE_FONT,
  LIKE_FONT,
  REQUEST_FONTS,
  RECEIVE_FONTS,
  UPDATE_FAVES,
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

export const fetchFonts = () => {
  return async dispatch => {
    // this informs the app state that the API call is starting:
    dispatch(requestFonts);

    const result = await axios("/api/get_all_fonts");
    const firstEightFonts = result.data.slice(0, 8);
    dispatch(receiveFonts(firstEightFonts));
  };
};
