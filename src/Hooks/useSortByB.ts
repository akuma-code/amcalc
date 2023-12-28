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
type SillItem = {
    id: string
    L: number
    B: number
    count: number
}

type SortedSills<T> = [T[]]

const findNext = (B: number) => [...STEPS].reduceRight((nextStep, current) => {
    if (B <= current) return current
    else return nextStep
}, 0)
const findPrev = (B: number) => [...STEPS].reduce((nextStep, current) => {
    if (B >= current) return current
    else return nextStep
}, 0)


type SortedResult = Brand<A_Sill, { sill_step: number }>
export function SortSillBy_B(group_data: A_Sill[]) {
    const updated = group_data.map(d => ({ ...d, step_sill: findNext(d.B) }))
    const active_steps = Array.from(new Set([...updated].map(d => d.step_sill)))

    const result = active_steps.map((r) => {
        const find = updated.filter(d => d.step_sill === r)
        if (find) return find
        return []
    })
    const arrr = result.map(steparr => steparr.map(({ step_sill, ...rest }) => ({ step_sill, data: rest })))
    const mapped = group_data.map(d => ({ ...d, sill_step: findNext(d.B) })).sort(((a, b) => a.sill_step - b.sill_step))
    return { row: result, sorted: arrr, mapped }


}

const test = [
    new A_Sill(1100, 155),
    new A_Sill(900, 120),
    new A_Sill(2600, 280),
    new A_Sill(800, 145),
]

const r = SortSillBy_B(test)
console.log('r', r)


_log("prev:", findPrev(160), "next:", findNext(160), "B: ", 160)