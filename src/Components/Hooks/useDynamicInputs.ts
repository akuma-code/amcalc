import { useMemo, useState } from "react";
import { DataStore, IRootStores_v1, RootArgsStore_v1 } from "../../Context/RootStore";
import { ANYobj } from "../../Interfaces/MathActionsTypes";
import { dto_forms } from "../../mobXStore/InputsStore";
import { DTO_ARGS, IFormFieldsValues, InputsTypeEnum } from "./useFormStateSelector";
import { ArgsTypes, ArgsTypesList, DTO_FormDataList } from "../../Models/ArgsTypeModel";
import { DTO_state, dto_formStates } from "../FlexForm/DTO_Forms";
import { Path, UseFormRegister, useForm, useFormContext } from "react-hook-form";
import { useStoresContext } from "./useStoresContext";
import { ISize, ISizeFull } from "../../Interfaces/CommonTypes";
import { _log } from "../../Helpers/HelpersFns";
import { FieldsLabelEnum, GetFormState } from "../../ActionComponents/ActionTypes/ReducerTypes";
import { Fn_Args_offset5 } from "../../ActionComponents/ActionTypes/Types";


export enum RS_v1Actions {
    SAVE_DATA = 'save_data',
    LOAD_STORE = 'load_store',
    USE = 'use',
    CLEAR_STORE = 'clear_store',
}

export type AnyArg = ArgsTypesList[keyof ArgsTypesList]
export interface RS_v1_SaveData<T extends DTO_ARGS> {
    type: RS_v1Actions.SAVE_DATA
    payload: { store_id: InputsTypeEnum, data: T }
}
export interface RS_v1_LoadStore {
    type: RS_v1Actions.LOAD_STORE
    payload: { store_id: InputsTypeEnum }
}
export interface RS_v1_ClearStore {
    type: RS_v1Actions.CLEAR_STORE
    payload: { store_id: InputsTypeEnum }
}
export interface RS_v1_AddStore<T extends ANYobj> {
    type: RS_v1Actions.USE
    payload: { store_id: InputsTypeEnum, store: DataStore<T> }
}
export type IRootStore_v1Actions =
    | RS_v1_AddStore<AnyArg>
    | RS_v1_ClearStore
    | RS_v1_SaveData<AnyArg>
// | RS_v1_LoadStore
export interface IStateActions {
    save: (data: any) => void
    load: (data: any) => void
    search: (data: any) => void
    delete: (data: any) => void
}
type DynamicFormStateValues = IFormFieldsValues[keyof IFormFieldsValues]


const initState = (o: IFormFieldsValues): ArgsTypesList => {

    const { offset5, size, size_full } = o
    const r: { [K in keyof ArgsTypesList]: ArgsTypesList[K] } = {
        offset5: offset5.init,
        size_full: size_full.init,
        size: size.init
    }
    return r

}

const GetFieldsArray = <T extends AnyArg>(o: T) => {
    const k = [] as (keyof T & string)[]
    for (let key in o) {
        if (typeof key === 'string') k.push(key)
    }
    return k
}

const dto_formSelector = (store_id: InputsTypeEnum) => {

    const compute_form = (state_id: InputsTypeEnum) => dto_formStates[state_id]


    switch (store_id) {

        case InputsTypeEnum.size_full: {
            const RES = compute_form(store_id) as GetFormState<ISizeFull>
            return RES
        }
        case InputsTypeEnum.offset5: {
            const RES = compute_form(store_id) as GetFormState<Fn_Args_offset5>
            return RES
        }
        case InputsTypeEnum.size: {
            const RES = compute_form(store_id) as GetFormState<ISize>
            return RES
        }
        default: { throw new Error("State select invalid") }
    }

}

export function useDynamicInputs(state_id: InputsTypeEnum) {
    const { init } = dto_formSelector(state_id)
    const methods = useForm<typeof init>()

    const inputPropArray = MakeInputs<typeof init>(init)

    // return inputPropArray.map(p => ({ ...p, register }))
    return [inputPropArray, methods] as const
}


const MakeInputs = <T extends AnyArg>(args: T) => {
    const fields = GetFieldsArray(args)


    const inputsArray = fields.map(f => {
        return { field: f, label: FieldsLabelEnum[f as keyof AnyArg] }
    })
    return inputsArray
}




function useDinamicInputs_(state_id: InputsTypeEnum) {


    const { fields, init, desc, placeholder, type } = dto_formSelector(state_id)

    const methods = useForm<typeof init>()

    return { fields, init, desc, placeholder, type, methods }
}
