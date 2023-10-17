import { DTO_ExportFnType } from "../Interfaces/MathActionsTypes"
import { saveWrapper } from "../Helpers/saveWrapper"
type DTO_NetOutput = { [K in 'skf' | 'simple']: { w: number, h: number } }
type DTO_NetArgs = { width: number, height: number }
type ICalcNets = ({ width, height }: DTO_NetArgs) => DTO_NetOutput

export const CalcNetSize: ICalcNets = ({ width, height }) => {

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


