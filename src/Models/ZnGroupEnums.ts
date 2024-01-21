export const enum ZhTYPE {
    viteo = 'viteo',
    iso = 'isolite',
}

export const enum ISOPriceGroups {
    isolite_1 = 'Isolite гр. А',
    isolite_2 = 'Isolite гр. Б',
    isolite_3 = 'Isolite гр. В',
    isolite_4 = 'Isolite гр. Г',
    isolite_5 = 'Isolite гр. Д',
    isolite_6 = 'Isolite гр. Е',
    isolite_7 = 'Isolite гр. Ж',
    isolite_8 = 'Isolite гр. З',
    isolite_9 = 'Isolite гр. И',
    isolite_10 = 'Isolite гр. К',
    isolite_11 = 'Isolite гр. Л',
    isolite_12 = 'Isolite гр. М'

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
