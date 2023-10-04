export type MathActionNames = 'plus' | 'minus' | 'multi' | 'devide'
export type ISimpleMathFunc = (a: number, b: number) => number


export type IActionData<T> = {
    args: T | T[]
    callback?: (...args: T[]) => unknown | null
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

export type GetCallBackType<T> = T extends (...args: any[]) => infer R ?
    {
        args: Parameters<T>
        fn: T
        output: R
    }
    : never
