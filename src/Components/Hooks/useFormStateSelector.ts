import { ArgsTypesList } from "../../Models/ArgsTypeModel"
import { DTO_FormStatesList } from "../FlexForm/DTO_Forms"
import { GetFormState } from "../../ActionComponents/ActionTypes/ReducerTypes"
import { ISize, ISizeFull } from "../../Interfaces/CommonTypes"
import { Fn_Args_offset5 } from "../../ActionComponents/ActionTypes/Types"

export enum InputsTypeEnum {
    size_full = 'size_full',
    offset5 = 'offset5',
    size = 'size'
}
export type FormAction<T extends InputsTypeEnum> = {
    type: T
    payload: DTO_FormStatesList[T]['payload']
}


export type DTO_ARGS =
    | ISizeFull
    | ISize
    | Fn_Args_offset5



type FormStates = { [Key in keyof ArgsTypesList]: GetFormState<ArgsTypesList[Key]> }






