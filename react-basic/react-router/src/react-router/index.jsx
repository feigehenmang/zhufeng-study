import React, { useContext, useMemo, Children, useCallback } from "react";
import { NavigationContext, LocationContext } from "./context";

export function Router({ children, navigator, location }) {
    const navigatorContext = useMemo(() => ({ navigator }), [navigator])
    const locationContext = useMemo(() => ({location}), [location])
    return <NavigationContext.Provider value={navigatorContext}>
        <LocationContext.Provider value={locationContext}>
            {children}
        </LocationContext.Provider>
    </NavigationContext.Provider>
}
export function useLocation() {
    const { location } = useContext(LocationContext)
    return location
}
export function useNavigate() {
    const { navigator } = useContext(NavigationContext)
    const navigate = useCallback(
        (to) => {
            navigator.push(to)
        },
        [navigator],
    )
    return navigate
}
export function Routes({ children }) {
    return useRoutes(createRoutesFormChildren(children))
}

export function useRoutes(routes) {
    const location = useLocation()
    // 根据location匹配
    const pathname = location.pathname || '/'
    for (let i = 0; i < routes.length; i++) {
        const { path, element} = routes[i]
        let match = matchPath(path, pathname)
        if (match) {
            return element
        }
    }
    return null

}
// 解析Routes的children 
export function createRoutesFormChildren(children) {
    const routes = []
    Children.forEach(children, child => {
        let route = {
            path: child.props.path, // Route 传入的props
            element: child.props.element
        }
        routes.push(route)
    })
    return routes
}

export function Route() { }

function compilePath(path) {
    const paramNames = []
    let regexp = '^' + path.replace(/:(\w+)/g, (_, key) => {
        paramNames.push(key)
        return "([^\\/]+)"
    })
    regexp += '$'
    return [new RegExp(regexp), paramNames]
}
export function matchPath(path, pathname) {
    let [matcher, paramNames] = compilePath(path)
    let match = pathname.match(matcher)
    if (!match) return null
    let matchedPathname = match[0]
    let values = match.slice(1)
    let params = paramNames.reduce((memo, name, index) => {
        memo[name] = values[index]
    }, {})
    return {params, pathname: matchedPathname, path}
}