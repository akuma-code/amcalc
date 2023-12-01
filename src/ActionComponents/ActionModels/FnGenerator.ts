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

export class StringsIterator {
    order: string[]
    counter: number = 0
    constructor(...strings: string[]) {
        this.order = strings
    }

    next() {
        const current = this.order[this.counter]
        this.counter++
        if (this.counter === this.order.length) this.counter = 0
        return current
    }
}

