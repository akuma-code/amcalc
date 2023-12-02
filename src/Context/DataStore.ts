import { makeAutoObservable } from "mobx";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { RootArgsStore_v1 } from "./RootStore";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { IDSObserver } from "./DataStoreObserver";

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
    observers: IDSObserver[] = []


    constructor(rootstore?: RootArgsStore_v1) {
        this.saved = [];
        this.rootStore = rootstore;
        makeAutoObservable(this, {}, { name: 'DStore' });
    }

    get savedSize() {
        return this.saved.length;
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
    notify(payload: D) {
        this.observers.forEach(o => o.update(payload))
    }

    addObserver(obs: IDSObserver) {
        this.observers.push(obs)
    }
    delObserver(obs: IDSObserver) {
        this.observers.filter(o => o.name !== obs.name)
    }

}
