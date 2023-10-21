import { ICalcNetsFn } from "../ActionTypes/Types";
import { DTO_Fn_CalcNetSize } from "../Nets/CalcNetSize";

type IGenNetCalc = Generator<DTO_Fn_CalcNetSize['args'], DTO_Fn_CalcNetSize['output']>

function* NetGenerator() {

    return { height: 5, width: 4 }
}