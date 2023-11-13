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

export type ArgsTypes = {}