import { DTO_FunctionType, DTO_ExportFnType } from "../../Interfaces/MathActionsTypes"
import { IDTO_SimpleAction_v1 } from "../../mobXStore/Stores"


const simplaAction = {

    multiple: (a: number, b: number) => a * b,
    plus: (a: number, b: number) => a + b,
    minus: (a: number, b: number) => a - b,
    devide: (a: number, b: number) => a / b,

}

function getHyp(a: number, b: number) {
    const hyp = Math.sqrt(a ^ 2 + b ^ 2)
    return { hyp }
}
function getSum(...args: number[]) { return args.reduce((sum, c) => sum += c, 0) }
type GetHypType = DTO_FunctionType<typeof getHyp>
type GetSumType = DTO_FunctionType<typeof getSum>

type ActionTypesList =
    | GetHypType
    | GetSumType


// const ActionTemplates: Record<keyof typeof simplaAction & string, IDTO_SimpleAction_v1> = {
//     'multiple': {
//         args_list: ['a', 'b'],
//         callback: simplaAction.multiple
//     },
//     'plus': {
//         args_list: ['a', 'b'],
//         callback: simplaAction.plus
//     },
//     'minus': {
//         args_list: ['a', 'b'],
//         callback: simplaAction.minus
//     },
//     'devide': {
//         args_list: ['a', 'b'],
//         callback: simplaAction.devide
//     },
// }



// export default ActionTemplates