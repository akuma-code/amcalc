import { ActionFnNode } from './ActionModels/v1FnNode'
import { CalcNetSize } from './Nets/CalcNetSize'
import { CalcOffsetFn_Type5 } from './Offset5/Offset5'
import { DTO_ActionOffset5 } from './Offset5/Offset5';
import { DTO_ActionCalcNet } from './Nets/CalcNetSize';
import { ANYfn } from '../Interfaces/MathActionsTypes';
import { DTO_NodeFn } from './ActionModels/DTO_NodeFn';
import { Enum_NodesAction } from './ActionTypes/Types';
import { _log } from '../Helpers/HelpersFns';

export type FnDtoNames =
    | "nets"
    | "offset5"
export type FnDtoActions = DTO_ActionCalcNet | DTO_ActionOffset5

export type DTO_IStore<FName extends FnDtoNames> = Record<FName, ActionFnNode<ANYfn>> | {}
const cn = new DTO_NodeFn(CalcNetSize, Enum_NodesAction.nets)
const on = new DTO_NodeFn(CalcOffsetFn_Type5, Enum_NodesAction.offset5)
export const nodes = { cn, on }
_log(cn, on)
// export const Funcs = {
//     nets: CalcNetSize,
//     offset5: CalcOffsetFn_Type5,

// }


// export function FuncsReducer(action: FnDtoActions) {
//     switch (action.type) {
//         case 'nets': {
//             return
//         }
//         case 'offset5': {
//             return
//         }

//         default: throw new Error("Unknown action type")
//     }


// }