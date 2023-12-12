import { toJS } from "mobx";
import { _ID, _log } from "../Helpers/HelpersFns";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { BlockCalculator, IOutBlock } from "./DataStore";
import { RootArgsStore_v1 } from "./RootStore";
import { A_Offset5, ArgsUnion, SizeFull } from "../Interfaces/CommonTypes";
import { AnyArg } from "../Hooks/useDynamicInputs";
import { ArgsTypes } from "../Models/ArgsTypeModel";


type WithArgType = { argType: ArgsTypes }


class DataStore<D extends ArgsUnion> {
    private saved: Array<D['args']>;
    private rootStore?: RootArgsStore_v1;
    output: any[]
    store_id?: ArgsTypes
    uniqueID: string = _ID()

    constructor(data_type?: ArgsTypes, options?: { root: RootArgsStore_v1 }) {

        this.saved = [];
        this.rootStore = options?.root;
        this.output = []

        this.setName(data_type)
    }


    get storeSize() {

        return this.saved.length;
    }

    setName(name?: ArgsTypes) {
        if (!name) return this
        this.store_id = name
        return this
    }
    add(data: D['args']) {
        if (!this.store_id)
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
        const getOutBlock = (saved_data: D) => {
            switch (saved_data.argType) {

                // case InputsTypeEnum.size_full:return new DataOutputBlock(saved_data.args, {root_store:this})
                // case InputsTypeEnum.offset5:return new DataOutputBlock(saved_data.args, {root_store:this})
            }
        }
        // this.output = [...this.saved].map(a => new DataOutputBlock<D>(a, { root_store: this, type: this.store_id as InputsTypeEnum }))
    }


}

export const r = new DataStore()
r.add(new A_Offset5(5, 5, 1, 1, 2))
const y = r.store_id
_log(y)



// class DataOutputBlock<A extends ArgsUnion> {
//     private root?: DataStore<A>;
//     initData: A;
//     argType: A['argType'];
//     block_id: string = _ID();
//     out: any[] = [];

//     constructor(data: A['args'], options?: any) {
//         this.initData = data;
//         this.root = options?.root_store!;
//         this.argType = data.argType
//         this.init();
//     }

//     initFuncs(block: A) {
//         const type = block.argType;

//         const BC = new BlockCalculator({ ...block } as unknown as IOutBlock);
//         switch (type) {
//             case InputsTypeEnum.size_full: {


//                 this.out.push(...BC.calced);
//                 _log(BC);
//                 break;
//             }
//             case InputsTypeEnum.offset5: {
//                 // const BC = new BlockCalculator()
//                 this.out.push(...BC.calced);
//                 break;
//             }
//             default: return console.log('this.out', this.out);
//         }

//     }
//     init() {

//     }



// }