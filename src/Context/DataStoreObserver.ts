import { _ID, _log, _sizeTuppler } from "../Helpers/HelpersFns";
import { _isFullSize, ISize, ISizeFull, SizeFull } from "../Interfaces/CommonTypes";
import { Calc } from "../Hooks/useFuncs";
import { AnyArg } from "../Hooks/useDynamicInputs";
import { ANYobj } from "../Interfaces/MathActionsTypes";


export interface IDSObserver {
    name: string
    output: unknown[]
    update(payload: any): void

}

export interface ICalcOutput_ {
    result: any
    text?: string
}




export interface IObserverOutput<T extends AnyArg> {
    result: T
    text: string
}

export class OutputSizeObserver {
    output: OutputSizeBlock[] = [];
    name: string;
    constructor(obs_name: string) {
        this.name = obs_name;
    }

    update(payload: ISize): void {
        this.output.push(new OutputSizeBlock(payload))
        _log(this.output)
    }

}



export class OutputSizeBlock {
    block_id: string = _ID()
    out: Record<string, ANYobj>
    constructor(size: ISize) {

        this.out = this.calc(size)
    }

    calc(args: ISize) {
        const size = new SizeFull(..._sizeTuppler(args))
        const netSkf = Calc.netSkf(size)
        const netSimple = Calc.netSimple(size)
        const Otk = Calc.OtkPanel(size)
        this.out = { netSimple, netSkf, Otk }
        return { netSimple, netSkf, Otk }
    }
}