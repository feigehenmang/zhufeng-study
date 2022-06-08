const obj = {
  name: "test",
  getName() {
    return this.name;
  },
  getName2: function () {
    return this.name;
  },
};
console.log(obj.getName);
console.log(obj.getName2);
export {};
