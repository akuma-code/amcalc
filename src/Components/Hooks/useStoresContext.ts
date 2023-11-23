import { createContext } from 'react'
import { ActionsStore, StoreV2DataNodes } from '../../mobXStore/ActionStore'
import mbxActionStore, { } from '../../mobXStore/Stores'
import { useContext } from 'react'
import FnLinkedList, { IDataTransferObject } from "../../Models/DTO_ChainStore"
import { CalcStateStore } from '../../mobXStore/CalcStateStore'
import { Mbx_InputsStore } from '../../mobXStore/InputsStore'
import { RootArgsStore, RootArgsStore_v1 } from '../../Context/RootStore'
import { InputsTypeEnum } from './useFormStateSelector'
export interface IStoresContext {
    // ActionsStore?: ActionsStore
    // StoreV2Nodes?: StoreV2DataNodes
    // mbxStore: mbxActionStore<{ nodeId: string, data: any }>
    // dto_Store: FnLinkedList<IDataTransferObject>
    ReduxStore: CalcStateStore
    InputStore: Mbx_InputsStore
    RootStore: RootArgsStore_v1

}


export const StoresContext = createContext<IStoresContext | null>(null)

export const useStoresContext = () => {
    const stores = useContext(StoresContext)
    if (!stores) {
        throw new Error('Хук используется вне провайдера контекста!')
    }
    return { ...stores } as const
}