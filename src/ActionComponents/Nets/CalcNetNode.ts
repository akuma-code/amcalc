import { ISize, ISizeFull } from "../../Interfaces/CommonTypes";

export class CLS_NetFnCalc {
    skf: ISize
    simple: ISize
    constructor(size: ISizeFull) {
        this.skf = {
            w: size.width - 45,
            h: size.height - 47
        } || {}
        this.simple = {
            w: size.width + 24,
            h: size.height + 45
        }

    }

    get type() {
        return 'nets'
    }
}

const netfn = (size: ISizeFull) => new CLS_NetFnCalc(size)

netfn({ height: 5, width: 54 })