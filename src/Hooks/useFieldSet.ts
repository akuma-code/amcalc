import { useCallback, useState } from "react"
import { Brand } from "../Interfaces/CommonTypes"
import { ANYobj } from "../Interfaces/MathActionsTypes"
import { _ID } from "../Helpers/HelpersFns"
import { ArrayPath, BrowserNativeObject, FieldArrayPath, FieldValues, Primitive, UseFieldArrayProps, useFieldArray, useForm, } from "react-hook-form"

type TField_<T> = T extends ANYobj ? Brand<_StringifyObj<T>, { id: string, name: string }> : never
type FieldsControl = {
    add(): void
    delete(id: string): void
    edit(id: string, payload: any): void
}
type FieldSetHookProps = <T extends ANYobj>(initField: T) => readonly [TField_<T>[], FieldsControl]


//!                                                               
export const useFieldSet = <T extends ANYobj>(initState: T) => {
    const init = _ConvertToStrings(initState) as unknown as TField_<T>

    const [fields, setFields] = useState<TField_<T>[]>([init])

    const addFields = useCallback(() => setFields(prev => [...prev, init]), [init])
    const deleteFields = useCallback((id: string) => setFields(p => p.filter(f => f._id !== id)), [])
    const editFields = useCallback((id: string, key: keyof TField_<T>, value: any) =>
        setFields(prev => prev.map(f => f._id === id ? { ...f, [key]: value } : f)), [])
    const fieldsControl = { add: addFields, delete: deleteFields, edit: editFields }
    const fieldsetResult = [fields, fieldsControl] as const
    return fieldsetResult

}

type _StringifyObj<T extends ANYobj> = { [Key in keyof T]: T[Key] extends string ? T[Key] : string }
export function _ConvertToStrings(o: ANYobj) {
    const _temp = { ...o }
    if (!('_id' in _temp)) _temp._id = _ID()

    for (let key in o) {
        if (['_id', 'id'].includes(key)) _temp[key] = o[key]

        else _temp[key] = ""
    }
    return _temp
}

type FormValues = {
    name?: string
    id?: string
    L: number,
    B: number,
    count: number,

}

type _WithNameProp = { name?: string }



type TFields<T extends ANYobj = ANYobj> = T extends { [x: string]: Array<infer Field> } ? T : never

export type TFValues = {
    rowInput: Array<any>
}

const initRow = {
    rowInput: [{
        name: 'row',
        B: 0,
        L: 0,
        count: 0,
        id: '1'
    }]
}
const initFields = {
    rowInput: [{
        B: 0,
        L: 0,
        count: 1,
        name: 'row',

    }]
}
export type IFormPreset = {
    sill: { row: [{ L: number, B: number, count: number }], _name: 'row' },
    sillRi: { rowInput: [{ L: number, B: number, count: number }], _name: 'rowInput' },
}
export type IFPType = 'sill' | 'sillRi';
const FormPreset: IFormPreset = {
    sill: { row: [{ L: 0, B: 0, count: 1 }], _name: "row" },
    sillRi: { rowInput: [{ L: 0, B: 0, count: 1 }], _name: "rowInput" }
}
export const useControlledFieldSet = <Type extends IFPType = 'sill'>(form_preset: IFormPreset['sill'] = FormPreset.sill) => {
    const _name = `${form_preset._name}` as const

    const { register, handleSubmit, control, watch } = useForm<IFormPreset['sill']>({ defaultValues: form_preset });
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: _name

    });

    const watchFieldArray = watch(
        _name
    );
    const controlledFields = fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index]
        };
    });
    const handlers = {
        register, handleSubmit, append, remove, update, control
    }

    return [controlledFields, handlers] as const
}