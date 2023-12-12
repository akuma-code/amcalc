import { useMemo } from "react"
import { useStoresContext } from "./useStoresContext"
import CalcControl, { notReachable } from "../ActionComponents/Calculators/CalcBoxFn"
import { _ArgsMaker } from "../Interfaces/CommonTypes"


export const useOutputCalc = () => {
    const { RootStore: RS, ViewConfig: VC } = useStoresContext()
    const Blocks = useMemo(() => {
        const currentOut = VC.selected_output
        const outStore = RS.stores[currentOut]?.store || []
        const calced = outStore.map(a => {
            switch (a.argType) {
                case 'size_full': {
                    const arg = { ..._ArgsMaker(a) }
                    const C = CalcControl[a.argType].calcMap(arg)
                    return C
                }
                case 'offset5': {
                    const arg = { ..._ArgsMaker(a) }
                    const C = CalcControl[a.argType].calcMap(arg)
                    return C
                }

                default:
                    return notReachable(a.argType)
            }
        }
        )

        return calced

    }, [RS.stores, VC.selected_output])
    return Blocks
}