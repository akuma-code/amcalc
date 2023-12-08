import { ArgsTypesList } from "../Models/ArgsTypeModel"
import { GetFormState__ } from "../ActionComponents/ActionTypes/ReducerTypes"
import { ISizeShort, ISizeFull } from "../Interfaces/CommonTypes"
import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types"

export enum InputsTypeEnum {
    size_full = 'size_full',
    offset5 = 'offset5',
    // size_short = 'size'
}

export type DTO_ARGS =
    | ISizeFull

    | Fn_Args_offset5



export type IFormFieldsValues = { [Key in keyof ArgsTypesList]: GetFormState__<ArgsTypesList[Key]> }






