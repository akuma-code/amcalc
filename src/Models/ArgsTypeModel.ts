import { StringifyProps } from "../ActionComponents/ActionTypes/FnProperties"
import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types"
import { ISize, ISizeFull } from "../Interfaces/CommonTypes"

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

export type DTO_InputsProp<T extends ArgsTypes> = {
    init: ArgsTypesList[T]
    fields: readonly (keyof ArgsTypesList[T])[]
    placeholder?: { [key: string]: string }
    desc?: string
}
export interface DTO_InputSizeFull {
    fields: readonly (keyof ISizeFull)[]
    init: ISizeFull
    placeholder?: { width: string, height: string }
    desc?: string
}

export interface DTO_InputOffset5 {
    fields: readonly (keyof Fn_Args_offset5)[]
    init: Fn_Args_offset5
    placeholder?: StringifyProps<Fn_Args_offset5>
    desc?: string
}
export interface DTO_FormDataList {
    nets: DTO_InputSizeFull
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
const dto_formOffset5: DTO_InputOffset5 = {
    fields: ['H', "W", "da", "db", "h"],
    init: { H: 0, W: 0, da: 0, db: 0, h: 0 },
    placeholder: {
        H: "Высота",
        W: "Ширина",
        da: "дельта А",
        db: "делта Б",
        h: "Высота мин"
    },
    desc: "Смещение верхнего угла трапеции"
}

export const dto_formdata: DTO_FormDataList = { nets: dto_formFullSizes, offset5: dto_formOffset5 }