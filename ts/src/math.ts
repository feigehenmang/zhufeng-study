// 计算
// 构造一个元组，类型和元组长度由外部传入
type BuildTuple<NUM extends number, Type extends any, Result extends unknown[] = []> = Result['length'] extends NUM ? Result : BuildTuple<NUM, Type, [...Result, Type]>
type Tuple5 = BuildTuple<5, string> // [string, string, string, string, string]
// Add
type Add<T extends number, K extends number> = [...BuildTuple<T, unknown>, ...BuildTuple<K, unknown>]['length']

type count1 = Add<3, 6>  // 9

type Subtract<T extends number, K extends number> = BuildTuple<T, unknown> extends [...BuildTuple<K, unknown>, ...infer Args] ? Args['length'] : never

type count2 = Subtract<100, 1> // 99

type Mutiply<T extends number, K extends number, Result extends unknown[] = []> = K extends 0 ? Result['length']: Mutiply<T, Subtract<K ,1>, [...BuildTuple<T, unknown>, ...Result]>

type count3 = Mutiply<3, 5>  // 15

type Divide<T extends number, K extends number, Result extends unknown[] = []> = T extends 0 ? Result['length'] : Divide<Subtract<T, K>, K, [...Result, T]>

type count4 = Divide<30, 7> // never
type count5 = Divide<30, 6> // 5

type StrLength<T extends string, Result extends unknown[] = []> = T extends `${string}${infer OtherStr}` ? StrLength<OtherStr, [...Result, unknown]> : Result['length']

type strLength = StrLength<'test'>

// TODO 比较大小
// TODO 斐波那契数列
export {}