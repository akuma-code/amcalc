import { DTO_FormDataList, DTO_InputOffset5, DTO_InputSize, DTO_InputSizeFull } from "../../Models/ArgsTypeModel"

const dto_formFullSizes: DTO_InputSizeFull = {
    fields: ['height', "width"],
    init: { height: 0, width: 0 },
    placeholder: {
        height: "Высота",
        width: "Ширина"
    },
    desc: "Ширина и высота"
}
const dto_formSizes: DTO_InputSize = {
    fields: ['w', "h"],
    init: { w: 0, h: 0 },
    placeholder: {
        h: "Высота",
        w: "Ширина"
    },
    desc: "Ширина и высота"
}
const dto_formOffset5: DTO_InputOffset5 = {
    fields: ['H', "W", "da", "db", "h"],
    init: { H: 0, W: 0, da: 0, db: 0, h: 0 },
    placeholder: {
        H: "Высота",
        W: "Ширина",
        da: "дельта А",
        db: "дельта Б",
        h: "Высота мин"
    },
    desc: "Смещение верхнего угла трапеции"
}

export const dto_formdata: DTO_FormDataList = { size_full: dto_formFullSizes, offset5: dto_formOffset5, size: dto_formSizes }