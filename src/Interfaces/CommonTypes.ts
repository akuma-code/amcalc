import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types"
import { AnyArg } from "../Hooks/useDynamicInputs"
import { InputsTypeEnum } from "../Hooks/useFormStateSelector"
import { ArgsTypes } from "../Models/ArgsTypeModel"
import { ANYobj } from "./MathActionsTypes"

export interface ISizeShort {
    w: number
    h: number
}
export interface ISizeFull {
    height: number
    width: number
}
export type Offset5Ctor = new (W: number, H: number, h: number, da: number, db: number) => Fn_Args_offset5
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
export class A_Size {
    argType: ArgsTypes = 'size_full'
    constructor(
        public width: number, public height: number
    ) { }
}
export class A_Offset5 {
    argType: ArgsTypes = 'offset5'
    constructor(
        public W: number,
        public H: number,
        public h: number,
        public da: number,
        public db: number) { }
}
export type WithArgType = { argType: ArgsTypes }
export function _isFullSize(size: ISize): size is ISizeFull {
    if ('width' in size) return true
    else return false
}
export function _ArgsMaker(args: AnyArg): any {
    if ('width' in args) { return new A_Size(args.width, args.height) }
    if ('da' in args) { return new A_Offset5(args.W, args.H, args.h, args.da, args.db) }
    return args
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

export type A_InputArgs =
    | A_Size
    | A_Offset5