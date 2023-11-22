import { makeAutoObservable } from "mobx";
import { IActionDataNumber, v1DataNode } from "../mobXStore/ActionStore";
import { _log } from "../Helpers/HelpersFns";
import { DTO_ARGS, InputsTypeEnum } from "../Components/Hooks/useFormStateSelector";
import { ISize, ISizeFull } from "../Interfaces/CommonTypes";
import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { ArgsTypes, ArgsTypesList } from "../Models/ArgsTypeModel";


interface IDataStoreItem_unk {
    type: InputsTypeEnum
    dataType: unknown
}
interface ICommonDataStoreItem<T> {
    type: string
    init: T
}
interface ISizeFullData {
    type: InputsTypeEnum.size_full
    init: ISizeFull
}
interface ISizeData {
    type: InputsTypeEnum.size
    init: ISize
}
interface IOffset5Data {
    type: InputsTypeEnum.offset5
    init: Fn_Args_offset5
}
interface IDataStoreWithInit<D extends ANYobj> {
    saved: Array<D>
    init?: D
    rootStore?: RootArgsStore_v1

}

type IRootStores_v1 = {
    [Key in keyof ArgsTypesList]?: DataStore<ArgsTypesList[Key]>
}
type IAnyStore = {
    [key: string]: DataStore<ANYobj>
}
interface ExtendedRootStores extends Partial<IAnyStore>, IRootStores_v1 { }


class DataStore<D extends ANYobj> implements IDataStoreWithInit<D> {
    public saved: Array<D>
    init?: D
    rootStore?: RootArgsStore_v1
    constructor(rootstore?: RootArgsStore_v1) {
        this.saved = []
        this.rootStore = rootstore
    }
    protected setInit(init_state: D) {
        this.init = init_state
    }
    add(data: D) {
        if (!this.init) this.init = data
        this.saved = [...this.saved, data]
    }

    clear() {
        this.saved = []

    }

}

export class RootArgsStore_v1 {
    public stores: ExtendedRootStores | null
    // public storeKeys: ReadonlyArray<keyof ExtendedRootStores> = []
    constructor() {
        this.stores = this.init()
    }
    get storeKeys(): ReadonlyArray<keyof ExtendedRootStores> | [] {
        if (!this.stores) return []
        const keys = [...Object.keys(this.stores)] as const
        return keys
    }
    public use<T extends ANYobj>(name: InputsTypeEnum, store: DataStore<T>) {
        if (!this.stores) {
            this.stores = { [name]: store }

            return
        }
        this.stores = { ...this.stores, [name]: store }
        return
    }
    public addStore<T extends ANYobj>(dataInterface: ICommonDataStoreItem<T>) {
        const { type, init } = dataInterface
        const new_store = new DataStore<typeof init>(this)
        if (!this.stores) {
            this.stores = { [type]: new_store }

            return
        }
        this.stores = { ...this.stores, [type]: new_store }
    }
    private init() {
        this.use(InputsTypeEnum.size, new DataStore<ISize>(this))
        this.use(InputsTypeEnum.offset5, new DataStore<Fn_Args_offset5>(this))
        this.use(InputsTypeEnum.size_full, new DataStore<ISizeFull>(this))
        // this.addStore({ type: InputsTypeEnum.size_full, init: { width: 5, height: 5 } })
        return this.stores
    }
    getStore(name: string) {
        if (!this.stores) {
            _log("No such store")
            return []
        }
        return this.stores[name]?.saved || []
    }

    saveTostore<T extends ANYobj>(store_id: InputsTypeEnum, data: T) {
        if (!this.stores) return

        switch (store_id) {
            case InputsTypeEnum.size_full: {
                const s = this.stores[store_id]
                s?.add(data as unknown as ISizeFull)
                return
            }
            case InputsTypeEnum.offset5: {
                const s = this.stores[store_id]
                s?.add(data as unknown as Fn_Args_offset5)
                return
            }
            case InputsTypeEnum.size: {
                const s = this.stores[store_id]
                s?.add(data as unknown as ISize)
                return
            }
        }
    }
}
const dataint: ICommonDataStoreItem<ISizeFull> = {
    type: 'SIZE',
    init: { width: 5, height: 5 }
}
export const RootArgsStore = new RootArgsStore_v1()
// RAS.stores!.size_full!.add({ width: 4, height: 19 })
// RAS.addStore(dataint)
// RAS.addStore(dataint)
// RAS.use(InputsTypeEnum.size_full, new DataStore<ISizeFull>(RAS))
// RAS.use(InputsTypeEnum.size, new DataStore<ISize>(RAS))
// RAS.use(InputsTypeEnum.offset5, new DataStore<Fn_Args_offset5>(RAS))
const s: ExtendedRootStores = {
    offset5: new DataStore<Fn_Args_offset5>(RootArgsStore),
    size_full: new DataStore<ISizeFull>(RootArgsStore),
    size: new DataStore<ISize>(RootArgsStore),
    test: new DataStore<ANYobj>(RootArgsStore),


}
// s.size_full?.add({ width: 4, height: 19 })














































// class RootStore {
//     actsStore: ActionStore | null = null
//     userStore: UserStore
//     constructor() {
//         this.actsStore = new ActionStore()
//         this.userStore = new UserStore(this)
//     }
// }

// class ActionStore {

//     nodes: v1DataNode[] = []
//     constructor() {
//         this.nodes = []
//         // makeAutoObservable(this, { rootStore: false })
//     }




// }

// class UserStore {
//     rootStore: RootStore

//     constructor(rootStore: RootStore) {
//         this.rootStore = rootStore
//         makeAutoObservable(this, { rootStore: false })
//     }
//     add(data: IActionDataNumber, actionId: string) {
//         const node: v1DataNode = {
//             data: data,
//             actionId: actionId,
//             desc: 'new node'
//         }
//         if (!this.rootStore.actsStore) return []
//         this.rootStore.actsStore.nodes.push(node)
//         console.log('added node: ', data)

//     }

//     get info() {
//         if (!this.rootStore.actsStore) return _log("Store NOT Defined!")
//         return this.rootStore.actsStore.nodes.forEach(n => _log(n))
//     }
// }