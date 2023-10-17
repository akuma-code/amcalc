export type MathActionNames = 'plus' | 'minus' | 'multi' | 'devide'
export type ISimpleMathFunc = (a: number, b: number) => number


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

export type DTO_ExportFnType<Fn> = Fn extends (args: (infer A)) => infer R ?
    {
        Fn: Fn
        args?: A
        output?: R
    }
    : never


export type DTO_FunctionType<T> = T extends (...args: (infer Args)[]) => any ? {
    args: Args
    fn: T
} : never

export type DTO_StoreObj<F> = F extends (...args: (infer A)[]) => infer R ? {
    fn?: F
    args?: A
    result?: R
} : never

export type DTO_ActionItem<Fn extends (...args: any) => any> = Fn extends (...args: infer Args) => infer R ? {
    args: Args
    output: R
} : never
