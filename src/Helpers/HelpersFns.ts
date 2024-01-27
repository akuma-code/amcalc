import { v4 } from 'uuid'
import { DTO_EXPORT, IC_FuncArgs, IC_FuncsList } from '../ActionComponents/ActionTypes/Types'
import { Brand, ISize, ISizeTuple, _isFullSize } from '../Interfaces/CommonTypes'
import { ANYobj } from '../Interfaces/MathActionsTypes'
import { DrawerPointType } from '../Models/Drower/DrawerFns'


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

export const _trim = (str: string | number) => {
    if (typeof str === 'number') return str.toString()
    else return str.split(' ')
        .join('')
        .replace(',', '.')
}

class _Size {
    constructor(
        public w: number,
        public h: number
    ) { }
}
export class _SizeF {
    constructor(
        public width: number,
        public height: number
    ) { }
}


export class _Point {

    constructor(public x: number, public y: number) { }
}
export type _CPoint = { x: number, y: number }
export type _TPoint = [x: number, y: number]
export type _AdvPoint = {
    point: _CPoint | _TPoint,
    _type: DrawerPointType
}
export const _s = (w: number, h?: number) => h ? new _Size(w, h) : new _Size(w, w)
export const _ss = (w: number, h?: number) => h ? new _SizeF(w, h) : new _SizeF(w, w)
export const _p = (x: number, y: number) => new _Point(x, y) satisfies _CPoint
export const _psum = (p1: _CPoint, p2: _CPoint) => _p(p1.x + p2.x, p1.y + p2.y)