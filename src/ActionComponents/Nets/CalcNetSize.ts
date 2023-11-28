import { dto_Export } from "../../Helpers/HelpersFns"
import { ISizeShort, ISizeFull } from "../../Interfaces/CommonTypes"
import { DTO_ExportFnType } from "../../Interfaces/MathActionsTypes"
import { DTO_EXPORT } from "../ActionTypes/Types"




type DTO_NetOutput = { [K in 'skf' | 'simple']: ISizeShort }
type DTO_NetArgs = ISizeFull
type ICalcNets = ({ width, height }: DTO_NetArgs) => DTO_NetOutput

export const CalcNetSize: ICalcNets = ({ width, height }) => {

    if (!width || !height) throw new Error("ARGS ERROR!")
    const simple = {
        w: width + 24,
        h: height + 45
    }

    const skf = {
        w: width - 45,
        h: height - 47
    }

    return { simple, skf }
}
const initstate: DTO_NetArgs = {
    width: 0,
    height: 0
}

const CalcNet_DTO: DTO_EXPORT = dto_Export(CalcNetSize, initstate)
//  { fn: CalcNetSize, fields: ['width', 'height'] }


export default CalcNet_DTO

// const CalcNetSizeNode = new NetFnNode(CalcNetSize)
// export type DTO_ActionCalcNet = ExportFnInterface<typeof CalcNetSize, 'nets'>

// export type DTO_CalcFnExport = ExportFnInterface<typeof CalcNetSize, 'nets'>



// export class CalcNetsNode {

//     fields = ['width', 'height']
//     skf!: ISize
//     simple!: ISize
//     constructor(props: Fn_Args_nets) {
//         this.init(props)
//     }
//     private init(props: Fn_Args_nets) {
//         const { skf, simple } = CalcNetSize(props)
//         this.skf = skf
//         this.simple = simple
//     }
// }
// export default CalcNetSizeNode
