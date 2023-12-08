import { RootArgsStore_v1 } from "./RootStore";
import { IDSObserver } from "./DataStoreObserver";
import { AnyArg } from "../Hooks/useDynamicInputs";

//__       Subject Data Store <--> Наблюдатель, который рассылает данные

export class SubjectDS<T extends AnyArg> {
    observers: IDSObserver[];
    constructor(rstore?: RootArgsStore_v1) {
        // super(rstore)
        this.observers = [];
    }

    notify(payload: T) {
        this.observers.forEach(o => o.update(payload));
    }

    addObserver(obs: IDSObserver) {
        this.observers.push(obs);
    }
    delObserver(obs: IDSObserver) {
        this.observers.filter(o => o.name !== obs.name);
    }
}
