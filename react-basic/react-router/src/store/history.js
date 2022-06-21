import {createBrowserHistory} from 'history'
import { createReduxHistoryContext } from 'redux-first-history'

const history = createBrowserHistory()
const { routerReducer, routerMiddleware, createReduxHistory } = createReduxHistoryContext({history})
export {
    routerReducer,
    routerMiddleware,
    createBrowserHistory
}