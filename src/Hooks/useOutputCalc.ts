import { useMemo } from "react"
import { useStoresContext } from "./useStoresContext"
import CalcControl, { notReachable } from "../ActionComponents/Calculators/CalcBoxFn"
import { A_Offset5, A_Size, ISizeShort, _ArgsMaker } from "../Interfaces/CommonTypes"
import { Fn_Output_offset5 } from "../ActionComponents/ActionTypes/Types"
import { ArgsTypes } from "../Models/ArgsTypeModel"

interface ReturnType {
    argType: ArgsTypes
    out: unknown
}

interface NetsReturn extends ReturnType {
    argType: 'size_full'
    out: ISizeShort
}

interface OtkReturn extends ReturnType {
    argType: 'size_full'
    out: { pm: number }
}

interface OffseReturn extends ReturnType {
    argType: 'offset5'
    out: Fn_Output_offset5
}
export const useOutputCalc = () => {
    const { RootStore: RS, ViewConfig: VC } = useStoresContext()
    const Blocks = useMemo(() => {
        const currentOut = VC.selected_output
        const outStore = RS.stores[currentOut]?.store || []
        const calced = outStore.map(a => {
            switch (a.argType) {
                case 'size_full': {
                    const arg = _ArgsMaker(a)
                    const C = CalcControl[a.argType].calcMap(arg)
                    return C
                }
                case 'offset5': {
                    const arg = { ..._ArgsMaker(a) }
                    const C = CalcControl[a.argType].calcMap(arg)
                    return C as Fn_Output_offset5[]
                }

                default:
                    return notReachable(a.argType)
            }
        })

        return calced

    }, [RS.stores, VC.selected_output])
    return [...Blocks] as const
}