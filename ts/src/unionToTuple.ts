type UnionToInter<T> = (T extends T ? (x: T) => unknown : never) extends (x: infer R) => unknown ? R : never

type Union1 = UnionToInter<{name: string}|{age: number}>
type Union2<T> = UnionToInter<T extends T ? () => T : never>
type Union3 = Union2<'a'|'b'>
type Union4 = ReturnType<Union3>

type UnionToTuple<T> = UnionToInter<T extends T ? () => T : never> extends (...args: unknown[]) => infer R ? [...UnionToTuple<Exclude<T, R>>, R] : []

type Union5 = UnionToTuple<'a'|'b'|'c'|'d'>