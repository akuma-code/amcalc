import { _log } from "../../Helpers/HelpersFns";
import { ISize, ISizeFull } from "../ActionTypes/Types";

export class CalcNet {
    skf: ISize
    simple: ISize
    constructor(init_data: ISizeFull) {
        this.skf = { w: init_data.width - 45, h: init_data.height - 47 }
        this.simple = { w: init_data.width + 24, h: init_data.height + 45 }
    }
}


const mockdata: ISizeFull[] = [
    { width: 500, height: 400 },
    { width: 600, height: 200 },
    { width: 700, height: 1000 },
]

const { skf, simple } = new CalcNet({ width: 500, height: 400 })

function* endlessCalc() {

    const net = (w: number, h: number) => new CalcNet({ width: w, height: h })

    // yield {...net}
    yield net
    return (w: number, h: number) => net(w, h)

}


export function Testing_CalcnetModel() {
    const gen = endlessCalc()
    _log(gen.next())
}