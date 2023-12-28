import { v4 } from 'uuid'
import { DTO_EXPORT, IC_FuncArgs, IC_FuncsList } from '../ActionComponents/ActionTypes/Types'
import { Brand, ISize, ISizeTuple, _isFullSize } from '../Interfaces/CommonTypes'
import { ANYobj } from '../Interfaces/MathActionsTypes'


export const _log = console.log
export const _toJSON = (o: ANYobj) => JSON.parse(JSON.stringify(o, null, 2))

export const _styleSet = (...args: string[]): string => {
    return args.join(' ')
}

export const _promptVar = (msg: string) => prompt(msg) ?? ""

export const _ID = () => v4().slice(0, 4)

export const _deg2rad = (deg: number) => (deg * Math.PI) / 180.0

export const _rad2deg = (rad: number) => (rad * 180) / Math.PI

export const _isArr = (obj: any): obj is any[] => Array.isArray(obj)

export const getFormFields = <Args extends IC_FuncArgs>(args: Args): { fields: keyof Args[] } => {
    const keys = Object.keys(args) as unknown as keyof Args[]
    return { fields: keys }
}

export const dto_Export = (fn: IC_FuncsList, initState: IC_FuncArgs): DTO_EXPORT => {

    const { fields } = getFormFields(initState)
    const dto: DTO_EXPORT = {
        fn: fn,
        fields,
        initState
    }
    return dto
}

export function _sizeTuppler(size: ISize): ISizeTuple {
    if (_isFullSize(size)) return [size.width, size.height] as const
    else return [size.w, size.h] as const
}

export const _addProp = <T, P>(obj: T | T[], prop: P): Brand<T, P> | Brand<T, P>[] => {
    if (_isArr(obj)) return obj.map(o => ({ ...o, ...prop }))
    else return { ...obj, ...prop }
}