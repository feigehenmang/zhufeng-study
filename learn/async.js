function a () {
    return new Promise((resolve,reject) => {
        resolve([1])
    })
}
(async () => {
    const result = await a()
    console.log(result)
})()