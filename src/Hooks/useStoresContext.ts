import { createContext } from 'react'

import { useContext } from 'react'
import { RootArgsStore_v1 } from '../Context/RootStore'
import { ThemeView } from '../Context/ThemeView'
export interface IStoresContext {
    RootStore: RootArgsStore_v1
    ThemeView: ThemeView

}


export const StoresContext = createContext<IStoresContext | null>(null)

export const useStoresContext = () => {
    const stores = useContext(StoresContext)
    if (!stores) {
        throw new Error('Хук используется вне провайдера контекста!')
    }
    return { ...stores } as const
}