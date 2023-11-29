import React, { useState, useEffect, useLayoutEffect } from 'react'
import { ISizeFull, ISizeShort, SizeFull } from '../../../Interfaces/CommonTypes'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { useFuncs } from '../../Hooks/useFuncs'
import { observer } from 'mobx-react-lite'
import { Avatar, Box, Button, ButtonGroup, Card, CardContent, Divider } from '@mui/material'
import { _ID, _log } from '../../../Helpers/HelpersFns'
import { ANYobj } from '../../../Interfaces/MathActionsTypes'
import Icons from '../../Icons/SvgIcons'
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined';
import { CardViewState, OutputContext, useOutputContext } from '../../Hooks/useOutputCtx'
import { Stack } from '@mui/system'

type CardViewMode = 'skf' | 'simple' | 'both'


export enum NetViewEn {
    skf = 'сетка СКФ',
    simple = 'сетка Простая',
    both = 'Общий вид',
}
type ViewNetsState = { [Key in 'skf' | 'simple']: boolean }

type NetOutputProps = {

}

const testsaved = [
    new SizeFull(100, 100),
    new SizeFull(600, 800),
    new SizeFull(300, 500),
]

const NetsOutput: React.FC<NetOutputProps> = observer(() => {

    const { RootStore } = useStoresContext()
    const [view, setView] = useState<CardViewState>({ mode: 'both', show: { skf: true, simple: true } })
    // const { mode, show } = useOutputContext()

    const saved = RootStore.stores.size_full?.saved || []
    // const CalcedNets = testsaved.map(nets)
    function toggleView() {
        const order = ['skf', 'simple', 'both'] as const
        const fi = order.findIndex(i => i === view.mode)
        const net_type = order[fi + 1] ? order[fi + 1] : order[0]
        setView(prev => ({ ...prev, mode: net_type }))
    }
    const stateBgColor = (mode: CardViewMode) => {
        switch (mode) {
            case 'simple': { return `#2e5ff1` }
            case 'skf': { return `#40552c` }
            case 'both': { return `transparent` }
        }
    }

    useEffect(() => {

        setView(prev => ({ ...prev, show: selectView(view.mode) }))


    }, [view.mode])
    return (
        <Box sx={{ maxHeight: '70vh', width: '100%' }} display={'flex'} flexDirection={'column'}>
            <OutputContext.Provider
                value={{
                    ...view,
                    control: setView
                }}
            >
                <ButtonGroup sx={{ alignSelf: 'end' }}
                    variant="outlined" aria-label="outlined button group">
                    <Button
                        onClick={toggleView}
                    >
                        Toggle View Mode
                    </Button>
                    <Button disabled>Two</Button>
                    <Button disabled>Three</Button>
                </ButtonGroup>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" >

                    {testsaved.map((size, idx) =>
                        <NetsCard size={size} idxCounter={idx} key={_ID()} />
                    )}
                </Stack>
            </OutputContext.Provider>
        </Box>
    )
})


