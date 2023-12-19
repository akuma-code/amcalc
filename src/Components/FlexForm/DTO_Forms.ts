import { GetFormState__ } from "../../ActionComponents/ActionTypes/ReducerTypes"
import { Fn_Args_offset5 } from "../../ActionComponents/ActionTypes/Types"
import { IFormFieldsValues, InputsTypeEnum } from "../../Hooks/useFormStateSelector"
import { A_Sill, ISizeFull } from "../../Interfaces/CommonTypes"
import { ANYobj } from "../../Interfaces/MathActionsTypes"
import { Args_Sill } from "./MultiForms/MultiFieldsForm"


export interface DTO_state<O extends ANYobj> {
    fields: readonly (keyof O)[]
    init: O
    payload?: O,
    saved?: O[]
    placeholder?: { [key in keyof O]?: string }
    desc?: string

}

const dto_state_FullSize: GetFormState__<ISizeFull> = {
    type: InputsTypeEnum.size_full,
    fields: ['width', "height"] as const,
    init: { height: 0, width: 0 },
    desc: "Ширина и высота",
}
const dto_state_Sill: GetFormState__<Args_Sill> = {
    type: InputsTypeEnum.size_full,
    fields: ['L', "B", "count"] as const,
    init: { L: 0, B: 0, count: 1 },
    desc: "Отливы",
}
const dto_state_Offse5: GetFormState__<Fn_Args_offset5> = {
    type: InputsTypeEnum.offset5,
    fields: ['H', "W", "h", "da", "db"] as const,
    init: { H: 0, W: 0, da: 0, db: 0, h: 0 },

    desc: "Смещение верхнего угла трапеции",
}
// const dto_state_Size: GetFormState__<ISizeShort> = {
//     type: InputsTypeEnum.size_short,
//     fields: ['w', "h"],
//     init: { w: 0, h: 0 },
//     desc: "Ш и В",
// }

//! *** DTO Forms Data *** 
export const dto_formStates: IFormFieldsValues = {
    size_full: dto_state_FullSize,
    offset5: dto_state_Offse5,
    sill: dto_state_Sill

}
//! *** DTO Forms Data ***


