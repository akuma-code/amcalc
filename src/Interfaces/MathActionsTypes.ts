export type MathActionNames = 'plus' | 'minus' | 'multi' | 'devide'
export type ISimpleMathFunc = (a: number, b: number) => number
export type AnyFN = (...args: any) => any

export type IActionData<T> = {
    args: T | T[]
    callback?: (...args: T[]) => {}
    output?: (...args: any[]) => string | string
    description?: string
}

export interface IActionCore<T> {
    callback: (data: T) => any
    vars: {
        keys: string
        initValue?: number
    }[]
}

export type IActionDataNode<R> = {
    vars: string[]
    actionCb: <T>(...args: T[]) => R
    output?: (...args: any[]) => string
    desc?: string
}

export type DTO_ExportFnType<Fn> = Fn extends (args: (infer ArgType)) => infer R ?
    {
        Fn: Fn
        args: ArgType
        output?: R

    }
    : never


export type DTO_FunctionType<T> = T extends (...args: (infer Args)[]) => any ? {
    args: Args
    fn: T
} : never

export type DTO_StoreObj<F> = Partial<DTO_ExportFnType<F>>
// F extends (...args: (infer A)[]) => infer R ? {
//     fn?: F
//     args?: A
//     result?: R
// } : never
type AloneTuple<Arr extends any[]> = Arr extends [infer R] ? R : Arr
export type DTO_FnArgs<Fn extends (...args: any) => any> = Fn extends (...args: (infer A)[]) => any ? A : Parameters<Fn>
export type DTO_ArrayType<T> = T extends (infer A)[] ? A : never


export type DTO_ActionItem<Fn extends AnyFN> = Fn extends infer F ?
    F extends (...args: infer Args) => infer R ?
    {
        fn: F
        args: AloneTuple<Args>[]
        output: R
    }
    : never
    : never

const aa = (dd: { a: number, b: string, aaaa: string }) => 3

type dto = DTO_ActionItem<typeof aa>
const aaa: dto = {
    fn: aa,
    args: [{ a: 2, aaaa: '23', b: '23' }],
    output: 3
}