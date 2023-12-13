import CalcControl, { notReachable } from "../ActionComponents/Calculators/CalcBoxFn";
import { AnyArg } from "../Hooks/useDynamicInputs";
import { A_InputArgs } from "../Interfaces/CommonTypes";
import { ArgsTypes } from "../Models/ArgsTypeModel";
import { DataStore } from "./DataStore";






export class DataOutput {
    root: DataStore<AnyArg>
    argType: ArgsTypes | string
    saved_args: A_InputArgs[]
    blocks: unknown[] = []
    constructor(data_store: DataStore<AnyArg>) {
        this.root = data_store
        this.argType = data_store.store_id
        this.saved_args = data_store.store
        this.blocks = this.getBlocks()
    }


    getBlocks() {
        const mapfn = this.calcFuncs
        function _c({ argType, ...rest }: A_InputArgs) {


            const _b = mapfn.length > 0 ? mapfn.map(fn => fn.fn(rest)) : []
            return _b
        }

        const blocks = this.saved_args.map(_c)
        return blocks

    }

    get calcFuncs() {
        const mapfn = []
        switch (this.argType) {
            case "size_full": mapfn.push(...CalcControl.size_full.funcs)
                break
            case "offset5": mapfn.push(...CalcControl.offset5.funcs)
                break
            default: return []
        }
        return mapfn
    }
}



































// class DataStore<D extends ArgsUnion> {
//     private saved: Array<D['args']>;
//     private rootStore?: RootArgsStore_v1;
//     output: any[]
//     store_id?: ArgsTypes
//     uniqueID: string = _ID()

//     constructor(data_type?: ArgsTypes, options?: { root: RootArgsStore_v1 }) {

//         this.saved = [];
//         this.rootStore = options?.root;
//         this.output = []

//         this.setName(data_type)
//     }


//     get storeSize() {

//         return this.saved.length;
//     }

//     setName(name?: ArgsTypes) {
//         if (!name) return this
//         this.store_id = name
//         return this
//     }
//     add(data: D['args']) {
//         if (!this.store_id)
//             this.saved = [...this.saved, data];
//         this.updateOutput()
//     }
//     get store() {
//         return this.saved;
//     }
//     get data() {
//         const store = toJS(this.store)
//         const out = toJS(this.output)
//         return { store, out }
//     }
//     clear() {
//         this.saved = [];
//         this.updateOutput()

//     }

//     updateOutput() {
//         const getOutBlock = (saved_data: D) => {
//             switch (saved_data.argType) {

//                 // case InputsTypeEnum.size_full:return new DataOutputBlock(saved_data.args, {root_store:this})
//                 // case InputsTypeEnum.offset5:return new DataOutputBlock(saved_data.args, {root_store:this})
//             }
//         }
//         // this.output = [...this.saved].map(a => new DataOutputBlock<D>(a, { root_store: this, type: this.store_id as InputsTypeEnum }))
//     }


// }



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
