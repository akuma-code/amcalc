import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types"
import { InputsTypeEnum } from "../Hooks/useFormStateSelector"
import { ANYobj } from "./MathActionsTypes"

export interface ISizeShort {
    w: number
    h: number
}
export interface ISizeFull {
    height: number
    width: number
}

export type ISize = ISizeFull | ISizeShort
export type ISizeTuple = readonly [width: number, height: number]
export class SizeShort {
    argType: string = 'size_short'
    constructor(
        public w: number,
        public h: number
    ) { }
}

export class SizeFull {
    argType: InputsTypeEnum = InputsTypeEnum.size_full
    constructor(
        public width: number, public height: number
    ) { }
}


export function _isFullSize(size: ISize): size is ISizeFull {
    if ('width' in size) return true
    else return false
}

export interface Arg_Size {
    argType: InputsTypeEnum.size_full
    args: ISizeFull
}

export interface Arg_Offset5 {
    argType: InputsTypeEnum.offset5
    args: Fn_Args_offset5
}

export type ArgsUnion =
    | Arg_Offset5
    | Arg_Size