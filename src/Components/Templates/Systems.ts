export type IFrameOffset = {
    rama: number,
    imp: number,
    stv_rama: number,
    stv_imp: number,
    svet: number
    imp_shtulp?: number,
    porog?: number,
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

export const Proline = {
    rama: 48,
    imp: 26.5,
    stv_rama: 96,
    stv_imp: 74.5,
    imp_shtulp: 64,
    svet: -16
}

export const Proline232 = {
    rama: 48,
    imp: 26.5,
    stv_rama: 99,
    stv_imp: 77.5,
    imp_shtulp: 67,
    svet: -16
}

export const OFFSET = {
    Proline, Proline232
}