interface NetCardProps {
    size: ISizeFull
    idxCounter?: number
    bgColor?: string
}
const NetsCard: React.FC<NetCardProps> = observer((props) => {
    const { mode, show } = useOutputContext()
    const [viewNet, setViewNet] = useState({ ...show, mode, desc: NetViewEn[mode] })

    const stateBgColor = (mode: CardViewMode) => {
        switch (mode) {
            case 'simple': { return `#2e5ff1` }
            case 'skf': { return `#eb7114` }
            case 'both': { return `#9c9a9a` }
        }
    }
    const [color, setColor] = useState<string>('#fff')
    const net = useFuncs().nets(props.size)
    const { simple, skf } = net
    const OnAvavtarClick = () => setViewNet(prev => ({ ...prev, ...toggleNextView(viewNet.mode) }))

    useLayoutEffect(() => {
        setColor(prev => stateBgColor(viewNet.mode))
        setViewNet(prev => ({ ...prev, desc: NetViewEn[viewNet.mode] }))
    }, [viewNet.mode])
    return (
        <Card border={1.5} borderColor={'cyan'} borderRadius={1}
            component={Box}
            color="neutral"
            sx={{
                p: 1, m: 1,
                background: color
            }}

            display={'flex'}
            flexDirection={'column'}

        >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', m: 1 }}>
                <Avatar sx={{ bgcolor: '#3f0e0e', width: 30, height: 30 }} >
                    {props.idxCounter && props.idxCounter}
                </Avatar>
                <Avatar sx={{ p: 0.5, bgcolor: '#3f0e0e', borderRadius: 2, px: 2, width: 'fit-content', height: 'fit-content' }}
                    component={'button'}
                    onClick={OnAvavtarClick}
                    variant='square'

                >
                    ToggleView
                </Avatar>
            </Box>
            <Divider >{viewNet.desc}</Divider>

            <CardBodyBlock nets={{ simple, skf }} viewNets={viewNet} />

            <Divider >входные размеры</Divider>

            <FooterCardSize size={props.size} />

        </Card>
    )

})

NetsCard.displayName = 'NetCard'
type InitSizeChipProps = {
    size: ISizeFull
}


const FooterCardSize = ({ size }: InitSizeChipProps) => {
    const { width, height } = size
    const W = `${width} мм`
    const H = `${height} мм`
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, mt: 1, fontSize: 16, justifyContent: 'space-around' }}
        >
            <TextIconChip text={W} icon={Icons.WidthIcon} />
            <Divider orientation='vertical' flexItem sx={{ width: '2px', bgColor: 'red' }} variant='fullWidth' />
            <TextIconChip text={H} icon={Icons.HeightIcon} />

        </Box>)
}

type NetSizeBodyProps = {
    short_size: ISizeShort
    isShow: boolean

}
const SizeItemBlock = ({ short_size, isShow }: NetSizeBodyProps) => {
    const { w, h } = short_size
    const W = `${w} мм`
    const H = `${h} мм`
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1, px: 1 }}
        >
            {isShow && <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" justifyContent={'space-between'} >

                <TextIconChip text={W} icon={<Avatar >Ш</Avatar>} />
                <Divider orientation='vertical' flexItem sx={{ mx: 1, width: '2px', bgColor: 'red' }} variant='fullWidth' />
                <TextIconChip text={H} icon={<Avatar >В</Avatar>} />


            </Stack>
            }
        </Box>
    )
}
interface CardBodyProps {
    nets: { skf: ISizeShort, simple: ISizeShort }
    viewNets: ViewNetsState

}


export const CardBodyBlock: React.FC<CardBodyProps> = ({ nets, viewNets }) => {


    return (
        <Box component={CardContent} sx={{

            display: 'flex', justifyContent: 'space-evenly', flexDirection: { xs: 'row', md: 'column' },
        }}>
            <SizeItemBlock short_size={nets.simple} isShow={viewNets.simple} />
            <Divider orientation='vertical' flexItem sx={{ mx: .3, width: '2px', bgColor: 'red' }} variant='fullWidth' />
            <SizeItemBlock short_size={nets.skf} isShow={viewNets.skf} />
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
            justifyContent={'space-between'}
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




const selectView = (viewMode: CardViewMode): ViewNetsState => {
    let result: Partial<ViewNetsState> = {}
    switch (viewMode) {
        case 'skf': { result = { ...result, skf: true, simple: false }; break }
        case 'simple': { result = { ...result, skf: false, simple: true }; break }
        case 'both': { result = { ...result, skf: true, simple: true }; break }
        default: result = { ...result, skf: false, simple: false }
    }
    return result as ViewNetsState
}


function toggleNextView(viewmode: CardViewMode) {
    const order = ['skf', 'simple', 'both'] as const
    const fi = order.findIndex(i => i === viewmode)
    const net_type = order[fi + 1] ? order[fi + 1] : order[0]
    return { ...selectView(net_type), mode: net_type }
}



NetsOutput.displayName = '***NetsOutput***'
export default NetsOutput