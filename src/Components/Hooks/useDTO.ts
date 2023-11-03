import { useState } from "react"
import { StringifyProps } from "../../ActionComponents/ActionTypes/FnProperties"
import { IC_ArgsList, Enum_NodesAction, FnKeys, Fn_Args_nets, Fn_Args_offset5, IC_Functions, TypeSelector } from "../../ActionComponents/ActionTypes/Types"
import { _log } from "../../Helpers/HelpersFns"



type FormProps<K extends FnKeys> = Pick<TypeSelector<K>, 'fields' | 'initstate' | 'arg'>



export const useDTO = <FK extends FnKeys>(fn_type: Enum_NodesAction & string) => {

    const createOutput = (fn: IC_Functions[FK], ...saved_args: FormProps<FK>['arg'][]) => {
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
        type StringInit = StringifyProps<IC_ArgsList[typeof fn_type]>

        const f = Object.keys(initState) as (keyof StringInit)[]
        return {
            fields: f,
            initstate: initState,
            arg: initState
        }
    }


    return { createOutput, formProps }
}