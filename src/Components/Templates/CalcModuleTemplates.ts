import { DTO_FunctionType } from "../../Interfaces/MathActionsTypes"
import { mbxDataNode } from "../../mobXStore/Stores"

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

export function getNetSize(width: number, height: number) {

    const net = {
        w: width + 24,
        h: height + 45
    }

    const scf = {
        w: width - 45,
        h: height - 47
    }

    return { net, scf } as const
}
type IActionRad2Deg = (rad: number) => { deg: number }
export type DTO_GetNetSize = DTO_FunctionType<typeof getNetSize>
export type DTO_R2D = DTO_FunctionType<IActionRad2Deg>






