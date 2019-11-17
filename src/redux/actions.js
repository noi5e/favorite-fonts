import axios from "axios";

import { REQUEST_FONTS, RECEIVE_FONTS } from "./actionTypes";

export const requestFonts = () => ({
  type: REQUEST_FONTS
});

export const receiveFonts = (fonts) => ({
  type: RECEIVE_FONTS,
  fonts
});

export const fetchFonts = () => {
  return async dispatch => {

    // this informs the app state that the API call is starting:
    dispatch(requestFonts);

    const result = await axios('/api/get_all_fonts');
    const firstEightFonts = result.data.slice(0,8);
    dispatch(receiveFonts(firstEightFonts));
  }
}
