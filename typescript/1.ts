// 基础类型 
const bol1: boolean = false
const str1: string = '1'
const num1: number = 1
const arr1: string[] = ['1']
const arr2: Array<number> = [1]
// ts独有类型
// 元组 已知长度和类型的数组
const tuple1: [string, number] = ['1', 2]
// 枚举
// 正常枚举
enum Sex {
    Boy,
    Girl
}
// 常量枚举
const enum Sex2 {
    Boy,
    Girl
}
function logSex(sex: Sex | Sex2) {
    console.log(sex)
}
logSex(Sex.Boy)
logSex(Sex2.Boy)
// any 任意类型
// null undefined
let bol2: boolean = false
bol2 = null
bol2 = undefined