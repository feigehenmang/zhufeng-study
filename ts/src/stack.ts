function isValidStr(str: string) {
    const pushMap: Record<string, string> = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    const pushTags = Object.keys(pushMap)
    const popTags = Object.values(pushMap)

    let stack: string[] = []

    for (let i = 0; i < str.length; i++) {
        let v = str[i]
        if (pushTags.includes(v)) {
            stack.push(v)
        } else if (popTags.includes(v)) {
            let popStr = stack.pop()
            if (!popStr || (popStr && pushMap[popStr] !== v)) {
                return false
            }
        }
    }
    // console.log(stack)
    return stack.length > 0 ? false : true
}

// console.log(isValidStr('()()()(()((aaa))'))


// 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。

function sortTemperature(temperatures: number[]) {
    let stack = [], result = new Array(temperatures.length).fill(0)
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            let v = stack.pop()
            if (v as number >= 0) {
                result[v as number] = i - (v as number)
            }
        }
        stack.push(i)
    }
    return result
}
// console.log(sortTemperature2([73, 74, 75, 71, 69, 72, 76, 73]))



function sortTemperature2(temperatures: number[]) {
    let stack: number[] = [], result: number[] = new Array(temperatures.length).fill(0)
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            let v = stack.pop()
            if (v as number >= 0) {
                result[v as number] = i - (v as number)
            }
        }
        stack.push(i)
    }
    return result
}


// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
// pop() —— 删除栈顶的元素。
// top() —— 获取栈顶元素。
// getMin() —— 检索栈中的最小元素。



export class MinStack {
    private stack: any[] = []
    private minStack: any[] = []
    constructor() { }
    push(v: any) {
        this.stack.push(v)
        if (!this.minStack.length || (this.minStack[this.minStack.length - 1] > v)) {
            this.minStack.push(v)
        }
        // this.stackOrder.push(v)
        // this.stackOrder.sort((a,b) => a-b)
    }
    getMin() {
        return this.minStack[this.minStack.length - 1]
        // let result = Infinity
        // for (let i = 0; i < this.stack.length; i++) {
        //     if (result > this.stack[i]) {
        //         result = this.stack[i]
        //     }
        // }
        // return result

        // return this.stackOrder[0]
        // const copyStack = [...this.stack]
        // return copyStack.sort((a, b) => a - b)[0]
    }
    pop() {
        const v = this.stack.pop()
        if(v === this.getMin()) {
            this.minStack.pop()
        }
        return v
    }
    top() {
        return this.stack[this.stack.length - 1]
    }
}
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); //--> 返回 -3.
minStack.pop();
console.log(minStack.top()); //--> 返回 0.
console.log(minStack.getMin()); //--> 返回 -2.

export { }