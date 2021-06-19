import { combineReducers } from "redux";
import { app } from "./reducers/app";
import { main } from "./reducers/main";
import { searchBar } from "./reducers/searchBar";

const rootReducer = combineReducers({
  app: app,
  main: main,
  searchBar: searchBar,
});

export default rootReducer;
