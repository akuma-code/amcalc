import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import CalcControl from '../../../ActionComponents/Calculators/CalcBoxFn'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import { A_Offset5, A_Size, _ArgsMaker } from '../../../Interfaces/CommonTypes'
import { useOutputCalc } from '../../../Hooks/useOutputCalc'
import { _log } from '../../../Helpers/HelpersFns'

type OutputProps = {}


const Output2 = observer((props: OutputProps) => {
    const blocks = useOutputCalc()


    return (
        <div>

        </div>
    )
})

type OutputSizeCardProps = {

}
const OutputSizeCard: React.FC<OutputSizeCardProps> = (block) => {
    return <></>
}









Output2.displayName = '*** Output_v2 ***'
export default Output2