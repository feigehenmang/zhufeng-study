import { createStore, combineReducers, applyMiddleware } from "redux";
import { routerMiddleware, createBrowserHistory, routerReducer } from './history'
import reducer, {addReducer} from "./reducer";
addReducer('router', routerReducer)
const combinedReducer =
  typeof reducer === "function" ? reducer : combineReducers(reducer);
const store = applyMiddleware(routerMiddleware)(createStore)(combinedReducer);
export default store
export const history = createBrowserHistory(store)
