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
        init: IC_ArgsList[Key]
        saved: IC_ArgsList[Key][]
        out: any[]
    }
}

export const InitStateRedux: ReduxState = {
    nets: {
        saved: [],
        out: [],
        init: { width: 0, height: 0 }
    },
    offset5: {
        saved: [],
        out: [],
        init: { W: 0, H: 0, h: 0, da: 0, db: 0 }
    }
}