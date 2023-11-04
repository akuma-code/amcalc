import { _log } from "../Helpers/HelpersFns";
import { Enum_ReduxActions, IR_Actions, IR_CalculatorStore } from "./ReduxTypes";

export function CalcStateReducer(init_state: IR_CalculatorStore, action: IR_Actions) {
    switch (action.type) {

        case Enum_ReduxActions.form_create: {
            const { init, type } = action.payload
            return {
                ...init_state
            }

        }
        case Enum_ReduxActions.select_type: {
            const { store_type } = action.payload
            return {
                ...init_state,
                selected_type: store_type
            }
        }
        default: {
            _log("Action Type Error")
            return init_state
        }
    }
}