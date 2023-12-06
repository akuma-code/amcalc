import { computed, makeAutoObservable, observable } from "mobx";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { RootArgsStore_v1 } from "./RootStore";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { OutputSizeObserver, IDSObserver } from "./DataStoreObserver";
import { AnyArg } from "../Hooks/useDynamicInputs";
import { ISize, ISizeFull, SizeFull } from "../Interfaces/CommonTypes";
import { Calc } from "../Hooks/useFuncs";
import { _sizeTuppler } from "../Helpers/HelpersFns";

interface IDS_Subject {
    store_name: InputsTypeEnum
    observers: IDSObserver[]
    notify<T extends ANYobj>(payload: T): void
    addObserver(obs: IDSObserver): void
    delObserver(obs_name: string): void
}

// __DataStore <=> ObserverSubject
export class DataStore<D extends ANYobj> {
    public saved: Array<D>;
    rootStore?: RootArgsStore_v1;
    get savedSize() {
        return this.saved.length;
    }


    constructor(rootstore?: RootArgsStore_v1) {
        this.saved = [];
        this.rootStore = rootstore;
        makeAutoObservable(this)
    }


    add(data: D) {
        this.saved = [...this.saved, data];
    }
    get store() {
        return this.saved;
    }

    clear() {
        this.saved = [];

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


