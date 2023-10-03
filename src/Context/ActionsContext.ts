import { createContext } from 'react'
import { ActionsStore, StoreV2DataNodes, v1DataNode } from '../mobXStore/ActionStore'

export interface IStoresContext {
    ActionsStore: ActionsStore
    StoreV2Nodes: StoreV2DataNodes
}


export const StoresContext = createContext<IStoresContext | null>(null)
