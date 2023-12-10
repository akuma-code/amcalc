import { toJS } from "mobx";
import { _ID, _log } from "../Helpers/HelpersFns";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { BlockCalculator, IOutBlock } from "./DataStore";
import { RootArgsStore_v1 } from "./RootStore";
import { ArgsUnion } from "../Interfaces/CommonTypes";


type WithArgType = { argType: InputsTypeEnum }
interface IStoreData extends WithArgType {
    data?: ArgsUnion
    root?: RootArgsStore_v1
}

class StoreData_ implements IStoreData {

    public root?: RootArgsStore_v1 | undefined;
    constructor(
        public argType: InputsTypeEnum,
        public data: ArgsUnion
    ) { }
}


class DataStore<D extends IStoreData> {
    private saved: Array<D['data']>;
    private rootStore?: RootArgsStore_v1;

    output: any[]
    store_id?: string | InputsTypeEnum
    uniqueID: string = _ID()

    constructor({ root, argType }: IStoreData) {

        this.saved = [];
        this.rootStore = root;
        this.output = []

        this.setName(argType)
    }


    get storeSize() {

        return this.saved.length;
    }

    setName(name: string) {

        this.store_id = name
        return this
    }
    add(data: D['data']) {
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
        // this.output = [...this.saved].map(a => new DataOutputBlock<D>(a, { root_store: this, type: this.store_id as InputsTypeEnum }))
    }


}

class DataOutputBlock<A extends WithArgType> {
    private root?: DataStore<IStoreData>;
    initArg: A;
    argType: A['argType'];
    block_id: string = _ID();
    out: any[] = [];

    constructor(arg: A, options?: any) {
        this.initArg = arg;
        this.root = options?.root_store!;
        this.argType = arg.argType
        this.init();
    }

    initFuncs(block: A) {
        const type = block.argType;

        const BC = new BlockCalculator({ ...block } as unknown as IOutBlock);
        switch (type) {
            case InputsTypeEnum.size_full: {


                this.out.push(...BC.calced);
                _log(BC);
                break;
            }
            case InputsTypeEnum.offset5: {
                // const BC = new BlockCalculator()
                this.out.push(...BC.calced);
                break;
            }
            default: return console.log('this.out', this.out);
        }

    }
    init() {

    }



}
