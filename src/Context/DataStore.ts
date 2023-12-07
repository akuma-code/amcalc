import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { RootArgsStore_v1 } from "./RootStore";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { OutputSizeObserver, IDSObserver } from "./DataStoreObserver";
import { AnyArg } from "../Hooks/useDynamicInputs";
import { ISize, ISizeFull, SizeFull } from "../Interfaces/CommonTypes";
import { _ID, _sizeTuppler } from "../Helpers/HelpersFns";
import { Calc, Fn_CalcList } from "../Hooks/useFuncs";

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
    output: DataOutputBlock<D>[] = []
    rootStore?: RootArgsStore_v1;
    store_id!: string

    constructor(rootstore?: RootArgsStore_v1) {
        this.saved = [];
        this.rootStore = rootstore;

        makeObservable(this, {
            output: observable,
            rootStore: observable,
            store_id: observable,
            store: computed,
            storeSize: computed,
            data: computed,
            add: action,
            clear: action,
            updateOutput: action,
            setName: action,
        })
    }
    get storeSize() {
        return this.saved.length;
    }

    setName(name: string) {
        this.store_id = name
    }
    add(data: D) {
        this.saved = [...this.saved, data];
        this.updateOutput()
    }
    get store() {
        return this.saved;
    }
    get data() {
        const store = this.store
        const out = this.output
        return { store, out }
    }
    clear() {
        this.saved = [];

    }

    updateOutput() {
        this.output = [...this.saved].map(a => new DataOutputBlock(a, this))
    }


}

export class DataOutputBlock<A extends ANYobj = AnyArg> {
    root?: DataStore<A>
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


