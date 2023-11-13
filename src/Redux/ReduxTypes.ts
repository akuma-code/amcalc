import { StringifyProps } from "../ActionComponents/ActionTypes/FnProperties";
import { Enum_NodesAction, FnKeys, Fn_Args_nets, Fn_Args_offset5, Fn_nets, Fn_offset5, IC_ArgsList, IC_FuncArgs, IC_Functions } from "../ActionComponents/ActionTypes/Types";

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

export type IR_SavedArgs = Record<FnKeys, IC_FuncArgs>



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


export type IR_State<Key extends FnKeys> = {
    type: Key
    fn: IC_Functions[Key]
    init: IC_ArgsList[Key]
    args: IC_ArgsList[Key]
}
export type IR_CalculatorStore = {
    store: { [Key in FnKeys]: IR_State<Key> }
    selected_type: Enum_NodesAction
    active_state?: IR_State<FnKeys>
}

export enum Enum_ReduxActions {
    // state_select = 'state_select',
    form_create = 'form_create',
    select_type = 'select_type'
}
export interface IR_Nets {
    type: Enum_NodesAction.nets
    init: { width: string, height: string }
    fn: Fn_nets
    args: Fn_Args_nets
}

export interface IR_Offset5 {
    type: Enum_NodesAction.offset5
    init: { width: string, height: string }
    fn: Fn_offset5
    args: Fn_Args_offset5
}

// export interface IAction_StateSelect {
//     type: Enum_ReduxActions.state_select
//     payload: { fn_type: Enum_NodesAction }
// }

export interface IAction_FormCreate {
    type: Enum_ReduxActions.form_create
    payload: {
        init: IC_ArgsList[keyof IC_ArgsList]
        type: Enum_NodesAction
    }
}

export interface IAction_SelectType {
    type: Enum_ReduxActions.select_type
    payload: { store_type: Enum_NodesAction }
}

export type IR_Actions =
    | IAction_FormCreate
    | IAction_SelectType