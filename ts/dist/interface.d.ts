export interface IAnimal {
    name: string;
    age: number;
}
export interface AnimalCtro {
    new (name: string, age: number): IAnimal;
}
export declare class Animal {
    name: string;
    age: number;
    constructor(name: string, age: number);
}
interface IAnimalFn {
    (ctro: AnimalCtro, name: string, age: number): IAnimal;
}
export declare function animalFactoryN(ctro: AnimalCtro, name: string, age: number): IAnimal;
export declare const animalFactory: IAnimalFn;
export {};
