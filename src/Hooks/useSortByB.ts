import { _log } from "../Helpers/HelpersFns"
import { A_Sill, Brand } from "../Interfaces/CommonTypes"

export const enum ESteps {
    STEP_70 = 70,
    STEP_110 = 110,
    STEP_150 = 150,
    STEP_190 = 190,
    STEP_230 = 230,
    STEP_270 = 270,
    STEP_330 = 330,
    STEP_370 = 370,

}
export const STEPS = [70, 110, 150, 190, 230, 270, 330, 370] as const

export const findNextStep = (B: number) => [...STEPS].reduceRight((next, current) => {
    if (B <= current) return current
    else return next
}, 0)
export const findPrevStep = (B: number) => [...STEPS].reduce((prev, current) => {
    if (B >= current) return current
    else return prev
}, 0)


export type SortSillVariants = 'B' | 'L' | 'Step'
export function useSortSills<T extends { B: number, L: number }>(group_data: T[], sort?: { type: SortSillVariants, asc: 'ASC' | 'DESC' }): (T & { sill_step: number })[] {
    const sort_items = applySillStep(group_data)

    if (sort) {
        switch (sort.type) {
            case "B": {
                return sort.asc === 'ASC' ? sort_items.sort((a, b) => a.B - b.B) :
                    sort_items.sort((a, b) => b.B - a.B)
            }
            case "L": {
                return sort.asc === 'ASC' ? sort_items.sort((a, b) => a.L - b.L) :
                    sort_items.sort((a, b) => b.L - a.L)
            }
            case "Step": {
                return sort.asc === 'ASC' ? sort_items.sort((a, b) => a.sill_step - b.sill_step) :
                    sort_items.sort((a, b) => b.sill_step - a.sill_step)
            }
            default: return sort_items.sort((a, b) => a.L - b.L)
        }
    } else
        return sort_items.sort((a, b) => a.L - b.L)

}


export function applySillStep<T extends { B: number }>(group_data: T[]) {
    const withStep = group_data.map(d => ({ ...d, sill_step: findNextStep(d.B) }))
    return withStep
}

// const test = [
//     new A_Sill(1100, 155),
//     new A_Sill(900, 120),
//     new A_Sill(2600, 280),
//     new A_Sill(800, 145),
// ]

// const r = SortSillBy_B(test)
// console.log('r', r)


// _log("prev:", findPrevStep(160), "next:", findNextStep(160), "B: ", 160)