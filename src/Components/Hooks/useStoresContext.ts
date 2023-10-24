import { createContext } from 'react'
import { ActionsStore, StoreV2DataNodes } from '../../mobXStore/ActionStore'
import mbxActionStore, { IDTO_SimpleAction_v1, mbxDataNode } from '../../mobXStore/Stores'
import { useContext } from 'react'
import mbxStoreLL from '../../mobXStore/mbxStore'
import FnLinkedList, { DTO_Node } from '../../Models/LinkedList'
import { DTO_Nodes_list } from '../../ActionComponents/ActionTypes/Types'
export interface IStoresContext {
    ActionsStore?: ActionsStore
    StoreV2Nodes?: StoreV2DataNodes
    mbxStore: mbxActionStore<{ nodeId: string, data: any }>
    mbxLinkedStore: FnLinkedList<DTO_Node<DTO_Nodes_list['fn']>>
}


export const StoresContext = createContext<IStoresContext | null>(null)

export const useStoresContext = () => {
    const stores = useContext(StoresContext)
    if (!stores) {
        throw new Error('Хук используется вне провайдера контекста!')
    }
    return { ...stores } as const
}