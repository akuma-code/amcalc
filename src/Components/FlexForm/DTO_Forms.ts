import { DTO_FormsInstance, GetFormState, IFormInstances } from "../../ActionComponents/ActionTypes/ReducerTypes"
import { Fn_Args_offset5 } from "../../ActionComponents/ActionTypes/Types"
import { ISize, ISizeFull } from "../../Interfaces/CommonTypes"
import { ANYobj } from "../../Interfaces/MathActionsTypes"
import { ArgsTypes, ArgsTypesList, DTO_FormDataList, DTO_InputOffset5, DTO_InputSize, DTO_InputSizeFull } from "../../Models/ArgsTypeModel"
import { IFormFieldsValues, InputsTypeEnum } from "../Hooks/useFormStateSelector"


export interface DTO_state<O extends ANYobj> {
    fields: readonly (keyof O)[]
    init: O
    payload?: O,
    saved?: O[]
    placeholder?: { [key in keyof O]?: string }
    desc?: string

}

export type DTO_FormStatesList = {
    [Key in ArgsTypes]: DTO_state<ArgsTypesList[Key]>
}


const dto_state_FullSize: GetFormState<ISizeFull> = {
    type: InputsTypeEnum.size_full,
    fields: ['height', "width"],
    init: { height: 0, width: 0 },
    placeholder: {
        height: "Высота",
        width: "Ширина"
    },
    desc: "Ширина и высота",
    saved: []
}
const dto_state_Offse5: GetFormState<Fn_Args_offset5> = {
    type: InputsTypeEnum.offset5,
    fields: ['H', "W", "da", "db", "h"],
    init: { H: 0, W: 0, da: 0, db: 0, h: 0 },
    placeholder: {
        H: "Высота",
        W: "Ширина",
        da: "дельта А",
        db: "дельта Б",
        h: "Высота мин"
    },
    desc: "Смещение верхнего угла трапеции",
    saved: []
}
const dto_state_Size: GetFormState<ISize> = {
    type: InputsTypeEnum.size,
    fields: ['w', "h"],
    init: { w: 0, h: 0 },
    placeholder: {
        h: "Высота",
        w: "Ширина"
    },
    desc: "Ш и В",
    saved: []
}

//! *** DTO Forms Data *** 
export const dto_formStates: IFormFieldsValues = {
    size_full: dto_state_FullSize,
    offset5: dto_state_Offse5,
    size: dto_state_Size
}
//! *** DTO Forms Data ***



// const dto_instance_sf: IFormInstances[InputsTypeEnum.size_full] = {
//     fields: ['height', "width"],
//     init: { width: 0, height: 0 },
//     saved: [],
//     placeholder: {
//         height: "Высота",
//         width: "Ширина"
//     },
//     desc: "Ширина и высота",
// }
// const dto_instance_s: DTO_FormsInstance<InputsTypeEnum.size> = {
//     fields: ['w', "h"],
//     init: { w: 0, h: 0 },
//     saved: []
// }
// const dto_instance_off5: DTO_FormsInstance<InputsTypeEnum.offset5> = {
//     fields: ['H', "W", "da", "db", "h"],
//     init: { H: 0, W: 0, da: 0, db: 0, h: 0 },
//     saved: [],
//     desc: "Высота макс-мин + ширина",
// }

// const dto_form_instances: IFormInstances = {
//     size_full: dto_instance_sf,
//     offset5: dto_instance_off5,
//     size: dto_instance_s
// }
// const dto_formdata: DTO_FormDataList = { size_full: dto_formFullSizes, offset5: dto_formOffset5, size: dto_formSizes }


// const dto_formFullSizes: DTO_InputSizeFull = {
//     fields: ['height', "width"],
//     init: { height: 0, width: 0 },
//     placeholder: {
//         height: "Высота",
//         width: "Ширина"
//     },
//     desc: "Ширина и высота"
// }
// const dto_formSizes: DTO_InputSize = {
//     fields: ['w', "h"],
//     init: { w: 0, h: 0 },
//     placeholder: {
//         h: "Высота",
//         w: "Ширина"
//     },
//     desc: "Ширина и высота"
// }
// const dto_formOffset5: DTO_InputOffset5 = {
//     fields: ['H', "W", "da", "db", "h"],
//     init: { H: 0, W: 0, da: 0, db: 0, h: 0 },
//     placeholder: {
//         H: "Высота",
//         W: "Ширина",
//         da: "дельта А",
//         db: "дельта Б",
//         h: "Высота мин"
//     },
//     desc: "Смещение верхнего угла трапеции"
// }
