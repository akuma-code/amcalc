import { ANYobj } from "./MathActionsTypes"

export interface ISizeShort {
    w: number
    h: number
}
export interface ISizeFull {
    width: number
    height: number
}

export type ISize = ISizeFull | ISizeShort
export type ISizeTuple = readonly [width: number, height: number]
export class SizeShort {
    constructor(
        public w: number,
        public h: number
    ) { }
}

export class SizeFull {
    constructor(
        public width: number, public height: number
    ) { }
}


export function _isFullSize(size: ISize): size is ISizeShort {
    if ('w' in size) return true
    else return false
}

