import CalcControl, { notReachable } from "../ActionComponents/Calculators/CalcBoxFn";
import { _log } from "../Helpers/HelpersFns";
import { AnyArg } from "../Hooks/useDynamicInputs";
import { GetReturnFnList } from "../Hooks/useFuncs";
import { A_InputArgs, A_Offset5, A_Size } from "../Interfaces/CommonTypes";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { ArgsTypes } from "../Models/ArgsTypeModel";
import { DataStore } from "./DataStore";



type SR = GetReturnFnList<A_Size>
type OR = GetReturnFnList<A_Offset5>

interface OutputDTO<T> {
    blocks: readonly T[]
    argType: ArgsTypes
    store_id: ArgsTypes

}
type SO_DTO = OutputDTO<typeof CalcControl.size_full.funcs>
type OR_DTO = OutputDTO<OR>

type SizeOffsetDTO =
    | SO_DTO
    | OR_DTO


type OutItem = {
    arg: A_InputArgs
    out: SR[] | OR[]
}
export class DataOutput {
    root: DataStore<AnyArg>
    argType: ArgsTypes | string
    saved_args: A_InputArgs[]
    blocks: any[] = []
    constructor(data_store: DataStore<AnyArg>) {
        this.argType = data_store.store_id
        this.root = data_store
        this.saved_args = data_store.store
        this.blocks = this.getBlocks()
    }


    getBlocks() {
        const mapfn = this.calcFuncs
        function _c({ argType, ...rest }: A_InputArgs) {
            const _b = mapfn.length > 0 ? mapfn.map(fn => fn.fn(rest)) : []
            return _b
        }

        const blocks = this.saved_args.map(_c) as SR[][] | OR[][]
        return blocks

    }
    out() {

        const outItem = (arg: A_InputArgs, out: SR[] | OR[]) => ({
            arg,
            out
        })
        let r: ReturnType<typeof outItem>[] = [];
        if (this.argType) {
            if (this.saved_args.length === 0) {
                _log("no saved args")
                return []
            } else

                switch (this.argType) {
                    case "size_full": {

                        r = this.blocks.map((b, idx) => outItem(this.saved_args[idx] as A_Size, b as SR[]))
                        break
                    }
                    case "offset5": {
                        r = this.blocks.map((b, idx) => outItem(this.saved_args[idx] as A_Offset5, b as OR[]))
                        break
                    }
                    case "undefined": {
                        _log("ARGS TYPE MISSED!", this.argType)
                        break
                    }
                    default: throw new Error("Something gone wrong")
                }
        }
        return r
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
