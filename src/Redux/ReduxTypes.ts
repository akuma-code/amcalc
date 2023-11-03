import { Enum_NodesAction, FnKeys, Fn_Args_nets, Fn_Args_offset5, IC_ArgsList } from "../ActionComponents/ActionTypes/Types";

export interface AINets {
    type: Enum_NodesAction.nets
    payload: Fn_Args_nets
}
export interface AIOffset5 {
    type: Enum_NodesAction.offset5
    payload: Fn_Args_offset5
}

export type ActionsList =
    | AINets
    | AIOffset5

export type ReduxState = {
    [Key in FnKeys]: {
        saved: IC_ArgsList[Key][]
        out: any[]
    }
}

export const InitStateRedux: ReduxState = {
    nets: { saved: [], out: [] },
    offset5: { saved: [], out: [] }
}