import { StringifyProps } from "../ActionComponents/ActionTypes/FnProperties"
import { IC_ArgsList, FnKeys, IC_Functions } from "../ActionComponents/ActionTypes/Types"

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
    initstate: StringifyProps<IC_ArgsList[T]>
    args: IC_ArgsList[T]
    fn: IC_Functions[T]
    output: ReturnType<IC_Functions[T]>
    fields: StringifyProps<IC_ArgsList[T]>[]
}