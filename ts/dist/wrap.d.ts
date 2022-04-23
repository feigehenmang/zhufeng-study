declare type IProxy<T> = {
    get(): T;
    set(v: T): boolean;
};
declare type IProxify<T> = {
    [k in keyof T]: IProxy<T[k]>;
};
export declare function proxify<T>(obj: T): IProxify<T>;
export {};
