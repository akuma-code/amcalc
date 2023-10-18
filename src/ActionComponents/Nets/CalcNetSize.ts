import { DTO_ExportFnType, DTO_FuncActionType } from "../../Interfaces/MathActionsTypes"
import { ActionFnNode } from "../ActionModels/v1FnNode"


type DTO_NetOutput = { [K in 'skf' | 'simple']: { w: number, h: number } }
type DTO_NetArgs = { width: number, height: number }
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

export type DTO_Fn_CalcNetSize = DTO_ExportFnType<typeof CalcNetSize>
class NetFnNode extends ActionFnNode<typeof CalcNetSize>{

    exec(args: DTO_Fn_CalcNetSize['args'], save_args: boolean = false) {

        save_args && this.saved.push(args)

        return this.fn(args)
    }

}



const CalcNetSizeNode = new NetFnNode(CalcNetSize)
export type INetsNode_DTO = {
    args: DTO_NetArgs
    fn: ICalcNets
}
export type DTO_ActionCalcNet = DTO_FuncActionType<typeof CalcNetSize, 'nets'>
export default CalcNetSizeNode
