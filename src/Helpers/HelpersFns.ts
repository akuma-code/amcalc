import { v4 } from 'uuid'
import { DTO_EXPORT, IFuncArgs, IFuncsList } from '../ActionComponents/ActionTypes/Types'


export const _log = console.log

export const _styleSet = (...args: string[]): string => {
    return args.join(' ')
}

export const _promptVar = (msg: string) => prompt(msg) ?? ""

export const _ID = () => v4().slice(0, 4)

export const _deg2rad = (deg: number) => (deg * Math.PI) / 180.0

export const _rad2deg = (rad: number) => (rad * 180) / Math.PI

export const _isArr = (obj: any) => Array.isArray(obj)

export const getFormFields = <Args extends IFuncArgs>(args: Args): { fields: keyof Args[] } => {
    const keys = Object.keys(args) as unknown as keyof Args[]
    return { fields: keys }
}

export const dto_Export = (fn: IFuncsList, initState: IFuncArgs): DTO_EXPORT => {

    const { fields } = getFormFields(initState)
    const dto: DTO_EXPORT = {
        fn: fn,
        fields,
        initState
    }
    return dto
}
