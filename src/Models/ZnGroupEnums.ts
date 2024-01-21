export const enum ZhTYPE {
    viteo = 'viteo',
    iso = 'isolite',
}

export const enum ISOPriceGroups {
    isolite_A = 'Isolite гр. А',
    isolite_B = 'Isolite гр. Б',
    isolite_C = 'Isolite гр. В',
    isolite_D = 'Isolite гр. Г',
    isolite_E = 'Isolite гр. Д',
    isolite_F = 'Isolite гр. Е',
    isolite_G = 'Isolite гр. Ж',
    isolite_H = 'Isolite гр. З',
    isolite_I = 'Isolite гр. И',
    isolite_J = 'Isolite гр. К',
    isolite_K = 'Isolite гр. Л',
    isolite_L = 'Isolite гр. М'

}
export const enum ViteoPriceGroups {
    viteo_E = "Viteo гр. E",
    viteo_1 = "Viteo гр. 1",
    viteo_2 = "Viteo гр. 2",
    viteo_3 = "Viteo гр. 3",
    viteo_4 = "Viteo гр. 4",
    viteo_5 = "Viteo гр. 5",
    viteo_6 = "Viteo гр. 6"
}
export type EnZhGroupKeys = keyof typeof ViteoPriceGroups | keyof typeof ISOPriceGroups;
export type DiscremZhGroups =
    | { type: ZhTYPE.viteo, groupNames: Array<keyof typeof ViteoPriceGroups> }
    | { type: ZhTYPE.iso, groupNames: Array<keyof typeof ISOPriceGroups> }
