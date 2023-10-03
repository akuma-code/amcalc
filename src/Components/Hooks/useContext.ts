import React, { useContext } from 'react'
import { IStoresContext, StoresContext } from '../../Context/ActionsContext'
import { ActionsStore } from '../../mobXStore/ActionStore'

export function useStoresContext() {
    const StoreCtx = useContext<IStoresContext | null>(StoresContext)

    if (!StoreCtx) throw new Error('Хук используется вне провайдера контекста!')

    return { StoreCtx } as const
}