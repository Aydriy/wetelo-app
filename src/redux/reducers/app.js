import {
  SET_DATAS,
  SET_LOADED,
  SET_ARIVAL,
  SET_DEPARTURE,
  RESET_DATAS,
} from "../types";

const initialState = {
  getAllDatas: [],
  getArrivel: [],
  getDeparture: [],
  setLoaded: true,
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DATAS:
      return initialState;
    case SET_DATAS:
      return {
        ...state,
        getAllDatas: [...state.getAllDatas, action.payload],
      };
    case SET_ARIVAL:
      return {
        ...state,
        getArrivel: state.getArrivel.concat(action.payload),
      };
    case SET_DEPARTURE:
      return {
        ...state,
        getDeparture: state.getDeparture.concat(action.payload),
      };
    case SET_LOADED:
      return {
        ...state,
        setLoaded: action.payload,
      };
    default:
      return state;
  }
};
