console.log(Object.prototype.toString.call(""));
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined));
console.log(Object.prototype.toString.call(true));
// [object String]
// [object Array]
// [object Null]
// [object Undefined]
// [object Boolean]

let myExport = {};
Object.defineProperty(myExport, Symbol.toStringTag, {
  value: "Module",
});
console.log(Object.prototype.toString.call(myExport)); // [object Module]
