import { StringifyProps } from "../ActionComponents/ActionTypes/FnProperties"
import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types"
import { ISize, ISizeFull } from "../Interfaces/CommonTypes"
import { ANYobj } from "../Interfaces/MathActionsTypes"

export enum ArgsTypesEn {
    'size_full', 'offset5', 'size',
}
export interface ArgsTypesList {
    size_full: ISizeFull
    size: ISize,
    offset5: Fn_Args_offset5
}

export type ArgsTypes =
    | 'size_full'
    | 'offset5'
    | 'size'

export type DTO_InputsProp = {
    init: ANYobj
    fields: readonly (keyof ANYobj)[]
    placeholder?: { [key: string]: string }
    desc?: string
}
export interface DTO_InputSizeFull {
    fields: readonly (keyof ISizeFull)[]
    init: ISizeFull
    placeholder?: { width: string, height: string }
    desc?: string
}
export interface DTO_InputSize {
    fields: readonly (keyof ISize)[]
    init: ISize
    placeholder?: { w: string, h: string }
    desc?: string
}

export interface DTO_InputOffset5 {
    fields: readonly (keyof Fn_Args_offset5)[]
    init: Fn_Args_offset5
    placeholder?: StringifyProps<Fn_Args_offset5>
    desc?: string
}
export interface DTO_FormDataList {
    size_full: DTO_InputSizeFull
    size: DTO_InputSize
    offset5: DTO_InputOffset5
}
const dto_formFullSizes: DTO_InputSizeFull = {
    fields: ['height', "width"],
    init: { height: 0, width: 0 },
    placeholder: {
        height: "Высота",
        width: "Ширина"
    },
    desc: "Ширина и высота"
}
const dto_formSizes: DTO_InputSize = {
    fields: ['w', "h"],
    init: { w: 0, h: 0 },
    placeholder: {
        h: "Высота",
        w: "Ширина"
    },
    desc: "Ширина и высота"
}
const dto_formOffset5: DTO_InputOffset5 = {
    fields: ['H', "W", "da", "db", "h"],
    init: { H: 0, W: 0, da: 0, db: 0, h: 0 },
    placeholder: {
        H: "Высота",
        W: "Ширина",
        da: "дельта А",
        db: "дельта Б",
        h: "Высота мин"
    },
    desc: "Смещение верхнего угла трапеции"
}

export const dto_formdata: DTO_FormDataList = { size_full: dto_formFullSizes, offset5: dto_formOffset5, size: dto_formSizes }