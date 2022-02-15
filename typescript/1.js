// 基础类型 
var bol1 = false;
var str1 = '1';
var num1 = 1;
var arr1 = ['1'];
var arr2 = [1];
// ts独有类型
// 元组 已知长度和类型的数组
var tuple1 = ['1', 2];
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
var bol2 = false;
bol2 = null;
bol2 = undefined;
var Vue = /** @class */ (function () {
    function Vue() {
    }
    Vue.prototype.onMounted = function () {
    };
    Vue.prototype.onUpdated = function () {
    };
    return Vue;
}());
var UpdateVue = /** @class */ (function () {
    function UpdateVue() {
    }
    UpdateVue.prototype.onUpdated = function () {
    };
    return UpdateVue;
}());
