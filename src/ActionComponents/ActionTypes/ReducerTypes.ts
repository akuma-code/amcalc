import { FormState, UseFormReturn } from "react-hook-form"
import { DTO_ARGS, InputsTypeEnum } from "../../Components/Hooks/useFormStateSelector"
import { ISizeShort, ISizeFull, SizeShort, SizeFull } from "../../Interfaces/CommonTypes"
import { ANYfn, ANYobj } from "../../Interfaces/MathActionsTypes"
import { ArgsTypesList } from "../../Models/ArgsTypeModel"

import { Fn_Args_offset5 } from "./Types"
import { AnyArg } from "../../Components/Hooks/useDynamicInputs"
import { _log } from "../../Helpers/HelpersFns"

export enum SAVE_ARG {
    save_size_full = 'save_full_size',
    save_size = 'save_size',
    save_offset5 = 'save_offset5'
}

export enum FieldsLabelEnum {
    width = 'ширина',
    height = 'высота',
    w = 'ширина мин',
    h = 'высота мин',
    W = 'ширина макс',
    H = 'высота макс',
    da = 'дельта А',
    db = 'дельта Б',
}


export type FormSelectorState<A extends ArgsTypesList[keyof ArgsTypesList]> = {
    fields: readonly (keyof A)[]
    saved: A[]
    type: InputsTypeEnum
}
export interface ArgState_FullSize {
    type: InputsTypeEnum.size_full
    state: FormSelectorState<ISizeFull>
}
export interface ArgState_Offse5 {
    type: InputsTypeEnum.offset5
    state: FormSelectorState<Fn_Args_offset5>
}
export interface ArgState_Size {
    type: InputsTypeEnum.size_short
    state: FormSelectorState<ISizeShort>
}

export interface ISaveFullSize {
    type: SAVE_ARG.save_size_full
    payload: ISizeFull
}
export interface ISaveSize {
    type: SAVE_ARG.save_size
    payload: ISizeShort
}
export interface ISaveOffset5 {
    type: SAVE_ARG.save_offset5
    payload: Fn_Args_offset5
}

export type ISaveArgsActions =
    | ISaveFullSize
    | ISaveSize
    | ISaveOffset5


export type FormState_Fields<Arg extends AnyArg> = ReadonlyArray<keyof Arg & string>
export type FormState_Saved<Arg extends AnyArg> = Array<Arg>
export type FormStatePlaceHolder<Arg extends AnyArg> = { [K in keyof Arg]: string }
export type FormStateInit<Arg extends AnyArg> = Arg


export type GetFormState__<T extends DTO_ARGS> = {
    type: InputsTypeEnum
    fields: FormState_Fields<T>
    // placeholder: FormStatePlaceHolder<T>
    // saved?: FormState_Saved<T>
    init: FormStateInit<T>
    desc?: string

}



export type GetFormInstaceState<T> = T extends ANYobj ?
    T extends AnyArg ?
    {
        store_id: InputsTypeEnum
        fields: ReadonlyArray<keyof T>
        init: T
        desc?: string

    } : never : never

export type FormDTOList = { [Key in keyof ArgsTypesList]: GetFormInstaceState<ArgsTypesList[Key]> }

export type FormDTOListWithMethods = { [Key in keyof FormDTOList]: FormDTOList[Key] & { methods: UseFormReturn<ArgsTypesList[Key]> } }
