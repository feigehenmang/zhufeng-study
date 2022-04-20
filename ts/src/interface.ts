// interface 普通对象写法
export interface IAnimal {
    name: string;
    age: number;
}
// interface 构造函数写法
export interface AnimalCtro {
    new(name: string, age: number): IAnimal
}
export class Animal {
    constructor(public name: string, public age: number) { }
}
// interface 函数写法 需要作用于const let 函数
interface IAnimalFn {
    (ctro: AnimalCtro, name: string, age: number): IAnimal
}
export function animalFactoryN(ctro: AnimalCtro, name: string, age: number) {
    return new ctro(name, age)
}
export const animalFactory: IAnimalFn = (ctro: AnimalCtro, name: string, age: number) => {
    return new ctro(name, age)
}
