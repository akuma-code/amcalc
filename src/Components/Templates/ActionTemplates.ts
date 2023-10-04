import { IDTO_SimpleAction_v1 } from "../../mobXStore/Stores"
const simplaAction = {

    multiple: (a: number, b: number) => a * b,
    plus: (a: number, b: number) => a + b,
    minus: (a: number, b: number) => a - b,
    devide: (a: number, b: number) => a / b,

}


const ActionTemplates: Record<keyof typeof simplaAction & string, IDTO_SimpleAction_v1> = {
    'multiple': {
        args_list: ['a', 'b'],
        callback: simplaAction.multiple
    },
    'plus': {
        args_list: ['a', 'b'],
        callback: simplaAction.plus
    },
    'minus': {
        args_list: ['a', 'b'],
        callback: simplaAction.minus
    },
    'devide': {
        args_list: ['a', 'b'],
        callback: simplaAction.devide
    },
}

export default ActionTemplates