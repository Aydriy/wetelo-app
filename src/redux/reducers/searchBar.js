import { SEARCH_BAR, RESET_DATAS_SEARCH, RESET_DATAS } from "../types";

const initialState = {
  items: [],
};

export const searchBar = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DATAS:
      return initialState;
    case RESET_DATAS_SEARCH:
      return initialState;
    case SEARCH_BAR: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    default:
      return state;
  }
};
