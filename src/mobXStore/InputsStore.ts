import { makeAutoObservable } from "mobx";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { ArgsTypes, ArgsTypesList, DTO_InputOffset5, DTO_InputSizeFull } from "../Models/ArgsTypeModel";

export interface Mbx_InputsStore {
    saved: Record<string, Mbx_InputState['args'][]>
    inpType: InputsTypeEnum
}

export interface Mbx_InputState {
    type: ArgsTypes
    args: ArgsTypesList[ArgsTypes]
}


export class Mbx_InputsStore {
    public saved: Record<string, Mbx_InputState['args'][]> = {}
    public inpType: InputsTypeEnum = InputsTypeEnum.size_full
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

    get get_form_data() {
        return dto_forms()
    }
    changeInpType(type: InputsTypeEnum) {
        this.inpType = type
    }
}




export const dto_forms = () => {

    const dto_formFullSizes: DTO_InputSizeFull = {
        fields: ["width", 'height',],
        init: { height: 0, width: 0, },
        placeholder: {
            height: "Высота",
            width: "Ширина"
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

    const forms = {
        offset5: dto_formOffset5,
        size_full: dto_formFullSizes
    }

    return forms
}