import { createStore, combineReducers } from "redux";
import reducer from "./reducer";

const combinedReducer =
  typeof reducer === "function" ? reducer : combineReducers(reducer);
export default createStore(combinedReducer);
