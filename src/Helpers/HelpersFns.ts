import { v4 } from 'uuid'
import { IFuncArgs } from '../ActionComponents/ActionTypes/Types'


export const _log = console.log

export const _styleSet = (...args: string[]): string => {
    return args.join(' ')
}

export const _promptVar = (msg: string) => prompt(msg) ?? ""

export const _ID = () => v4().slice(0, 4)

export const _deg2rad = (deg: number) => (deg * Math.PI) / 180.0

export const _rad2deg = (rad: number) => (rad * 180) / Math.PI

export const _isArr = (obj: any) => Array.isArray(obj)

export const getFormFields = <Args extends IFuncArgs>(args: Args) => {
    const keys = Object.keys(args) as (keyof typeof args)[]
    return { fields: keys }
}
