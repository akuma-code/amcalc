import { action, computed, makeAutoObservable, observable, toJS } from "mobx";
import { _ID, _log } from "../Helpers/HelpersFns";
import { AnyArg } from "../Hooks/useDynamicInputs";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { IDSObserver } from "./DataStoreObserver";
import { RootArgsStore_v1 } from "./RootStore";
import { Calc, FnCalculatorList, ICalcPropNames } from "../Hooks/useFuncs";
import { Fn_Args_offset5, Fn_Output_offset5 } from "../ActionComponents/ActionTypes/Types";
import { ISizeFull, ISizeShort, SizeFull } from "../Interfaces/CommonTypes";
import { ArgsTypesList } from "../Models/ArgsTypeModel";

interface IDS_Subject {
    store_name: InputsTypeEnum
    observers: IDSObserver[]
    notify<T extends ANYobj>(payload: T): void
    addObserver(obs: IDSObserver): void
    delObserver(obs_name: string): void
}

// __DataStore <=> ObserverSubject
export class DataStore<D extends AnyArg> {
    private saved: Array<D>;
    private rootStore?: RootArgsStore_v1;
    output: DataOutputBlock<D>[]
    store_id?: string | InputsTypeEnum
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

        }, { autoBind: true, deep: true }

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
        this.output = [...this.saved].map(a => new DataOutputBlock<D>(a, { root_store: this, type: this.store_id as InputsTypeEnum }))
    }


}

interface IFnArgsUnion<K extends InputsTypeEnum & string> {
    type: K,
    payload: ArgsTypesList[K]
}
export type ISizeBlock = IFnArgsUnion<InputsTypeEnum.size_full>
export type IOffset5Block = IFnArgsUnion<InputsTypeEnum.offset5>
export type IOutBlock = ISizeBlock | IOffset5Block
export interface OutBlockOptions {
    root_store?: DataStore<any>
    type?: IOutBlock['type']
}

export class DataOutputBlock<A extends AnyArg> {
    private root?: DataStore<A>
    initArg: A
    argType?: InputsTypeEnum
    block_id: string = _ID()
    out: any[] = []

    constructor(arg: A, options?: OutBlockOptions) {
        this.initArg = arg
        this.root = options?.root_store
        this.argType = options ? options.type : undefined
        this.init()
    }

    initFuncs(block: IOutBlock) {
        const type = block.type

        const BC = new BlockCalculator(block)
        switch (type) {
            case InputsTypeEnum.size_full: {


                this.out.push(...BC.calced)
                _log(BC)
                break
            }
            case InputsTypeEnum.offset5: {
                // const BC = new BlockCalculator()
                this.out.push(...BC.calced)
                break
            }
            default: return console.log('this.out', this.out)
        }

    }
    init() {
        if (!this.argType) return
        const block = {
            type: this.argType,
            payload: this.initArg
        } as IOutBlock
        this.initFuncs(block)
    }



}
export class BlockCalculator {
    calced: ReturnType<typeof this.calc> = []
    constructor(block: IOutBlock) {
        this.calc(block)
    }
    calc(input: IOutBlock) {
        const out: any[] = []
        const { payload, type } = input
        switch (type) {
            case InputsTypeEnum.size_full: {
                const Fns = outCalcSelector({ type, payload })


                out.push(...Fns)
                console.log('out', out)
                break

            }
            case InputsTypeEnum.offset5: {
                const Fns = outCalcSelector({ type, payload })
                // Fns.forEach(f => out.push(f(input.payload)))
                out.push(...Fns)
                break
            }
        }
        this.calced = [...out]
        return out
    }

}

function outCalcSelector(block: Partial<IOutBlock>) {

    const funcs = {
        size_full: [
            Calc.skf,
            Calc.simple,
            Calc.otkosi
        ],
        offset5: [
            Calc.offset5,
        ]
    }

    const output = []
    switch (block.type) {
        case InputsTypeEnum.size_full: {
            const outfuncs = funcs[block.type]
            const out = outfuncs.map(f => f(block.payload!))
            output.push(out)
            break
        }
        case InputsTypeEnum.offset5: {
            const outfuncs = funcs[block.type]
            const out = outfuncs.map(f => f(block.payload!))
            output.push(out)
            break
        }
    }
    return output

}




// const ttt = new BlockCalculator({ type: InputsTypeEnum.size_full, payload: new SizeFull(800, 1300) })
// console.log('ttt', ttt)
function test(block: IOutBlock) {
    const { payload, type } = block
    const funcs_ = [
        { skf: Calc.skf },
        { simple: Calc.simple },
        { otkosi: Calc.otkosi },
        { offset5: Calc.offset5 },
    ]
    const funcs = {
        size_full: [
            Calc.skf,
            Calc.simple,
            Calc.otkosi
        ],
        offset5: [
            Calc.offset5,
        ]
    }

    const output = []
    switch (type) {
        case InputsTypeEnum.size_full: {
            const outfuncs = funcs[type]
            const arg = block.payload
            const out = outfuncs.map(f => f(arg))
            output.push(out)
            break
        }
        case InputsTypeEnum.offset5: {
            const outfuncs = funcs[type]
            const out = outfuncs.map(f => f(payload))
            output.push(out)
            break
        }
    }
    console.log('output', output)
    return output
}

interface SortedFnCalculatorList {
    size_full: {
        skf(args: ISizeFull): { skf: ISizeShort }
        simple(args: ISizeFull): { simple: ISizeShort }
        otkosi(args: ISizeFull): { pm: number }
    }
    offset5: {
        offset5(args: Fn_Args_offset5): { offset5: Fn_Output_offset5 }
    }
}