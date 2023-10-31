import { IFuncArgs, Enum_NodesAction, DTO_EXPORT, IFunctions, FnKeys, IFuncsList, ArgsList, Fn_Output_nets, TypeSelector, IFuncsState } from "../ActionComponents/ActionTypes/Types";
import { _log, getFormFields } from "../Helpers/HelpersFns";
import { ANYfn } from "../Interfaces/MathActionsTypes";
import { LinkedList, DataNode } from "./LinkedList";

export interface IDataTransferObject {
    fn: IFunctions[FnKeys]
    type: Enum_NodesAction
    fields: keyof IFuncArgs[]
    initState: IFuncArgs
}

export class DTO_Node implements IDataTransferObject {
    public fn: IFunctions[FnKeys]
    public type: Enum_NodesAction
    public fields: keyof IFuncArgs[]
    public initState: IFuncArgs
    constructor(
        dto: DTO_EXPORT,
        fn_type: Enum_NodesAction
    ) {
        this.fn = dto.fn
        this.type = fn_type
        this.fields = dto.fields
        this.initState = dto.initState
    }

    exec<T extends ArgsList[typeof this.type]>(args: T) {

        try {

            // const out = this.fn(args)
            // return out
        } catch (error) {
            _log("Something gone wrong, check arguments!")
            return
        }
    }




}
type StateSelector = (type: FnKeys) => {}
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