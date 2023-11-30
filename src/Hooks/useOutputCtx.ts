import React, { useContext, } from 'react'
import { ANYfn } from '../Interfaces/MathActionsTypes'
type ViewNetsMode = 'skf' | 'simple' | 'both'
type ViewNetsState = { [Key in 'skf' | 'simple']: boolean }
export type CardViewState = {
    mode: ViewNetsMode
    show: ViewNetsState
}
interface OutputNetsContext extends CardViewState {


    control?: React.Dispatch<React.SetStateAction<CardViewState>>
}

export const OutputContext = React.createContext<OutputNetsContext | null>(null)

export const useOutputContext = () => {
    const ctx = useContext(OutputContext)

    if (!ctx) {
        throw new Error('Хук используется вне провайдера контекста!')
    }
    return { ...ctx } as const
}