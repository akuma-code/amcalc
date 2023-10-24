import { _log } from "../../Helpers/HelpersFns";
import { ANYfn } from "../../Interfaces/MathActionsTypes";
import FnLinkedList from "../../Models/LinkedList";
import { DTO_Nodes_list, Enum_NodesAction } from "../ActionTypes/Types";
import { CalcNetSize } from "../Nets/CalcNetSize";
import { CalcOffsetFn_Type5 } from "../Offset5/Offset5";
import { DTO_Node } from "../../Models/LinkedList";

const dto_Store = new FnLinkedList<DTO_Node<DTO_Nodes_list['fn']>>()

dto_Store.add(new DTO_Node(CalcOffsetFn_Type5, Enum_NodesAction.offset5))
dto_Store.add(new DTO_Node(CalcNetSize, Enum_NodesAction.nets))

export function dto_test() {

    // const node = <F extends ANYfn>(fn: F, type: Enum_NodesAction): DTO_Node<F> => new DTO_Node(fn, type)

    // dto_Store.add(new DTO_Node(CalcOffsetFn_Type5, Enum_NodesAction.offset5))
    // dto_Store.add(new DTO_Node(CalcNetSize, Enum_NodesAction.nets))
    // _log(...dto_Store.traverse())
    // const ttt = { width: 100, height: 100 }

    // const fn = dto_Store.fnSearch(d => d.type === 'nets')
    // if (!fn) return
    // _log("exec: ", fn(ttt))
    // _log(dto_Store.search((data) => data.type === 'nets')?.data)

}

export default dto_Store