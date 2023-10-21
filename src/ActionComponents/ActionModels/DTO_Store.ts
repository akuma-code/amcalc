export class DTO_Store {
    _store: any[] = []


    set store(st: any) {
        this._store = st
    }

    get store() {
        return this._store
    }
}