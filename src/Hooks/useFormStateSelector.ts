import { ArgsTypesList } from "../Models/ArgsTypeModel"
import { GetFormState__ } from "../ActionComponents/ActionTypes/ReducerTypes"
import { ISizeShort, ISizeFull, A_Sill } from "../Interfaces/CommonTypes"
import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types"
import { Args_Sill } from "../Components/FlexForm/MultiForms/MultiFieldsForm"

export enum InputsTypeEnum {
    size_full = 'size_full',
    offset5 = 'offset5',
    sill = 'sill'
    // size_short = 'size'
}

export type DTO_ARGS =
    | ISizeFull
    | Args_Sill
    | Fn_Args_offset5



export type IFormFieldsValues = { [Key in keyof ArgsTypesList]: GetFormState__<ArgsTypesList[Key]> }






