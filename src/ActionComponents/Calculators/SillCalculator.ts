import { toJS } from "mobx"
import { _log } from "../../Helpers/HelpersFns"
import { A_Sill } from "../../Interfaces/CommonTypes"


export function isEqualSills<T extends { L: number, B: number }>(s1: T, s2: T) {
    if (s1.L === s2.L && s1.B === s2.B) return true
    else return false
}

function isSameSills<T extends A_Sill>(group: T[]) {
    const [first, ...rest] = group
    const condition = rest.every(r => isEqualSills(r, first))

    return condition
}

export function sumCounters<T extends A_Sill>(group: T[]) {
    if (isSameSills(group)) {
        const res = group.reduce((prev, curr) => {

            if (!prev.count) return prev = curr

            // prev.count += curr.count
            joinSills(prev, curr)
            return prev
        }, {} as T)
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

    sumCounters([
        new A_Sill(100, 10, 3),
        new A_Sill(100, 10, 7),
    ])

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