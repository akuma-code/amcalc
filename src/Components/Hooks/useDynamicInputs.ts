import { useState } from "react";
import { DataStore, IRootStores_v1, RootArgsStore_v1 } from "../../Context/RootStore";
import { ANYobj } from "../../Interfaces/MathActionsTypes";
import { dto_forms } from "../../mobXStore/InputsStore";
import { DTO_ARGS, InputsTypeEnum } from "./useFormStateSelector";
import { ArgsTypes, ArgsTypesList, DTO_FormDataList } from "../../Models/ArgsTypeModel";
import { DTO_state } from "../FlexForm/DTO_Forms";
import { useForm, useFormContext } from "react-hook-form";


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
export type InputProps_DTO = DTO_FormDataList


export function useDinamicInputs() {
    const methods = useForm()
    const { control, } = useFormContext<DTO_FormDataList>()


}


export const rootStoreReducer = (root_store: RootArgsStore_v1, action: IRootStore_v1Actions) => {


    switch (action.type) {
        case RS_v1Actions.SAVE_DATA: {
            const { data, store_id } = action.payload

            root_store.saveTostore(store_id, data)
            return root_store
        }

        case RS_v1Actions.USE: {
            const { store, store_id } = action.payload
            root_store.use(store_id, store)
            return root_store


        }
        case RS_v1Actions.CLEAR_STORE: {
            const { store_id } = action.payload
            root_store.stores[store_id]?.clear()

            return root_store
        }
        default: return root_store
    }

}

