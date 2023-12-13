import { Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { _ID } from '../../../Helpers/HelpersFns'
import { A_InputArgs, SizeFull } from '../../../Interfaces/CommonTypes'
import OutputSizeCard from './OutputSizeCard'

type OutputProps = {
    store?: A_InputArgs[]
}
const fakeInit = [
    new SizeFull(1000, 1000),
    new SizeFull(800, 1200),
    new SizeFull(300, 400),
]



const OutputVers1 = observer((props: OutputProps) => {



    const saved = props.store || []


    return (
        <Stack maxHeight={'100%'}
            direction={'row'}
            maxWidth={'80vw'}
            gap={2}
            flexWrap={'wrap'}
            overflow={'auto'}>

            {
                [...saved].map(s => (('width' in s) ? <OutputSizeCard savedSize={s} key={_ID()} /> : null))

            }
        </Stack>
    )
})
OutputVers1.displayName = '*** Output_v1 ***'
export default OutputVers1