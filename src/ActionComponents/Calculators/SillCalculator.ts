import { toJS } from "mobx"
import { _ID, _log } from "../../Helpers/HelpersFns"
import { A_Sill } from "../../Interfaces/CommonTypes"
import { ANYfn, ANYobj } from "../../Interfaces/MathActionsTypes"
import { findNextStep } from "../../Hooks/useSortByB"

const fakegroup = [
    new A_Sill(500, 140, 2),
    new A_Sill(700, 160, 2),
    new A_Sill(700, 70, 2),
    new A_Sill(700, 70, 2),
    new A_Sill(500, 140, 2),
]
export function addProp<T, P extends ANYobj | ((item?: T) => ANYobj)>(item: T, props: P) {
    if (typeof props === 'function') {
        return { ...item, ...props(item) }
    } else {
        return { ...item, ...props }
    }
}

const proppedSills = (gr: A_Sill[]) => gr.map(s => addProp(s, { _id: _ID(), _step: findNextStep(s.B) }))
_log(...proppedSills(fakegroup))
export function isEqualSills<T extends { L: number, B: number }>(s1: T, s2: T) {
    if (s1.L === s2.L && s1.B === s2.B) return true
    else return false
}
const equal = (target: A_Sill) => (current: A_Sill) => isEqualSills(target, current)
function isSameSills<T extends A_Sill>(group: T[]) {
    const [first, ...rest] = group

    const _c = (item: T) => isEqualSills(item, first)
    const condition = rest.every(_c)

    return condition
}

export function sumCounters<T extends A_Sill>(group: T[]) {
    // const _f = [...group].reduce((prev, current) => ({ ...prev, count: prev.count += current.count }))
    // console.log('_f', _f)
    if (isSameSills(group)) {
        const res = group.reduce((prev, curr) => ({ ...prev, count: prev.count += curr.count }))

        console.log('group_sum', res)
        return res
    }
    else {
        _log("Invalid group")
        return group
    }
}



export function joinSills<T extends { L: number, B: number, count: number }>(s1: T, s2: T): T | undefined {

    if (isEqualSills(s1, s2)) return { ...s1, count: s1.count += s2.count }

    else {
        _log("Sills not equal!")
        return
    }

}

export function mergeSills(sills: A_Sill[]) {
    if (sills.length <= 1) return sills
    const arr = toJS(sills)
    const sorted = arr.sort((a, b) => a.L - b.L)
    sorted.sort((a, b) => a.B - b.B)

    const m = sorted.reduce((merged, current, idx, baseArr) => {
        if (merged.length === 0) merged.push(current)
        const f = baseArr.filter(s => isEqualSills(current, s))

        if (f.length > 1) {
            // console.log('f', f)
            let summary = f.reduce((sum, c) => {
                sum = { ...current, count: +c.count + sum.count }
                return sum
            }, {} as A_Sill)
            // console.log('summary', summary)
            merged.push(summary)
        }

        return merged
    }, [] as A_Sill[])
    // _log("sorted:", sorted)
    // _log("merged: ", m)
}