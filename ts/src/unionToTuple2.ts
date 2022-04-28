type UnionToInter<T> = (T extends T ? (x: T) => any : never) extends (x: infer R) => any ? R : never
type UnionToFunc<T> = UnionToInter<T extends T ? () => T : never>
type Union1 = UnionToFunc<'a'|'b'>
type UnionToTuple<T> = UnionToInter<T extends T ? () => T : never> extends (...args: unknown[]) => infer R ? [...UnionToTuple<Exclude<T, R>>, R]: [] 
type Union2 = UnionToTuple<'a'|'b'|'c'>

export {}