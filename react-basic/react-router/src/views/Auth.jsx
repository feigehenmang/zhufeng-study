import React, { useLayoutEffect, useRef, useState } from "react";
let comp = null
export function getComp(rawComp) {
    if (comp) {
        return Promise.resolve(comp)
    }
    return new Promise(resolve => {
        
        setTimeout(() => {
            comp = rawComp
            resolve(comp)
        }, 3000)
    })
}
export function Auth({children, ...rest}) {
    const [Comp, setComp] = useState(<div>Loading</div>)
    useLayoutEffect(() => {
        getComp(React.cloneElement(children, rest)).then(
            setComp
        )
    }, [])
    return Comp
}