export type ICalcTemplate = {
    inputs: string[]
    callback: (...args: any[]) => {}
    output: (...args: any[]) => string

}

export const SquareCalcTemplate: ICalcTemplate = {
    inputs: ['width', 'height'],
    callback: (w: number, h: number) => w * h,
    output: (result: number) => {
        const msg = `Вычисленная площадь = ${result}`
        return msg
    }
}

export const SumCalcTemplate: ICalcTemplate = {
    inputs: ['a', 'b'],
    callback: (a: number, b: number) => a + b,
    output: (a: number, b: number, sum: number,) => `Вычисленная сумма чисел ${a} и ${b} = ${sum}`
}

