import { toJS } from "mobx"
import { _ID, _log } from "../../Helpers/HelpersFns"
import { A_Sill } from "../../Interfaces/CommonTypes"
import { ANYfn, ANYobj } from "../../Interfaces/MathActionsTypes"
import { findNextStep } from "../../Hooks/useSortByB"
import { useState } from "react"
import { ArgsTypes } from "../../Models/ArgsTypeModel"

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

// const proppedSills = (gr: A_Sill[]) => gr.map(s => addProp(s, { _id: _ID(), _step: findNextStep(s.B) }))
// _log(...proppedSills(fakegroup))
export function isEqualSills<T extends { L: number, B: number }>(s1: T, s2: T) { return (s1.L === s2.L && s1.B === s2.B) }
const _equal = <T extends CompareType>(a: T, b: T) => SillComparator.compareStrict(a, b)


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



export function joinSills<T extends { L: number, B: number, count: number }>(...equal_sills: T[]) {

    return equal_sills.reduce((p, c) => {

        return {
            ...p,
            L: p.L < c.L ? c.L : p.L,
            B: p.B < c.B ? c.B : p.B,
            count: p.count += c.count,
        }


    })
}
const StrictEqualCondition = <T extends { L: number, B: number }>(a: T, b: T) => (a.L === b.L && a.B === b.B)
const consumeCount = (...sills: A_Sill[]) => sills.reduce((prev, curr) => ({ ...prev, count: prev.count += curr.count }))
export const sumCount = <T extends { count: number }>(array: T[]) => array.reduce((prev, curr) => { return prev += curr.count }, 0)
function consumeNext(...sills: A_Sill[]) {
    const [first, second, ...rest] = sills
    let _temp: any;
    const result = []
    if (isEqualSills(first, second)) _temp = [first, second].reduce((prev, curr) => ({ ...prev, count: prev.count += curr.count }))
    if (!rest) {
        result.push(_temp)
        return result
    }

    if (rest.length > 0) return consumeNext(...rest)
    return [first, second].reduce((prev, curr) => ({ ...prev, count: prev.count += curr.count }))
}
export function mergeSills<T extends A_Sill>(group_data?: T[]) {
    if (!group_data) return []
    const copy = group_data.slice()
    console.log('group_data', copy)
    const AllCount = sumCount(group_data)
    console.log('AllCount', AllCount)
    const result: A_Sill[] = []

    copy.map(d => {
        const hasEq = (item: A_Sill) => _equal(d, item)
        if (result.length === 0) return result.push(d)
        if (result.some(hasEq)) {
            result.map(r => _equal(r, d) ? { ...r, count: r.count += d.count } : r)
            _log("proxy: ", result)
            return result
        }
        else {
            result.push(d)
            _log("proxy: ", result)
            return result
        }
    })
    console.log('result', sortByField(result, 'L'))
    // const bSet = new Set(group_data.map(d => d.B))
    // const Barray = Array.from(bSet.values())

    // const _groups = Barray.map(b => group_data.filter(d => d.B === b))

    return result





}

export function sortByField<T, P extends keyof T>(array: T[], numberField: P): T[] {
    return array.sort((a, b) => +a[numberField] - (+b[numberField]))
}

export const sill_tag = (sill: A_Sill): A_Sill & { _step: number, _id: string } => {
    const _id = _ID()
    const _step = findNextStep(sill.B)
    return addProp(sill, { _step, _id })
}

export type TaggedSill = A_Sill & { _step: number; _id: string }
export type IMakeSillGroupReturn = ReturnType<typeof MakeSillGroups>
export type ISillGroup = {
    matchIds: string[];
    _mergePossible: boolean;
    argType: ArgsTypes;
    L: number;
    B: number;
    count: number;
    _step: number;
    _id: string
}
/**
 * @function создает DTO для данных из стора типа Sill
 */
export function MakeSillGroups<T extends A_Sill>(group: T[]) {

    const init = sortByField(group.map(sill_tag), 'L')
    const sortStepInit = sortByField(init, '_step')
    // _log(sortStepInit.map(Object.values))
    const active_steps = Array.from(new Set(sortStepInit.map(i => i._step)))

    const stepGroups = active_steps.map(s => sortStepInit.filter(i => i._step === s))
    const wi = stepGroups.map(gr => gr.map(s => (
        {
            ...s,
            matchIds: findMatchIds(gr, s),
            _mergePossible: findMatchIds(gr, s).length > 1 ? true : false
        }
    ))

    )



    // console.log('groups: ', wi)
    return wi
}



/**
 * @function 
 * __Фильтрует группу по равнозначности елементу current
 * @returns  id:string []
 */
export function findMatchIds(group: TaggedSill[], current: TaggedSill): string[] {
    const res = group.filter(ss => SillComparator.compareStrict(current, ss))
        .map(i => i._id)
    // .filter(r => r !== current._id)
    return res
}
type CompareType = { L: number, B: number }
class SillComparator {
    static compareStrict<T extends CompareType>(...args: [T, T]) {
        const [s1, s2] = args
        const l1 = s1.L
        const l2 = s2.L
        const b1 = s1.B
        const b2 = s2.B
        const [dl, db] = [l1 - l2, b1 - b2]
        return dl === 0 && db === 0
    }
}

// {
//     const updateGrp = (group: typeof wi[number]) => {
//         const match = group.map(i => i.matchIds.length > 1 && i.matchIds).filter(i => typeof i != 'boolean')
//         const sills = group.map(g => ({ L: g.L, B: g.B, count: g.count, _id: g._id, _step: g._step }))
//         const res = { sills, match }

//         // console.log('match', match)
//         return res
//     }


//     const u = wi.map(updateGrp).map(f => f.match)}