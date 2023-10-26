import { StringifyProps } from "../../ActionComponents/ActionTypes/FnProperties"
import { ArgsList, Enum_NodesAction, FnKeys, Fn_Output_nets, IFuncArgs, IFuncsList, IFunctions, TypeSelector } from "../../ActionComponents/ActionTypes/Types"
import { _log } from "../../Helpers/HelpersFns"
type Output_v1<T extends FnKeys = 'nets'> = {
    args: ArgsList[T]
    output: ReturnType<IFunctions[T]>
}

type Output_v2<T extends FnKeys> = Pick<TypeSelector<T>, 'arg' | 'output'>

type Output_v3<T extends FnKeys> = Record<FnKeys, Output_v1<T>[]>

type FormProps<K extends FnKeys> = Pick<TypeSelector<K>, 'fields' | 'initstate' | 'arg'>



export const useDTO = <FK extends FnKeys>(fn_type: Enum_NodesAction & string) => {
    type FProps = FormProps<FK>
    type OutPut<T extends FnKeys> = Output_v3<T>
    type ArgType = FormProps<FK>['arg']
    const createOutput = (fn: IFunctions[FK], ...saved_args: FormProps<FK>['arg'][]) => {
        const out = (arg: ArgType) => {
            const res = {
                arg: [arg],
                output: []
            }

        }
        saved_args && saved_args.forEach((sa) => {

            const current = { sa, output: [] }
        })

        return out
    }



    const formProps = (initState: FormProps<FK>['arg']): FormProps<FK> => {

        const f = Object.keys(initState) as (keyof ArgsList[typeof fn_type])[]
        return {
            fields: f,
            initstate: initState as StringifyProps<ArgsList[FK]>,
            arg: initState


        }
    }
    return { createOutput, formProps }
}