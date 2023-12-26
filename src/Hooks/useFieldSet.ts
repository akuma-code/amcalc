import { useCallback, useState } from "react"
import { Brand } from "../Interfaces/CommonTypes"
import { ANYobj } from "../Interfaces/MathActionsTypes"
import { _ID } from "../Helpers/HelpersFns"

type TField<T> = T extends ANYobj ? Brand<_StringifyObj<T>, { _id: string }> : never
type FieldsControl = {
    add(): void
    delete(id: string): void
    edit(id: string, payload: any): void
}
type FieldSetHookProps = <T extends ANYobj>(initField: T) => readonly [TField<T>[], FieldsControl]

export const useFieldSet = <T extends ANYobj>(initState: T) => {
    const init = _ConvertToStrings(initState) as unknown as TField<T>

    const [fields, setFields] = useState<TField<T>[]>([init])

    const addFields = useCallback(() => setFields(prev => [...prev, init]), [init])
    const deleteFields = useCallback((id: string) => setFields(p => p.filter(f => f._id !== id)), [])
    const editFields = useCallback((id: string, key: keyof TField<T>, value: any) =>
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

