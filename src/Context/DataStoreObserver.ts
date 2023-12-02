import { _log } from "../Helpers/HelpersFns";
import { _isFullSize, ISize } from "../Interfaces/CommonTypes";
import { Calc } from "../Hooks/useFuncs";


export interface IDSObserver {
    name: string
    output: ICalcOutput_[]
    update(payload: any): void

}

export interface ICalcOutput_ {
    result: any
    text?: string
}

export class DataStoreObserver implements IDSObserver {
    output: ICalcOutput_[] = [];
    name: string;
    constructor(obs_name: string) {
        this.name = obs_name;
    }

    update(payload: any): void {
        const { simple, skf } = Calc.nets(payload);
        const txt = `
            Простая: ${simple.w} x ${simple.h}
            SKF: ${skf.w} x ${skf.h}`;


        const calcedItem = {
            result: Calc.nets(payload),
            text: txt
        }
        this.output.push(calcedItem)
    }

    // applyCalc(saved_arg: ISize) {
    //     const res = {
    //         result: {},
    //         text: ""
    //     };
    //     if (!_isFullSize(saved_arg)) {
    //         const { simple, skf } = Calc.nets(saved_arg);
    //         const txt = `
    //         Простая: ${simple.w} x ${simple.h}
    //         SKF: ${skf.w} x ${skf.h}`;
    //         res.text = txt;
    //         res.result = { skf, simple };
    //         this.output.push(res);
    //         return;
    //     }
    //     _log("Args not saved! Error!");
    // }
}
