import { Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { _ID, _log } from '../../../Helpers/HelpersFns'
import { A_InputArgs, A_Size, SizeFull, SizeShort } from '../../../Interfaces/CommonTypes'
import OutputSizeCard from './OutputSizeCard'
import { useStoresContext } from '../../../Hooks/useStoresContext'

type OutputProps = {
    store?: A_InputArgs[]
}
const fakeInit = [
    new SizeFull(1000, 1000),
    new SizeFull(800, 1200),
    new SizeFull(300, 400),
]

type ResultArray = [SizeShort, SizeShort, { pm: number }]

const OutputVers1 = observer((props: OutputProps) => {
    const { RootStore, ViewConfig } = useStoresContext()
    const outblock = RootStore.select('size_full').output
    const BLIST = outblock.out()

    const saved = props.store || []


    return (
        <Stack maxHeight={'100%'}
            direction={'row'}
            maxWidth={'80vw'}
            gap={2}
            flexWrap={'wrap'}
            overflow={'auto'}>

            {
                [...BLIST].map(s => (('width' in s.arg) ? <OutputSizeCard key={_ID()} savedSize={s.arg} outblock={s.out} viewOptions={{ ...ViewConfig.visible }} /> : null))

            }
        </Stack>
    )
})
OutputVers1.displayName = '*** Output_v1 ***'
export default OutputVers1