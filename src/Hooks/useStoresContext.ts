import { createContext } from 'react'

import { useContext } from 'react'
import { ArgStorage } from '../Context/ArgStorage'
import { RootArgsStore_v1 } from '../Context/RootStore'
import { OutputViewConfig } from '../Context/ThemeView'
import { A_Sill, A_Size } from '../Interfaces/CommonTypes'
import { SpreadSheetStore } from '../Context/SpreadSheetStore'
export interface IStoresContext {
    RootStore: RootArgsStore_v1
    SizeStore?: ArgStorage<A_Size>
    ViewConfig: OutputViewConfig
    SillStore: ArgStorage<A_Sill>
    ViteoStore: SpreadSheetStore
}


export const StoresContext = createContext<IStoresContext | null>(null)

export const useStoresContext = () => {
    const stores = useContext(StoresContext)
    if (!stores) {
        throw new Error('Хук используется вне провайдера контекста!')
    }
    return { ...stores } as const
}