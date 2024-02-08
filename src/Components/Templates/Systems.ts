import { TSide } from "../../Interfaces/Enums"

export type IFrameOffset = {
    rama: number,
    imp: number,
    stv_rama: number,
    stv_imp: number,
    svet: number
    imp_shtulp?: number,
    porog?: number,
    stv: number
}

export const enum SystemProfile {
    Proline232 = 'Proline232',
    Proline = 'Proline',
    // Euroline = 'Euroline',
    // Softline = 'Softline',
    // Softline82 = 'Softline82',
    // WHS72 = 'WHS72',
    // WHS60 = 'WHS60'
}
export type ISideDirections = 'top' | 'right' | 'bottom' | 'left'
export enum ISideBorderState {
    imp = 'imp',
    stv = 'stv',
    rama = 'rama',
    porog = 'porog',
    stv_imp = 'stv_imp',
    stv_rama = 'stv_rama',
}
export type _TSideBorderState = keyof typeof ISideBorderState
export type _TSideBaseState = { [Key in TSide]: 'rama' | 'imp' }
export type IBorders = Record<ISideDirections, _TSideBorderState>
export const Proline: IFrameOffset = {
    rama: 48,
    imp: 26.5,
    stv_rama: 96,
    stv_imp: 74.5,
    imp_shtulp: 64,
    svet: -16,
    stv: 65
}

export const Proline232: IFrameOffset = {
    rama: 48,
    imp: 26.5,
    stv_rama: 99,
    stv_imp: 77.5,
    imp_shtulp: 67,
    svet: -16,
    stv: 65
}

export const OFFSET = {
    Proline, Proline232
}