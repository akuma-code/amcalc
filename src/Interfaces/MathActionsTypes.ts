export type MathActionNames = 'plus' | 'minus' | 'multi' | 'devide'
export type ISimpleMathFunc = (a: number, b: number) => number
export type IActionData = {
    actionId: string
    cb: (...args: number[]) => number
    initValue?: number

}
