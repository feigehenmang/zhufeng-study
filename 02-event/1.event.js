Promise.resolve().then(() => {
    console.log(1);
    return new Promise(resolve => resolve(new Promise(resolve => resolve('k'))))
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(4);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
})

/*
    [1, 2, Promise.resolve(Promise.resolve('hello')), ]
    
*/