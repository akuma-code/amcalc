import { StringifyProps } from "../ActionComponents/ActionTypes/FnProperties"
import { FormStatePlaceHolder } from "../ActionComponents/ActionTypes/ReducerTypes"
import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types"
import { Args_Sill } from "../Components/FlexForm/MultiForms/MultiFieldsForm"

import { ISizeShort, ISizeFull } from "../Interfaces/CommonTypes"
import { ANYobj } from "../Interfaces/MathActionsTypes"

export enum ArgsTypesEn {
    size_full = 'size_full',
    offset5 = 'offset5',
    sill = 'sill'
}
export interface ArgsTypesList {
    size_full: ISizeFull
    sill: Args_Sill
    offset5: Fn_Args_offset5
}




export type ArgsTypes =
    | 'size_full'
    | 'offset5'
    | 'sill'


export type DTO_InputsProp = {
    init: ANYobj
    fields: readonly (keyof ANYobj)[]
    placeholder?: { [key: string]: string }
    desc?: string
}
export interface DTO_InputSizeFull {
    fields: readonly (keyof ISizeFull)[]
    init: ISizeFull
    placeholder?: FormStatePlaceHolder<ISizeFull>
    desc?: string
}
// export interface DTO_InputSize {
//     fields: readonly (keyof ISizeShort)[]
//     init: ISizeShort
//     placeholder?: FormStatePlaceHolder<ISizeShort>
//     desc?: string
// }

export interface DTO_InputOffset5 {
    fields: readonly (keyof Fn_Args_offset5)[]
    init: Fn_Args_offset5
    placeholder?: FormStatePlaceHolder<Fn_Args_offset5>
    desc?: string
}
export interface DTO_FormDataList {
    size_full: DTO_InputSizeFull

    offset5: DTO_InputOffset5
}
