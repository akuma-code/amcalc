import { IFormFieldsValues, InputsTypeEnum } from "./useFormStateSelector";
import { ArgsTypes, ArgsTypesList } from "../Models/ArgsTypeModel";
import { dto_formStates } from "../Components/FlexForm/DTO_Forms";
import { useForm } from "react-hook-form";
import { ISizeShort, ISizeFull } from "../Interfaces/CommonTypes";
import { _log } from "../Helpers/HelpersFns";
import { FieldsLabelEnum, FormDTOList, FormDTOListWithMethods, GetFormInstaceState, GetFormState__ } from "../ActionComponents/ActionTypes/ReducerTypes";
import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types";



export type AnyArg = ArgsTypesList[keyof ArgsTypesList]


export function useDinamicFields_(store_id: ArgsTypes) {

    const { fields, init } = state_list(store_id)

    const methods = useForm<typeof init>()
    let updatedFields = fields.map((f, idx) => ({ fieldName: f, order: idx }))
    return [updatedFields, methods] as const



}


const GetFieldsArray = <T extends AnyArg>(o: T) => {
    const k = [] as (keyof T & string)[]
    for (let key in o) {
        if (typeof key === 'string') k.push(key)
    }
    return k
}

const dto_formSelector = (store_id: ArgsTypes) => {

    const compute_form = (state_id: ArgsTypes) => dto_formStates[state_id]


    switch (store_id) {

        case InputsTypeEnum.size_full: {
            const RES = compute_form(store_id) as GetFormState__<ISizeFull>
            return RES
        }
        case InputsTypeEnum.offset5: {
            const RES = compute_form(store_id) as GetFormState__<Fn_Args_offset5>
            return RES
        }

        default: { throw new Error("State select invalid") }
    }

}

const MakeInputs = <T extends AnyArg>(args: T) => {
    const fields = GetFieldsArray(args)


    const inputsArray = fields.map((f, idx) => {
        return { field: f, label: FieldsLabelEnum[f as keyof AnyArg], order: idx }
    })
    return inputsArray
}




const state_list = (store_id: ArgsTypes) => {
    const dto: GetFormInstaceState<AnyArg> = { ...dto_formStates[store_id], store_id: dto_formStates[store_id].type }
    switch (store_id) {

        case InputsTypeEnum.size_full: {
            return dto as GetFormInstaceState<ISizeFull>
        }
        case InputsTypeEnum.offset5: {
            return dto as GetFormInstaceState<Fn_Args_offset5>
        }

        default: { throw new Error("State select invalid") }
    }
}