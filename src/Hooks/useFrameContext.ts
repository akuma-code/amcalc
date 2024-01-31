import React, { useContext, createContext } from 'react'
import { _Point, _SizeF } from '../Helpers/HelpersFns'
import { IFrameContext } from '../Context/FrameContext/FrameContext'




export const FrameContext = createContext<IFrameContext | null>(null)

export const useFrameContext = () => {
    const frame = useContext(FrameContext)
    if (!frame) {
        throw new Error('Хук используется вне провайдера контекста!')
    }
    return { ...frame } as const
}