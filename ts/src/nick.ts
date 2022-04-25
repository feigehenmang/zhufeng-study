// 联合分散可简化
type union1 = 'a'|'b'|'c'
type UnionNick<T extends string> = T extends 'a' ? Uppercase<T> : T
type union2 = UnionNick<union1> // "b" | "c" | "A"
type union3 = `${union1}~~~` // "a~~~" | "b~~~" | "c~~~"
// _ 转 大写
type Camlcass<T extends string> = T extends `${infer left}_${infer center}${infer rest}` ? `${left}${Uppercase<center>}${Camlcass<rest>}` : T
type str1 = Camlcass<'aa_aa_aa'> // "aaAaAa"
// 数组大写
type CamlcassArr<T extends unknown> = T extends [infer First, ...infer Rest] ? [Camlcass<First&string>, ...CamlcassArr<Rest>] : T
type arr1 = CamlcassArr<['aa_aa_aa', 'bb_bb_bb', 'cc_cc_cc_cc']> // ["aaAaAa", "bbBbBb", "ccCcCcCc"]
// 联合类型大写
type UnionCamlcass<T extends string> = Camlcass<T>
type union4 = UnionCamlcass<'aa_aa_aa'|'bb_bb_bb'|'cc_cc_cc_cc'> // "aaAaAa" | "bbBbBb" | "ccCcCcCc"
type isUnion<T, B = T> = T extends T ? [B] extends [T] ? false : true : never
type union5 = isUnion<1|4> // true
// BEM block__element--modifier
type BemUnion<Block extends string, Element extends string[], Modifers extends string[]> = `${Block}__${Element[number]}--${Modifers[number]}`
type BemStr = BemUnion<'main', ['header', 'center', 'footer'], ['active', 'unActive', 'select']> // "main__header--active" | "main__header--unActive" | "main__header--select" | "main__center--active" | "main__center--unActive" | "main__center--select" | "main__footer--active" | "main__footer--unActive" | "main__footer--select"
type b<T> = T extends '1'|'2' ? true : false
type b2 = b<'1'>
type Exclude<T extends any, K> = T extends K ? never : T
type exclude1 = Exclude<'1'|'2'|'3', '1'>
type extract1 = Extract<'1'|'2'|'3', '1'>
type Comb<A extends string, B extends string> = A | B | `${A}${B}` | `${B}${A}`
type t2 = Comb<'A', 'B'> // "A" | "B" | "AB" | "BA"
type AllComb<A extends string, B extends string = A> = A extends A ? Comb<A, AllComb<Exclude<B, A>>> : never
type t3 = AllComb<'a'| 'b'| 'c'> // "a" | "b" | "c" | "bc" | "cb" | "ab" | "ac" | "abc" | "acb" | "ba" | "ca" | "bca" | "cba" | "bac" | "cab"
export {}