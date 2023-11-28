import { IFormFieldsValues, InputsTypeEnum } from "./useFormStateSelector";
import { ArgsTypesList } from "../../Models/ArgsTypeModel";
import { dto_formStates } from "../FlexForm/DTO_Forms";
import { useForm } from "react-hook-form";
import { ISizeShort, ISizeFull } from "../../Interfaces/CommonTypes";
import { _log } from "../../Helpers/HelpersFns";
import { FieldsLabelEnum, FormDTOList, FormDTOListWithMethods, GetFormInstaceState, GetFormState__ } from "../../ActionComponents/ActionTypes/ReducerTypes";
import { Fn_Args_offset5 } from "../../ActionComponents/ActionTypes/Types";



export type AnyArg = ArgsTypesList[keyof ArgsTypesList]




const GetFieldsArray = <T extends AnyArg>(o: T) => {
    const k = [] as (keyof T & string)[]
    for (let key in o) {
        if (typeof key === 'string') k.push(key)
    }
    return k
}

const dto_formSelector = (store_id: InputsTypeEnum) => {

    const compute_form = (state_id: InputsTypeEnum) => dto_formStates[state_id]


    switch (store_id) {

        case InputsTypeEnum.size_full: {
            const RES = compute_form(store_id) as GetFormState__<ISizeFull>
            return RES
        }
        case InputsTypeEnum.offset5: {
            const RES = compute_form(store_id) as GetFormState__<Fn_Args_offset5>
            return RES
        }
        case InputsTypeEnum.size_short: {
            const RES = compute_form(store_id) as GetFormState__<ISizeShort>
            return RES
        }
        default: { throw new Error("State select invalid") }
    }

}

export function useDynamicInputs(state_id: InputsTypeEnum) {
    const { init } = dto_formSelector(state_id)
    const methods = useForm<typeof init>()

    const inputPropArray = MakeInputs<typeof init>(init)

    // return inputPropArray.map(p => ({ ...p, register }))
    return [inputPropArray, methods] as const
}


const MakeInputs = <T extends AnyArg>(args: T) => {
    const fields = GetFieldsArray(args)


    const inputsArray = fields.map(f => {
        return { field: f, label: FieldsLabelEnum[f as keyof AnyArg] }
    })
    return inputsArray
}




export function useDinamicFields_(store_id: InputsTypeEnum) {

    const { fields, init } = state_list(store_id)

    const methods = useForm<typeof init>()
    let updatedFields = fields.map(f => ({ fieldName: f }))
    return [updatedFields, methods] as const



}
const state_list = (store_id: InputsTypeEnum) => {
    const dto: GetFormInstaceState<AnyArg> = { ...dto_formStates[store_id], store_id: dto_formStates[store_id].type }
    switch (store_id) {

        case InputsTypeEnum.size_full: {
            return dto as GetFormInstaceState<ISizeFull>
        }
        case InputsTypeEnum.offset5: {
            return dto as GetFormInstaceState<Fn_Args_offset5>
        }
        case InputsTypeEnum.size_short: {

            return dto as GetFormInstaceState<ISizeShort>
        }
        default: { throw new Error("State select invalid") }
    }
}