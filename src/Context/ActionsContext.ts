import { createContext } from 'react'
import { ActionsStore, v1DataNode } from '../mobXStore/ActionStore'

export interface IStoresContext {
    ActionsStore: ActionsStore
}


export const StoresContext = createContext<IStoresContext | null>(null)
