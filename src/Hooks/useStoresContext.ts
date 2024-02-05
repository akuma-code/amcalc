import { createContext } from 'react'

import { useContext } from 'react'
import { ArgStorage } from '../Context/ArgStorage'
import { RootArgsStore_v1 } from '../Context/RootStore'
import { OutputViewConfig } from '../Context/ThemeView'
import { A_Sill, A_Size } from '../Interfaces/CommonTypes'
import { ViteoStore } from '../Context/SpreadSheetStore'
import { mbxNodesStore } from '../mobXStore/NodeStore'
import { _FrameNodeData, _FrameStateWithNodes } from '../Components/Pages/Router/DrawerPage'
export interface IStoresContext {
    RootStore: RootArgsStore_v1
    SizeStore?: ArgStorage<A_Size>
    ViewConfig: OutputViewConfig
    SillStore: ArgStorage<A_Sill>
    ViteoStore: ViteoStore

    NodeStore: mbxNodesStore<_FrameStateWithNodes>
}


export const StoresContext = createContext<IStoresContext | null>(null)

export const useStoresContext = () => {
    const stores = useContext(StoresContext)
    if (!stores) {
        throw new Error('Хук используется вне провайдера контекста!')
    }
    return { ...stores } as const
}