import { _ID, _log } from '../../Helpers/HelpersFns';
import { ANYfn } from '../../Interfaces/MathActionsTypes';
import { ActionFnNode } from './v1FnNode';
import { DTO_IStore, FnDtoNames } from '..';

class v1DTO_Store {
    public store: DTO_IStore<FnDtoNames> = {};
    constructor(loaded_store?: DTO_IStore<FnDtoNames>) {
        loaded_store && this.init(loaded_store);

    }
    register(store_node: ActionFnNode<ANYfn>, node_id?: string): void {
        const id = node_id ?? _ID();
        const record: DTO_IStore<FnDtoNames> = {
            [id]: store_node
        };
        console.log('new record: ', record);
        this.store = { ...this.store, ...record };
    }
    init(loaded: typeof this.store) {
        this.store = loaded;
        _log(`Store created with ${this.size} elements`);
        return this.store;
    }

    get size() {
        return Object.entries(this.store).length;
    }




}
// dto_Store.register(CalcNetSizeNode, 'nets');
// dto_Store.register(Offset5FnNode, 'offset5');
// export { dto_Store }
