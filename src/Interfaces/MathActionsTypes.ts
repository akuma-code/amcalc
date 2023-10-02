export type MathActionNames = 'plus' | 'minus' | 'multi' | 'devide'
export type ISimpleMathFunc = (a: number, b: number) => number


export type IActionData<T> = {
    args: T | T[]
    callback?: (...args: T[]) => unknown | null
    output?: (...args: any[]) => string | string
    description?: string
}

export type IActionDataNode = {
    vars: string[]
    actionCb: <T>(...args: T[]) => any
    output?: (...args: any[]) => string
    desc?: string
}