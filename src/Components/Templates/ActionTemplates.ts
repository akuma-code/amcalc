import { IDTO_SimpleAction_v1 } from "../../mobXStore/Stores"

const multiple = (a: number, b: number) => a * b
const plus = (a: number, b: number) => a + b
const minus = (a: number, b: number) => a - b
const devide = (a: number, b: number) => a / b

const ActionTemplates: Record<string, IDTO_SimpleAction_v1> = {
    'multiple': {
        args_list: ['a', 'b'],
        callback: multiple
    },
    'plus': {
        args_list: ['a', 'b'],
        callback: plus
    },
    'minus': {
        args_list: ['a', 'b'],
        callback: minus
    },
    'devide': {
        args_list: ['a', 'b'],
        callback: devide
    },
}

export default ActionTemplates