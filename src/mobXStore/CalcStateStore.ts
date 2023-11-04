import { makeAutoObservable } from "mobx";
import { IR_CalculatorStore, ReduxState } from "../Redux/ReduxTypes";
import { Enum_NodesAction } from "../ActionComponents/ActionTypes/Types";

export class CalcStateStore {
    store!: ReduxState
    public selected_type: Enum_NodesAction = Enum_NodesAction.nets
    constructor() {
        this.init()
        makeAutoObservable(this)
    }


    init() {
        this.store = init_store_state()
    }

    updateNets(new_props: Partial<ReduxState['nets']>) {
        this.store.nets = { ...this.store.nets, ...new_props }
    }
    updateOffset5(new_props: Partial<ReduxState['offset5']>) {
        this.store.offset5 = { ...this.store.offset5, ...new_props }
    }

    getState() {
        return this.store[this.selected_type]
    }

    changeType(type: Enum_NodesAction) {
        this.selected_type = type
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