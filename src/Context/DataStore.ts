import { action, computed, makeAutoObservable, makeObservable, observable, toJS } from "mobx";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { RootArgsStore_v1 } from "./RootStore";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { OutputSizeObserver, IDSObserver } from "./DataStoreObserver";
import { AnyArg } from "../Hooks/useDynamicInputs";
import { ISize, ISizeFull, SizeFull } from "../Interfaces/CommonTypes";
import { _ID, _sizeTuppler } from "../Helpers/HelpersFns";
import { Calc_, Fn_CalcList } from "../Hooks/useFuncs";
import { truncate } from "fs";

interface IDS_Subject {
    store_name: InputsTypeEnum
    observers: IDSObserver[]
    notify<T extends ANYobj>(payload: T): void
    addObserver(obs: IDSObserver): void
    delObserver(obs_name: string): void
}

// __DataStore <=> ObserverSubject
export class DataStore<D extends ANYobj = AnyArg> {
    private saved: Array<D>;
    private rootStore?: RootArgsStore_v1;
    output: DataOutputBlock<D>[]
    store_id?: string | null
    uniqueID: string = _ID()

    constructor({ root, name }: { root?: RootArgsStore_v1, name: string }) {
        makeAutoObservable(this, {
            output: observable,

            store: computed,
            storeSize: computed,
            data: computed,
            add: action,
            clear: action,
            updateOutput: action,
            setName: action,

        }, { autoBind: true }

        )
        this.saved = [];
        this.rootStore = root;
        this.output = []
        this.setName(name)
    }


    get storeSize() {

        return this.saved.length;
    }

    setName(name: string) {

        this.store_id = name
        return this
    }
    add(data: D) {
        this.saved = [...this.saved, data];
        this.updateOutput()
    }
    get store() {
        return this.saved;
    }
    get data() {
        const store = toJS(this.store)
        const out = toJS(this.output)
        return { store, out }
    }
    clear() {
        this.saved = [];
        this.updateOutput()

    }

    updateOutput() {
        this.output = [...this.saved].map(a => new DataOutputBlock(a, this))
    }


}
type Out<A extends ANYobj> = A extends AnyArg ? {
    type: InputsTypeEnum
    payload: ReturnType<Fn_CalcList<A>>
} : any

type SizeOutput = Out<ISizeFull>
export class DataOutputBlock<A extends ANYobj = AnyArg> {
    private root?: DataStore<A>
    initArg: A
    block_id: string = _ID()
    out: any[] = []
    constructor(arg: A, root_store?: DataStore<A>) {
        this.root = root_store
        this.initArg = arg
    }

    calc() {

    }


}

//__       Subject Data Store <--> Наблюдатель, который рассылает данные
export class SubjectDS<T extends AnyArg>{
    observers: IDSObserver[]
    constructor(rstore?: RootArgsStore_v1) {
        // super(rstore)
        this.observers = []
    }

    notify(payload: T) {
        this.observers.forEach(o => o.update(payload))
    }

    addObserver(obs: IDSObserver) {
        this.observers.push(obs)
    }
    delObserver(obs: IDSObserver) {
        this.observers.filter(o => o.name !== obs.name)
    }
}


// export const SizeObserver = new SubjectDS<ISizeFull>()
// const obs = new OutputSizeObserver('FullSize')
// SizeObserver.addObserver(obs)


