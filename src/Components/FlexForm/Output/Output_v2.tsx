import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import CalcControl from '../../../ActionComponents/Calculators/CalcBoxFn'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import { A_Offset5, A_Size, _ArgsMaker } from '../../../Interfaces/CommonTypes'
import { useOutputCalc } from '../../../Hooks/useOutputCalc'

type OutputProps = {}
type ArgVar = | A_Size[] | A_Offset5[]

const Output2 = observer((props: OutputProps) => {
    const blocks = useOutputCalc()


    return (
        <div>

        </div>
    )
})


Output2.displayName = '*** Output_v2 ***'
export default Output2