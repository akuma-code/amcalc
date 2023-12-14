import { Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Fn_Output_offset5 } from '../../../ActionComponents/ActionTypes/Types'
import { InputsTypeEnum } from '../../../Hooks/useFormStateSelector'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import { A_Offset5 } from '../../../Interfaces/CommonTypes'
import { OffsetOutCard } from './OffsetOutCard'
import { _log } from '../../../Helpers/HelpersFns'
import { OffsetResult } from '../../../Context/DataOutputBlock'

type OutputProps = {}

type ResultArray = Fn_Output_offset5[]


const Output2 = observer((props: OutputProps) => {
    const { RootStore: RS } = useStoresContext()

    const DataOUT = RS.select(InputsTypeEnum.offset5).output
    const blocks = DataOUT.out() || []
    // const init = blocks.map((b, idx) => b.map(i => ({ arg: DataOUT.saved_args[idx] as A_Offset5, out: i })))
    // _log(DataOUT.out)

    return (
        <Stack maxHeight={'100%'}
            direction={'row'}
            maxWidth={'80vw'}
            gap={2}
            flexWrap={'wrap'}
            overflow={'auto'} >

            {
                blocks.map((b, idx) => <OffsetOutCard blockOut={b.out as any} blockIn={b.arg} key={idx} />)
            }
        </Stack>
    )
})

Output2.displayName = '*** Output_v2 ***'
export default Output2