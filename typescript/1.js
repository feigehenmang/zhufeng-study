"use strict";
// 基础类型 
const bol1 = false;
const str1 = '1';
const num1 = 1;
const arr1 = ['1'];
const arr2 = [1];
// ts独有类型
// 元组 已知长度和类型的数组
const tuple1 = ['1', 2];
// 枚举
// 正常枚举
var Sex;
(function (Sex) {
    Sex[Sex["Boy"] = 0] = "Boy";
    Sex[Sex["Girl"] = 1] = "Girl";
})(Sex || (Sex = {}));
function logSex(sex) {
    console.log(sex);
}
logSex(Sex.Boy);
logSex(0 /* Boy */);
// any 任意类型
// null undefined
let bol2 = false;
bol2 = null;
bol2 = undefined;
