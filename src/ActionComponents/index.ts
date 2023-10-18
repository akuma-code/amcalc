import { _ID, _log } from '../Helpers/HelpersFns'
import { AnyFN } from '../Interfaces/MathActionsTypes'
import { ActionFnNode } from './ActionModels/v1FnNode'
import CalcNetSizeNode, { CalcNetSize, DTO_Fn_CalcNetSize } from './Nets/CalcNetSize'
import { CalcOffsetFn_Type5, DTO_CalcOffset5, Offset5FnNode } from './Offset5/Offset5'


export type FnDtoNames =
    | "Nets"
    | "Offset_Type5"


export type DTO_IStore = Record<FnDtoNames, ActionFnNode<AnyFN>> | {}

export const Funcs: Record<FnDtoNames, unknown> = {
    Nets: CalcNetSize,
    Offset_Type5: CalcOffsetFn_Type5,

}
class DTO_Store {
    public store: DTO_IStore = {}
    constructor(loaded_store?: DTO_IStore) {
        loaded_store && this.init(loaded_store)

    }
    register(store_node: ActionFnNode<AnyFN>, node_id?: string): void {
        const id = node_id ?? _ID()
        const record: DTO_IStore = {
            [id]: store_node
        }
        console.log('new record: ', record)
        this.store = { ...this.store, ...record }
    }
    init(loaded: typeof this.store) {
        this.store = loaded
        _log(`Store created with ${this.size} elements`)
        return this.store
    }

    get size() {
        return Object.entries(this.store).length
    }
}

const dto_Store = new DTO_Store()

dto_Store.register(CalcNetSizeNode, 'nets')
dto_Store.register(Offset5FnNode, 'offset5')

export default dto_Store