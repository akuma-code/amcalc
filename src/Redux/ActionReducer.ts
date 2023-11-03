import { Enum_NodesAction } from "../ActionComponents/ActionTypes/Types";
import { CalcNetSize } from "../ActionComponents/Nets/CalcNetSize";
import { CalcOffsetFn_Type5 } from "../ActionComponents/Offset5/Offset5";
import { ActionsList, ReduxState } from "./ReduxTypes";

export function CalcReducer(state: ReduxState, action: ActionsList) {
    switch (action.type) {
        case Enum_NodesAction.nets: {
            const { height, width } = action.payload
            const output = CalcNetSize({ width, height })
            return {
                ...state,
                nets: {
                    saved: [...state.nets.saved, { width, height }],
                    out: [...state.nets.out, output],
                    init: { width: 0, height: 0 }
                },
            }
        }
        case Enum_NodesAction.offset5: {
            const output = CalcOffsetFn_Type5(action.payload)
            return {
                ...state,
                offset5: {
                    saved: [...state.offset5.saved, action.payload],
                    out: [...state.offset5.out, output],
                    init: { W: 0, H: 0, h: 0, da: 0, db: 0 }
                },
            }
        }
        default: {
            return state
        }
    }
}