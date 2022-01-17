const stack = []
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)

while (stack.length) {
    const val = stack.pop()
    console.log(val)
}

console.log(stack)


