export enum LABELS_LIST {
    width = 'Ширина',
    height = 'Высота',
    skf = 'СКФ',
    simple = 'Простая',
    both = 'Общий вид',
    w = 'ширина',
    h = 'высота мин',
    W = 'ширина',
    H = 'высота',
    da = 'дельта А',
    db = 'дельта Б',
    size = 'Размеры (w,h)',
    size_full = 'Размеры',
    offset5 = 'Смещение',
    sill = 'Отливы',
    L = 'длина',
    B = 'ширина',
    count = 'количество',
}

export enum ZLABEL {
    viteo_E = 'Viteo E',
    viteo_1 = 'Viteo 1',
    viteo_2 = 'Viteo 2',
    viteo_3 = 'Viteo 3',
    viteo_4 = 'Viteo 4',
    viteo_5 = 'Viteo 5',
    viteo_6 = 'Viteo 6',
}

export type TSides = readonly ['top', 'right', 'bottom', 'left']
export type TSide = TSides[number]
export const TSidesArray: TSides = ['top', 'right', 'bottom', 'left']
export const enum IFrameVariantsEnum {
    f = 'f',
    ff = 'ff',
    fff = 'fff',

}
export type IFrameVariants = keyof typeof IFrameVariantsEnum