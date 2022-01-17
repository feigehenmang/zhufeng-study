const queue = []
queue.push(1)
queue.push(2)
queue.push(3)
queue.push(4)

while (queue.length) {
    const val = queue.shift()
    console.log(val)
}
console.log(queue)