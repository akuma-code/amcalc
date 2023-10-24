import { _ID, _log } from "../../Helpers/HelpersFns";
import { ANYfn } from "../../Interfaces/MathActionsTypes";
import { Enum_NodesAction } from "../ActionTypes/Types";
import { CalcNetSize } from "../Nets/CalcNetSize";
import { DTO_Nodes_list } from "../ActionTypes/Types";
import { CalcOffsetFn_Type5 } from "../Offset5/Offset5";
import { CLS_NetFnCalc } from "../Nets/CalcNetNode";
import { ISize, ISizeFull } from "../../Interfaces/CommonTypes";


// export interface ListDataNode<F extends ANYfn, T extends Enum_NodesAction> {
//     fn: F
//     type: T
// }
// export class DTO_Node implements ListDataNode<ANYfn, Enum_NodesAction> {
//     public fn: ANYfn
//     public type: Enum_NodesAction

//     constructor(
//         func: ANYfn,
//         type: Enum_NodesAction
//     ) {
//         this.fn = func
//         this.type = type
//     }

//     exec(args: unknown) {
//         try {
//             const out = this.fn(args)
//             return out
//         } catch (error) {
//             _log("Something gone wrong, check arguments!")
//             return
//         }
//     }


// }


// const dto = new dtoNode()s
