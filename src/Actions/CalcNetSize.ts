import { DTO_FnArgsExtract, DTO_FunctionType } from "../Interfaces/MathActionsTypes"
import { saveWrapper } from "../Helpers/saveWrapper"
type DTO_Net = { [K in 'skf' | 'simple']: { w: number, h: number } }
type DTO_NetArgs = { width: number, height: number }
type ICalcNets = ({ width, height }: DTO_NetArgs) => DTO_Net

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
export type DTO_GetNetSize = DTO_FnArgsExtract<typeof CalcNetSize>
const savedNet = saveWrapper(CalcNetSize)

savedNet({ height: 500, width: 300 })