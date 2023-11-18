import { FormState } from "react-hook-form"
import { DTO_ARGS, InputsTypeEnum } from "../../Components/Hooks/useFormStateSelector"
import { ISize, ISizeFull } from "../../Interfaces/CommonTypes"
import { ANYfn, ANYobj } from "../../Interfaces/MathActionsTypes"
import { ArgsTypesList } from "../../Models/ArgsTypeModel"

import { Fn_Args_offset5 } from "./Types"

export enum SAVE_ARG {
    save_size_full = 'save_full_size',
    save_size = 'save_size',
    save_offset5 = 'save_offset5'
}

interface FState {
    fields: readonly (keyof ANYobj & string)[]
    saved: any[]
    type: InputsTypeEnum
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
    type: InputsTypeEnum.size
    state: FormSelectorState<ISize>
}

export interface ISaveFullSize {
    type: SAVE_ARG.save_size_full
    payload: ISizeFull
}
export interface ISaveSize {
    type: SAVE_ARG.save_size
    payload: ISize
}
export interface ISaveOffset5 {
    type: SAVE_ARG.save_offset5
    payload: Fn_Args_offset5
}

export type ISaveArgsActions =
    | ISaveFullSize
    | ISaveSize
    | ISaveOffset5


export type FormState_Fields<Arg extends ANYobj> = ReadonlyArray<keyof Arg>
export type FormState_Saved<Arg extends ANYobj> = Array<Arg>
export type FormStatePlaceHolder<Arg extends ANYobj> = { [K in keyof Arg]: string }
export type FormStateInit<Arg extends ANYobj> = { readonly [K in keyof Arg]: "" }


export type GetFormState<T extends DTO_ARGS> = {
    fields: FormState_Fields<T>
    placeholder: FormStatePlaceHolder<T>
    saved: FormState_Saved<T>
    init: FormStateInit<T>

}
// export type FormStateProps<Arg extends DTO_ARGS> = { placeholder?: { [KEY in Arg ]?: string }, desc?: string }
export type FormInstaceState<ARGS extends DTO_ARGS> = {
    fields: FormState_Fields<ARGS>
    init: ARGS
    saved: FormState_Saved<ARGS>
    desc?: string
    placeholder?: FormStatePlaceHolder<ARGS>
}

export type DTO_FormsInstance<I extends InputsTypeEnum> = FormInstaceState<ArgsTypesList[I]>


export type IFormInstances = { [Key in InputsTypeEnum]: DTO_FormsInstance<Key> }