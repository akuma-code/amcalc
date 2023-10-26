import { StringifyProps } from "../ActionComponents/ActionTypes/FnProperties"
import { ArgsList, FnKeys, IFunctions } from "../ActionComponents/ActionTypes/Types"

export interface ISize {
    w: number
    h: number
}

export interface ISizeFull {
    width: number
    height: number
}

export interface CommonProps<T extends FnKeys> {
    type: T
    initstate: StringifyProps<ArgsList[T]>
    args: ArgsList[T]
    fn: IFunctions[T]
    output: ReturnType<IFunctions[T]>
    fields: StringifyProps<ArgsList[T]>[]
}