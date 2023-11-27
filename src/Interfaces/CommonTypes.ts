
export interface ISize {
    w: number
    h: number
}
export interface ISizeFull {
    width: number
    height: number
}
export class Size {
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

