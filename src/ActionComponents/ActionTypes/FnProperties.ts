import { ISizeFull } from "../../Interfaces/CommonTypes";
import { ANYobj } from "../../Interfaces/MathActionsTypes";

export type FnPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

export type FnProperties<T> = Pick<T, FnPropertyNames<T>>;

export type NonFnPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

export type NonFnProperties<T> = Pick<T, NonFnPropertyNames<T>>;

export type StringifyProps<T> = { [K in keyof T]: T[K] extends string ? T : T[K] extends number ? string | number : string }

type FnArgsType<T> = { [K in keyof T]: T[K] extends Function ?
    T[K] extends (arg: infer A) => any ?
    K : never
    : never }[keyof T]

type StringifyProps_2<T> = {
    [K in keyof T]: T[K] extends string ?
    T :
    T[K] extends number ?
    "" :
    T
}

// export type GetFieldsArray<T extends ANYobj> =
//     T extends T[infer Key extends keyof T] ?
//     { fields: readonly Key[] }
//     :
//     { fields: readonly (keyof T)[] }

export type GetFieldsArray<T extends ANYobj> = { [Field in keyof T]: T[Field] extends number | string ? { fields: readonly [Field[]] } : never }




