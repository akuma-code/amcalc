import { _log } from "../../Helpers/HelpersFns";
import { IDataTransferObject } from "../../Models/DTO_ChainStore";
import { IC_DataList } from "../ActionTypes/Types";


function WrapIter<T extends IC_DataList[keyof IC_DataList]>(iterator: Iterator<T, T, IC_DataList[keyof IC_DataList]>) {
    let res = iterator.next()

    while (!res.done) {
        if (res.value === null || res.value === undefined) {
            return null
        }
        res = iterator.next(res.value)
    }

    return res.value
}

export class StringsIterator<T extends string> {
    order: T[]
    counter: number = 0
    constructor(...strings: T[]) {
        this.order = strings
    }

    next() {
        const current = this.order[this.counter]
        this.counter++
        if (this.counter === this.order.length) this.counter = 0
        return current
    }
}
export class NumberIterator<T extends number, P extends { start: number, end: number, step: number }> {
    order: T[]
    counter: number = 0
    constructor(numbers: T[], params?: P) {
        this.order = numbers
    }

    next() {
        const current = this.order[this.counter]
        this.counter++
        if (this.counter === this.order.length) this.counter = 0
        return current
    }

    initParams(numbers: T[], params: P) {
        const { start, end, step } = params
        const steps = ~~(start - end) / step
    }
}


