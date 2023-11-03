import { IC_FuncArgs, Enum_NodesAction, DTO_EXPORT, IC_Functions, FnKeys } from "../ActionComponents/ActionTypes/Types";
import { _log } from "../Helpers/HelpersFns";
import { LinkedList, DataNode } from "./LinkedList";

export interface IDataTransferObject {
    fn: IC_Functions[FnKeys]
    type: Enum_NodesAction
    fields: keyof IC_FuncArgs[]
    initState: IC_FuncArgs
}

export class DTO_Node implements IDataTransferObject {
    public fn: IC_Functions[FnKeys]
    public type: Enum_NodesAction
    public fields: keyof IC_FuncArgs[]
    public initState: IC_FuncArgs
    constructor(
        dto: DTO_EXPORT,
        fn_type: Enum_NodesAction
    ) {
        this.fn = dto.fn
        this.type = fn_type
        this.fields = dto.fields
        this.initState = dto.initState
    }
}


//!_________________================_________________________
class FnLinkedList<Data extends IDataTransferObject> extends LinkedList<Data> {
    head: DataNode<Data> | null = null;


    fnSearch(comparator: (data: Data) => boolean) {
        const checkNext = (node: DataNode<Data>): Data['fn'] | null => {
            if (comparator(node.data)) {
                return node.data.fn;
            }
            return node.next ? checkNext(node.next) : null;
        };

        return this.head ? checkNext(this.head) : null;
    }

    public add(data: Data): DataNode<Data> {
        const node = new DataNode(data);
        if (!this.head) {
            this.head = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        return node;
    }
    public dataSelector(type: FnKeys): DataNode<Data>['data'] | null {
        const node = this.search((data) => data.type === type)
        // if (!node) return null

        return node?.data ?? null
    }
    public list(): Record<FnKeys, Data> {

        let list: Record<FnKeys, Data> = {} as Record<FnKeys, Data>
        if (!this.head) return list

        const toList = (node: DataNode<Data>): Record<FnKeys, Data> => {
            list = { ...list, [node.data.type]: node.data }
            return node.next ? toList(node.next) : list
        }



        return toList(this.head)
    }
}
export default FnLinkedList;




// class DTO_Node_<FN extends ANYfn> implements IDataTransferObject {
//     public fn: FN
//     public type: Enum_NodesAction
//     public fields: string[] = []
//     constructor(
//         func: FN,
//         type: Enum_NodesAction
//     ) {
//         this.fn = func
//         this.type = type
//     }

//     exec(args: IFuncArgs) {

//         try {
//             const out = this.fn(args)
//             return out
//         } catch (error) {
//             _log("Something gone wrong, check arguments!")
//             return
//         }
//     }




// }