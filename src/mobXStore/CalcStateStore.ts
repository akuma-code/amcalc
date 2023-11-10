import { makeAutoObservable } from "mobx";
import { Enum_ReduxActions, IR_CalculatorStore, IR_State, ReduxState } from "../Redux/ReduxTypes";
import { Enum_NodesAction, FnKeys } from "../ActionComponents/ActionTypes/Types";

export class CalcStateStore {
    store!: ReduxState
    public active_state: ReduxState[FnKeys] | null
    public selected_type: Enum_NodesAction = Enum_NodesAction.nets
    constructor() {
        this.active_state = null
        this.init()
        makeAutoObservable(this)
    }


    init() {
        this.store = init_store_state()
    }



    getState() {
        return this.store[this.selected_type]
    }

    changeType(type: Enum_NodesAction) {
        this.selected_type = type
        this.active_state = this.store[this.selected_type]
    }

    update(type: Enum_NodesAction, new_props: Partial<ReduxState[Enum_NodesAction]>) {
        this.store = {
            ...this.store, [type]: {
                ...this.store[type], ...new_props
            }
        }
    }
}

export const init_store_state = (): ReduxState => {
    return {
        nets: {
            init: { height: 0, width: 0 },
            out: [],
            saved: []
        },
        offset5: {
            init: { da: 0, db: 0, W: 0, H: 0, h: 0 },
            out: [],
            saved: []
        }
    }
}