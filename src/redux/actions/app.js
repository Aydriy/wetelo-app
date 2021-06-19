import {
  SET_DATAS,
  SET_LOADED,
  SET_ARIVAL,
  SET_DEPARTURE,
  RESET_DATAS,
} from "../types";
import axios from "axios";

export const setLoaded = (payload) => ({
  type: SET_LOADED,
  payload: payload,
});
export const getAllDatas = (items) => ({
  type: SET_DATAS,
  payload: items,
});
export const setArrival = (items) => ({
  type: SET_ARIVAL,
  payload: items,
});
export const setDeparture = (items) => ({
  type: SET_DEPARTURE,
  payload: items,
});
export const setResetDatas = (items) => ({
  type: RESET_DATAS,
  payload: items,
});

export const fetchDatas = (date) => (dispatch) => {
  async function fetchDataList() {
    try {
      dispatch(setResetDatas());
      dispatch(setLoaded(true));
      const response = await axios(`https://api.iev.aero/api/flights/${date}`);
      dispatch(getAllDatas(response.data.body));
      dispatch(setArrival(response.data.body.arrival));
      dispatch(setDeparture(response.data.body.departure));
      dispatch(setLoaded(false));
    } catch (error) {
      dispatch(setLoaded(null));
      console.log(`error`, error);
    }
  }

  fetchDataList();
};

// export function fetchDatas(date) {
//   return async (dispatch) => {
//     try {
//       dispatch({
//         type: SET_LOADED,
//         payload: true,
//       });
//       const response = await axios(`https://api.iev.aero/api/flights/${date}`);
//       dispatch(getAllDatas(response.data.body));
//       dispatch(setArrival(response.data.body.arrival));
//       dispatch(setDeparture(response.data.body.departure));
//       dispatch({
//         type: SET_LOADED,
//         payload: false,
//       });
//     } catch (error) {
//       dispatch({
//         type: SET_LOADED,
//         payload: null,
//       });
//       console.log(`error`, error);
//     }
//   };
// }
