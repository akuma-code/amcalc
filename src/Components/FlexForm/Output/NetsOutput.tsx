import React, { useMemo, useState } from 'react'
import { ISizeFull, ISizeShort, SizeFull } from '../../../Interfaces/CommonTypes'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { useFuncs } from '../../Hooks/useFuncs'
import { observer } from 'mobx-react-lite'
import { Fn_Output_nets } from '../../../ActionComponents/ActionTypes/Types'
import { Avatar, Box, Card, CardContent, CardHeader, Chip, Divider, List, Paper, Typography } from '@mui/material'
import { _ID } from '../../../Helpers/HelpersFns'
import { ANYfn, ANYobj } from '../../../Interfaces/MathActionsTypes'
import Icons from '../../Icons/SvgIcons'
import { FieldsLabelEnum } from '../../../ActionComponents/ActionTypes/ReducerTypes'
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined';
type NetOutputProps = {

}

const testsaved = [
    new SizeFull(100, 100),
    new SizeFull(600, 800),
    new SizeFull(300, 500),
]

const NetsOutput: React.FC<NetOutputProps> = observer(() => {

    const { RootStore } = useStoresContext()
    const { nets } = useFuncs()
    const saved = RootStore.stores.size_full?.saved || []
    const CalcedNets = testsaved.map(nets)

    console.log('CalcedNets', CalcedNets)
    return (
        <div>
            {testsaved.map(size =>
                <NetsCard {...size} key={_ID()} />
            )}
        </div>
    )
})
type CardViewMode = 'skf' | 'simple' | 'both'
type CardViewState = {
    mode: CardViewMode
    saved: ISizeFull[]
    calced: Fn_Output_nets[]
}
const NetsCard = (size: ISizeFull) => {
    const net = useFuncs().nets(size)
    const { simple, skf } = net
    const [viewMode, setViewMode] = useState<CardViewMode>('both')

    const [view, setView] = useState<CardViewState>({ mode: 'simple', saved: [], calced: [] })


    const output = useMemo(() => {

        const out = {
            skf,
            simple,
            both: { simple, skf }
        }
        return out[viewMode]
    }, [simple, skf, viewMode])
    return (
        <Card border={1.5} borderColor={'cyan'} borderRadius={1}
            component={Box}
            color="neutral"
            sx={{ bgcolor: 'neutral.900', p: 1, m: 1 }}
            display={'flex'}
            flexDirection={'column'}

        >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', m: 1 }}>

                <Avatar sx={{ width: 'fit-content', p: 0.5, bgcolor: '#3f0e0e' }}>
                    {viewMode}
                </Avatar>

            </Box>
            <CardContent
                sx={{ display: 'flex', flexDirection: 'row', }}
            >
                {/* <Box sx={{ display: 'flex', flexDirection: 'column', px: 1, }}> */}
                <BodyCardSize short_size={simple} />
                {/* <span>{simple.w} mm</span>
                    <span>{simple.h} mm</span> */}
                {/* </Box> */}
                <Divider orientation='vertical' flexItem sx={{ mx: 1, width: '2px', bgColor: 'red' }} variant='fullWidth' />
                <Box sx={{ display: 'flex', flexDirection: 'column', px: 1, }}>
                    <BodyCardSize short_size={skf} />

                </Box>
            </CardContent>
            <Divider >входные размеры</Divider>

            <FooterCardSize {...size} />

        </Card>
    )

}
type InitSizeChipProps = {

} & ISizeFull
const FooterCardSize = ({ width, height }: InitSizeChipProps) => {
    // const { width, height } = size
    const W = `${width} мм`
    const H = `${height} мм`
    return (
        <Box
            sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 1.5, mt: 1 }}
        >
            <TextIconChip text={W} icon={Icons.WidthIcon} />
            <Divider orientation='vertical' flexItem sx={{ mx: 1, width: '2px', bgColor: 'red' }} variant='fullWidth' />
            <TextIconChip text={H} icon={Icons.HeightIcon} />

        </Box>)
}
type NetSizeBodyProps = {
    short_size: ISizeShort
}
const BodyCardSize = ({ short_size }: NetSizeBodyProps) => {
    const { w, h } = short_size
    const W = `${w} мм`
    const H = `${h} мм`
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1, px: 1 }}
        >
            <TextIconChip text={W} icon={Icons.WidthIcon} />
            <Divider orientation='vertical' flexItem sx={{ mx: 1, width: '2px', bgColor: 'red' }} variant='fullWidth' />
            <TextIconChip text={H} icon={Icons.HeightIcon} />

        </Box>
    )
}
type TextIconChipProps = {
    text: string
    textSX?: ANYobj
    iconSX?: ANYobj
    icon?: React.ReactNode

}
export const TextIconChip = ({ text, icon, textSX, iconSX }: TextIconChipProps) => {
    return (
        <Box
            display={'flex'}
            alignContent={'center'}
            maxHeight={'2em'}
            flexDirection={'row'}
            justifyContent={'space-around'}
            alignItems={'center'}
            gap={1}>
            <Box component={Avatar} variant='square' sx={{ width: 28, height: 28, p: 0.3 }}>

                {icon ?
                    icon
                    :
                    <WifiTetheringOutlinedIcon />
                }
            </Box>

            <Box
            >
                <span>{text}</span>
            </Box>
        </Box>
    )
}






NetsOutput.displayName = '***NetsOutput***'
export default NetsOutput