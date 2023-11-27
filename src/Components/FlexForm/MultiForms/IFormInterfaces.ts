import { ANYobj } from "../../../Interfaces/MathActionsTypes"
import { AnyArg } from "../../Hooks/useDynamicInputs"
export interface GetFieldsArrayFn<T extends ANYobj> { (args: T): Array<keyof T> }
export interface IBaseFormInput {
    fieldName: string
    inputProps: any
    label?: string
    placeholder?: string
    defaultValue?: string
}

