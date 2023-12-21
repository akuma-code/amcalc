import { Fn_Args_offset5 } from "../ActionComponents/ActionTypes/Types"
import { Args_Sill } from "../Components/FlexForm/MultiForms/MultiFieldsForm"
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
        public width: number,
        public height: number
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
export class A_Sill implements Args_Sill {
    argType: ArgsTypes = 'sill'
    constructor(
        public L: number,
        public B: number,
        public count: number = 1
    ) { }
}
export type Brand<T, B> = T & B
export type BrandType<T, BType> = Brand<T, { argType: BType }>
export type WithArgType = { argType: ArgsTypes }

type UnpackArray<T> = T extends (infer R)[] ? R : T


export function _isFullSize(size: ISize): size is ISizeFull {
    if ('width' in size) return true
    else return false
}
export function _ArgsMaker(args: AnyArg) {
    if ('width' in args) { return new A_Size(args.width, args.height) }
    if ('da' in args) { return new A_Offset5(args.W, args.H, args.h, args.da, args.db) }
    if ('L' in args) { return new A_Sill(args.L, args.B, args.count) }
    return args
}
export function _ArgsMaker2(args: AnyArg) {
    if ('width' in args) {
        const type: ArgsTypes = 'size_full'
        return { argType: type, ...args }
    }
    if ('da' in args) {
        const type: ArgsTypes = 'offset5'
        return { argType: type, ...args }
    }
    if ('L' in args) {
        const type: ArgsTypes = 'sill'
        return { argType: type, ...args }
    }
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

type ArgsUnion =
    | Arg_Offset5
    | Arg_Size

export type A_InputArgs =
    | A_Size
    | A_Offset5
    | A_Sill

export type A_InputArgsList = {
    size_full: A_Size
    sill: A_Sill
    offset5: A_Offset5
}
export type A_InputArgs2 = |
    {
        argType: ArgsTypes
    } & Omit<A_Size, 'argType'>
    | {
        argType: ArgsTypes
    } & Omit<A_Offset5, 'argType'>