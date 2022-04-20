export function validateTarget(t: never) {}
// never 代码完整性保护
export function select(name: number|string) {
    if(typeof name === 'number') {
        return name
    }
    else if(typeof name === 'string') {
        return name
    }
    validateTarget(name)
}