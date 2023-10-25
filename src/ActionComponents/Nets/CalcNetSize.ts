import { DTO_ExportFnType } from "../../Interfaces/MathActionsTypes"
import { DTO_EXPORT } from "../ActionTypes/Types"




type DTO_NetOutput = { [K in 'skf' | 'simple']: { w: number, h: number } }
type DTO_NetArgs = { width: number, height: number }
type ICalcNets = ({ width, height }: DTO_NetArgs) => DTO_NetOutput

const CalcNetSize: ICalcNets = ({ width, height }) => {

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

export type DTO_Fn_CalcNetSize = DTO_ExportFnType<typeof CalcNetSize>
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

const CalcNet_DTO: DTO_EXPORT = { fn: CalcNetSize, fields: ['width', 'height'] }
export default CalcNet_DTO

// const CalcNetSizeNode = new NetFnNode(CalcNetSize)
// export type DTO_ActionCalcNet = ExportFnInterface<typeof CalcNetSize, 'nets'>

// export type DTO_CalcFnExport = ExportFnInterface<typeof CalcNetSize, 'nets'>




// export default CalcNetSizeNode
