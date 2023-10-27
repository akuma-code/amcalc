import { StringifyProps } from "../../ActionComponents/ActionTypes/FnProperties"
import { ArgsList, Enum_NodesAction, FnKeys, Fn_Args_nets, Fn_Args_offset5, Fn_Output_nets, IFuncArgs, IFuncsList, IFunctions, TypeSelector } from "../../ActionComponents/ActionTypes/Types"
import { _log } from "../../Helpers/HelpersFns"
import { ANYobj } from "../../Interfaces/MathActionsTypes"
type Output_v1<T extends FnKeys = 'nets'> = {
    args: ArgsList[T]
    output: ReturnType<IFunctions[T]>
}

type Output_v2<T extends FnKeys> = Pick<TypeSelector<T>, 'arg' | 'output'>

type Output_v3<T extends FnKeys> = Record<FnKeys, Output_v1<T>>

type FormProps<K extends FnKeys> = Pick<TypeSelector<K>, 'fields' | 'initstate' | 'arg'>



export const useDTO = <FK extends FnKeys>(fn_type: Enum_NodesAction & string) => {

    const createOutput = (fn: IFunctions[FK], ...saved_args: FormProps<FK>['arg'][]) => {
        const out = (arg: FormProps<FK>['arg']) => {
            const res = {
                args: arg,
                output: fn(arg as Fn_Args_nets & Fn_Args_offset5)
            }
            return res
        }

        return saved_args.map(out)
    }



    const formProps = (initState: FormProps<FK>['arg']): FormProps<FK> => {
        type StringInit = StringifyProps<ArgsList[typeof fn_type]>

        const f = Object.keys(initState) as (keyof StringInit)[]
        return {
            fields: f,
            initstate: initState,
            arg: initState
        }
    }
    return { createOutput, formProps }
}