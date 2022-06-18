import { Router, useNavigate } from '../react-router'
import React, { useRef, useState, useLayoutEffect } from 'react'
import { createBrowserHistory, createHashHistory } from '../history'
export function BrowserRouter(props) {
    const historyRef = useRef()
    if (!historyRef.current) {
        historyRef.current = createBrowserHistory()
    }
    const history = historyRef.current
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    })
    useLayoutEffect(() => {
        history.listen((...args) => {
            console.log('change', history, args)
            setState(...args)
        })
    }, [history])
    return <Router children={props.children} location={state.location}
        navigationType={state.action}
        navigator={history} />
}

export function HashRouter(props) {
    const historyRef = useRef();
    if (!historyRef.current) {
        historyRef.current = createHashHistory()
    }
    const history = historyRef.current
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    })
    useLayoutEffect(() => history.listen(setState), [history])
    return <Router children={props.children} location={state.location}
        navigationType={state.action}
        navigator={history} />
}


export function Link({ to, children, ...rest }) {
    const navigate = useNavigate()
    const handleClick = ev => {
        ev.preventDefault()
        navigate(to)
    }
    return <a {...rest} href={to} onClick={handleClick}>{ children }</a>
}

export * from '../react-router'