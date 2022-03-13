const middlewares = [
    async function (index, next) {
        console.log(index)
        await next()
        console.log(index)
    },
    async (v, next) =>{
        console.log(v)
        throw new Error('123')
        await next()
        console.log(v)
    },
    async (v, next) => {
        console.log(v)
        await next()
        console.log(v)
    }
]


function runMiddleWares(middlewares) {
    const dispatch = index => {
        if (index === middlewares.length) return Promise.resolve()
        // return Promise.resolve(middlewares[index](index, () => dispatch(++index)))
        return new Promise((resolve, reject) => {
            try {
                middlewares[index](index, () => dispatch(++index))
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    return dispatch(0)
}

runMiddleWares(middlewares).then(() => {
    console.log('end')
}).catch(err => {
    console.log(err)
})
