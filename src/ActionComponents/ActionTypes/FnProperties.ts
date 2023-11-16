export type FnPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

export type FnProperties<T> = Pick<T, FnPropertyNames<T>>;

export type NonFnPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

export type NonFnProperties<T> = Pick<T, NonFnPropertyNames<T>>;

export type StringifyProps<T> = { [K in keyof T]: T[K] extends string ? T : T[K] extends number ? string | number : string }
export type StringifyProps_2<T> = { [K in keyof T]: T[K] extends string ? T : T[K] extends number ? string : string }