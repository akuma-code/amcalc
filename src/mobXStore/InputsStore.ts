import { makeAutoObservable } from "mobx";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { ArgsTypes, ArgsTypesList, DTO_InputOffset5, DTO_InputSize, DTO_InputSizeFull, DTO_InputsProp } from "../Models/ArgsTypeModel";

export interface Mbx_InputsStore<T extends ArgsTypes> {
    type: T
    saved: ArgsTypesList[T][]
}

export interface Mbx_InputState {
    type: ArgsTypes
    args: ArgsTypesList[ArgsTypes]
}

export class InputsStore {
    public saved: Record<string, Mbx_InputState['args'][]> = {}
    public inpType: ArgsTypes = 'size_full'
    constructor() {
        makeAutoObservable(this)
    }
    save(type: ArgsTypes, args: ArgsTypesList[ArgsTypes]) {
        if (!this.saved[type]) this.saved[type] = []
        this.saved[type] = [...this.saved[type], args]
    }

    load(type: ArgsTypes) {
        return this.saved[type]
    }

    clear(type?: ArgsTypes) {
        if (!type) return this.saved = {}
        return this.saved[type] = []
    }

    get_form_data(type: ArgsTypes) {
        return dto_form(type)
    }
    changeInpType(type: ArgsTypes) {
        this.inpType = type
    }
}




const dto_form = (type: ArgsTypes = 'size_full') => {

    const dto_formFullSizes: DTO_InputSizeFull = {
        fields: ["width", 'height',],
        init: { height: 0, width: 0, },
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

    const output = {
        offset5: dto_formOffset5,
        size: dto_formSizes,
        size_full: dto_formFullSizes
    }

    return output[type]
}