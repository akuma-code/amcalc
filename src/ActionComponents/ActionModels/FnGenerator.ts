import { _log } from "../../Helpers/HelpersFns";
import { IDataTransferObject } from "../../Models/DTO_ChainStore";
import { Enum_NodesAction, FnKeys, Fn_nets, IC_DataList, IC_FuncArgs } from "../ActionTypes/Types";
import { CalcNet } from "../Nets/CalcNetModel";
import CalcNet_DTO from "../Nets/CalcNetSize";
import Offset5_DTO from "../Offset5/Offset5";



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


// function getType<T extends {type:FnKeys}>(obj:T){
//     if(obj.type===type) return obj as T
// }

// while(true){
//     yield getType(obj)
// }


const test_node_n: IDataTransferObject = {
    "type": Enum_NodesAction.nets,
    "fields": [
        "width",
        "height"
    ] as unknown as keyof IC_FuncArgs[],
    "initState": {
        "width": 0,
        "height": 0
    },
    fn: CalcNet_DTO.fn
}
const test_node_o: IDataTransferObject = {
    "type": Enum_NodesAction.offset5,
    "fields": [
        "W",
        "H",
        "h",
        "da",
        "db"
    ] as unknown as keyof IC_FuncArgs[],
    "initState": {
        "W": 0,
        "H": 0,
        "h": 0,
        "da": 0,
        "db": 0
    },
    fn: Offset5_DTO.fn
}
