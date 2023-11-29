import { _log } from "../../Helpers/HelpersFns";
import { IDataTransferObject } from "../../Models/DTO_ChainStore";
import { IC_DataList } from "../ActionTypes/Types";



function* G_StateSelector(dto: IDataTransferObject) {

    const { type } = dto
    type RType = typeof type
    const TypeObject: IC_DataList[keyof IC_DataList] = yield dto as IC_DataList[RType]
    if (type === 'nets') {
        yield TypeObject as IC_DataList['nets']
    }
    if (type === 'offset5') {
        yield TypeObject as IC_DataList['nets']
    }
    _log("Type not defined")
    return null
}


export function WrapIter<T extends IC_DataList[keyof IC_DataList]>(iterator: Iterator<T, IDataTransferObject, IC_DataList[keyof IC_DataList]>) {
    let res = iterator.next()

    while (!res.done) {
        if (res.value === null || res.value === undefined) {
            return null
        }
        res = iterator.next(res.value)
    }

    return res.value
}

