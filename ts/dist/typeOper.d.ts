export declare function getSchool(name: string, age: number, address: string): {
    name: string;
    age: number;
    address: string;
};
export declare class Person {
}
export declare type InstanceType1<T> = T extends new (...args: any[]) => infer R ? R : never;
