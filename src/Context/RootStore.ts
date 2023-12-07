import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { ISizeShort, ISizeFull, SizeFull } from "../Interfaces/CommonTypes";
import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { ArgsTypesList } from "../Models/ArgsTypeModel";
import { AnyArg } from "../Hooks/useDynamicInputs";
import { DataStore } from "./DataStore";
import { _ID, _log } from "../Helpers/HelpersFns";

export type IRootStores_v1 = {
    [Key in keyof ArgsTypesList]?: DataStore<ArgsTypesList[Key]>
}


type IAnyStore = {
    [key: string]: DataStore<ANYobj>
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

    public use<T extends ANYobj>(store_id: InputsTypeEnum, store: DataStore<T>) {
        store.setName(store_id)
        if (!this.stores) {
            this.stores = { [store_id]: store }

            return
        }
        this.stores = { ...this.stores, [store_id]: store }
        return
    }



    private initStores() {
        const FullSIZE = new DataStore<ISizeFull>(this)
        const ShortSIZE = new DataStore<ISizeShort>(this)
        const OFFSET5 = new DataStore<Fn_Args_offset5>(this)
        FullSIZE.setName(InputsTypeEnum.size_full)
        ShortSIZE.setName(InputsTypeEnum.size_short)
        OFFSET5.setName(InputsTypeEnum.offset5)

        this.use(InputsTypeEnum.size_full, FullSIZE)
        this.use(InputsTypeEnum.size_short, ShortSIZE)
        this.use(InputsTypeEnum.offset5, OFFSET5)

        return this.stores
    }
    traverse() {
        const arr: DataStore<AnyArg>[] = []
        for (let store in this.stores) {

            let st = this.select(store) as DataStore<AnyArg>
            if (!st) continue
            arr.push(st)
        }
        return arr
    }
    public storesSize() {
        const getsize = (ds: DataStore) => {
            const { storeSize, store_id } = ds
            return { size: storeSize, store_id: store_id as InputsTypeEnum }
        }
        const storesarr = this.traverse()
        const SIZE = storesarr.map(getsize)
        // const arr = []
        // for (let store in this.stores) {
        //     let key: keyof typeof this.stores = store
        //     const compSize = this.select(store)?.savedSize || 1
        //     arr.push({ store_id: key, size: compSize })
        // }
        // console.log('ss', ...SIZE)
        return SIZE

    }
    select(store_id: keyof typeof this.stores) {
        return this.stores[store_id]
    }
    saveTostore<T extends AnyArg>(store_id: InputsTypeEnum, data: T) {
        if (!this.stores) return

        const s = this.select(store_id)
        switch (store_id) {
            case InputsTypeEnum.size_full: {
                if ('width' in data) s?.add(data)
                break
            }
            case InputsTypeEnum.offset5: {
                // const s = this.select(store_id)
                if ('da' in data) s?.add(data)
                break
            }
            case InputsTypeEnum.size_short: {
                // const s = this.select(store_id)
                if ('w' in data) s?.add(data)
                break
            }
            default: {
                _log("Store id ", store_id, " not found!")
                return
            }
        }
    }
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
    size: new DataStore<ISizeShort>(RootArgsStore),
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