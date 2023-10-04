import { createContext } from 'react'
import { ActionsStore, StoreV2DataNodes } from '../../mobXStore/ActionStore'
import mbxActionStore, { IDTO_SimpleAction_v1, mbxDataNode } from '../../mobXStore/Stores'
import { useContext } from 'react'
export interface IStoresContext {
    ActionsStore?: ActionsStore
    StoreV2Nodes?: StoreV2DataNodes
    mbxStore: mbxActionStore<mbxDataNode<IDTO_SimpleAction_v1>>
}


export const StoresContext = createContext<IStoresContext | null>(null)

export const useStoresContext = () => {
    const stores = useContext(StoresContext)
    if (!stores) {
        throw new Error('Хук используется вне провайдера контекста!')
    }
    return { ...stores } as const
}