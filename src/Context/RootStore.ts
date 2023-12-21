import { makeAutoObservable, toJS } from "mobx";
import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types";
import { _log } from "../Helpers/HelpersFns";
import { AnyArg } from "../Hooks/useDynamicInputs";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { A_InputArgsList, A_Sill, ISizeFull, ISizeShort } from "../Interfaces/CommonTypes";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { ArgsTypes, ArgsTypesList } from "../Models/ArgsTypeModel";
import { DataStore } from "./DataStore";


export type IRootStores_v1 = {
    [Key in keyof ArgsTypesList]?: DataStore<ArgsTypesList[Key]>
}


type IAnyStore = {
    [key: string]: DataStore<AnyArg>
}


export interface ExtendedRootStores extends IRootStores_v1, Partial<IAnyStore> { }

//__ RootStore___________________________________________
export class RootArgsStore_v1 {
    public stores: ExtendedRootStores


    constructor() {
        makeAutoObservable(this,
            // {
            //     stores: observable,
            //     saveTostore: action,
            //     use: action,
            //     storeKeys: computed,
            //     // select: action,
            //     // traverse: action,
            //     // storesSize: action
            // }
        )
        this.stores = this.initStores()

    }
    get storeKeys(): ReadonlyArray<keyof ExtendedRootStores> | [] {
        if (!this.stores) return []
        const keys = [...Object.keys(this.stores)] as const
        return keys
    }

    public use<T extends AnyArg>(store_id: InputsTypeEnum, store: DataStore<T>) {
        store.setName(store_id)
        if (!this.stores) {
            this.stores = { [store_id]: store }

            return
        }
        this.stores = { ...this.stores, [store_id]: store }
        return
    }



    private initStores() {
        const FullSIZE = new DataStore<ISizeFull>({ name: InputsTypeEnum.size_full })
        const OFFSET5 = new DataStore<Fn_Args_offset5>({ name: InputsTypeEnum.offset5 })
        const Sill = new DataStore<A_Sill>({ name: 'sill' })
        this.use(InputsTypeEnum.size_full, FullSIZE)
        this.use(InputsTypeEnum.offset5, OFFSET5)
        this.use(InputsTypeEnum.sill, Sill)

        return this.stores
    }
    traverse() {
        let arr = []
        for (let store in this.stores) {

            let st = this.select(store)
            if (!st) continue
            arr.push(st)
        }
        return [...arr] as const
    }

    list(options = { ignoreEmpty: false }) {
        const stores = this.traverse()
        const keys = this.storeKeys
        const sort = stores.reduce((sort, st) => {
            const TT = st.store_id as unknown as ArgsTypes
            if (st.storeSize === 0 && options.ignoreEmpty === true) return toJS(sort)
            return toJS({ ...sort, [TT]: { saved: st.store, type: TT } })

        }, {} as { [Key in ArgsTypes]?: { saved: A_InputArgsList[Key][], key: Key } })
        return sort
    }
    public storesSize() {
        const getsize = (ds: DataStore<AnyArg>) => {
            const { storeSize, store_id } = ds
            return { size: storeSize, store_id: store_id as InputsTypeEnum }
        }
        const storesarr = this.traverse()
        const SIZE = storesarr.map(getsize)

        return SIZE

    }
    select(store_id: keyof typeof this.stores) {
        return this.stores[store_id]!
    }
    saveTostore<T extends AnyArg>(store_id: ArgsTypes, data: T) {
        // if (!this.stores) return

        const s = this.select(store_id)
        if (!s) return
        switch (store_id) {
            case InputsTypeEnum.size_full: {
                if ('width' in data) s.add(data)
                break
            }
            case InputsTypeEnum.offset5: {
                // const s = this.select(store_id)
                if ('da' in data) s?.add(data)
                break
            }

            default: {
                _log("Store id ", store_id, " not found!")
                return
            }
        }
    }

    clearStore(store_id: ArgsTypes) {
        const current = this.select(store_id)
        current.clear()
    }
}

export const ROOTSTORE = new RootArgsStore_v1()


// RAS.stores!.size_full!.add({ width: 4, height: 19 })
// RAS.addStore(dataint)
// RAS.addStore(dataint)
// RAS.use(InputsTypeEnum.size_full, new DataStore<ISizeFull>(RAS))
// RAS.use(InputsTypeEnum.size, new DataStore<ISize>(RAS))
// RAS.use(InputsTypeEnum.offset5, new DataStore<Fn_Args_offset5>(RAS))
// const s: ExtendedRootStores = {
//     offset5: new DataStore<Fn_Args_offset5>({ name: 'off5' }),
//     size_full: new DataStore<ISizeFull>({ name: 'full' }),
//     size: new DataStore<ISizeShort>({ name: 'short' }),
//     test: new DataStore<ANYobj>({ name: 'any' }),


// }
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