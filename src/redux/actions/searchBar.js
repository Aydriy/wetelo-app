import { SEARCH_BAR, RESET_DATAS_SEARCH } from "../types";
import { setLoaded } from "./app";

export const setSearchBar = (items) => ({
  type: SEARCH_BAR,
  payload: items,
});
export const setResetDatas = (items) => ({
  type: RESET_DATAS_SEARCH,
  payload: items,
});

export const searchBars = (item) => (dispatch) => {
  dispatch(setResetDatas());
  dispatch(setSearchBar(item));
  dispatch(setLoaded(false));
};
