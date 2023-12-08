import { AnyArg } from "../Hooks/useDynamicInputs"
import { DTO_ARGS, InputsTypeEnum } from "../Hooks/useFormStateSelector"
import { DataStore } from "../Context/DataStore"
import { ANYobj } from "../Interfaces/MathActionsTypes"
export enum RS_v1Actions {
    SAVE_DATA = 'save_data',
    LOAD_STORE = 'load_store',
    USE = 'use',
    CLEAR_STORE = 'clear_store',
}

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
    payload: { store_id: InputsTypeEnum, store: DataStore<AnyArg> }
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
