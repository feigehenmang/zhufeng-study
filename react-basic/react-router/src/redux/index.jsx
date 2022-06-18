export function createStore(reducer) {
    let state = {}
    let callbacks = []
    function dispatch(action) {
        state = reducer(action)
        callbacks.forEach(callback => callback())
        return action
    }
    function subscribe(callback) {
        callbacks.push(callback)
        return () => {
            callbacks = callbacks.filter(fn => fn === callback)
        }
    }
    function getState() {
        return state
    }

    dispatch({type: 'INIT'})
    return {
        dispatch,
        subscribe,
        getState
    }
}