declare type MergeValues<One, Other> = One extends Other ? One : Other extends unknown[] ? [One, ...Other] : [One, Other];
declare type MergeParam<OneParam, OtherParam> = {
    [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam ? Key extends keyof OtherParam ? MergeValues<OneParam[Key], OtherParam[Key]> : OneParam[Key] : Key extends keyof OtherParam ? OtherParam[Key] : never;
};
declare type ParseParam<T> = T extends `${infer Key}=${infer Value}` ? {
    [k in Key]: Value;
} : {};
declare type ParseQueryString<T> = T extends `${infer Param}&${infer Rest}` ? MergeParam<ParseParam<Param>, ParseQueryString<Rest>> : ParseParam<T>;
declare type obj1 = ParseParam<'a=1'>;
declare type obj3 = ParseParam<'b=1'>;
declare type obj2 = MergeParam<obj1, obj3>;
declare function parseQueryString<Str extends string>(queryStr: Str): ParseQueryString<Str>;
declare const res: MergeParam<{
    a: "1";
}, MergeParam<{
    b: "2";
}, {
    c: "3";
}>>;
