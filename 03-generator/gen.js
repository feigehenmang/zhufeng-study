const likeArray = {
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]() {
        let i = 0
        return {
            next: () => {
                while (i <= this.length) {
                    return {
                        value: this[i],
                        done: i++ === this.length
                    }
                }
            }
        }
    }
    // [Symbol.iterator]: function* () {
    //     let i = 0
    //     while (i <= this.length) {
    //         yield {
    //             value: this[i],
    //             done: i++ === this.length
    //         }
    //     }
    // }
}
console.log([...likeArray])

