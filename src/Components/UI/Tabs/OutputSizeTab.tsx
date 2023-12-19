import { Box, Card, Divider, Icon, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import { InputsTypeEnum } from '../../../Hooks/useFormStateSelector'
import { SingleCalcReducer, SizeCalc } from '../../../ActionComponents/Calculators/SingleArgCalc'
import { A_InputArgs, A_Size, ISize, ISizeFull, ISizeShort, _ArgsMaker2 } from '../../../Interfaces/CommonTypes'
import { _log } from '../../../Helpers/HelpersFns'
import OutputSizeCard from '../../FlexForm/Output/OutputSizeCard'
import { Text } from '../Text'
import { LABELS_LIST } from '../../../Interfaces/Enums'
import { IVisibileItems } from '../../../Context/ThemeView'
import Icons from '../../Icons/SvgIcons'

type SizeTabProps = {
    size_args: A_InputArgs[]
}

const OutputSizeTab: React.FC<SizeTabProps> = observer((props) => {

    const { RootStore: R, ViewConfig: V } = useStoresContext()

    const { size_args } = props
    const blocks = useMemo(() => {

        const updatedArgs = size_args.map(a => _ArgsMaker2(a))
        const BLOCKS = updatedArgs.map(a => ({
            in: a as A_Size,
            out: SingleCalcReducer(a) as SizeCalc
        }))
        return BLOCKS
    }, [size_args])

    return (
        <Stack maxHeight={'100%'}
            direction={'row'}
            maxWidth={'80vw'}
            gap={2}
            flexWrap={'wrap'}
            overflow={'auto'}>

            {
                blocks.map((b, idx) =>
                    <CardSizesOut calcedBlock={b} index={idx + 1} viewOptions={{ ...V.visible }} />
                )
            }
        </Stack>
    )
})

export default OutputSizeTab

type CardSizeProps = {
    calcedBlock: {
        in: A_Size
        out: {
            skf: ISizeShort
            simple: ISizeShort
            otkosi: { pm: number }
        }
    }
    viewOptions: Partial<IVisibileItems>
    index: number
}
export const CardSizesOut: React.FC<CardSizeProps> = (props) => {
    const calced = props.calcedBlock.out
    const { showOtkosi, showSimple, showSkf } = props.viewOptions
    return (
        <Card sx={{
            p: 1,
            m: 1,
            borderRadius: 3,

        }}>
            <SizeCardHeader init={props.calcedBlock.in} idx={props.index && props.index} />
            <Box component={Stack}
                useFlexGap
                flexDirection={'column'}
                margin={1}
            >
                {showSkf && <NetOut size={calced.skf} label='skf' />}
                {showSimple && <NetOut size={calced.simple} label='simple' />}
                {showOtkosi && <OtkOut {...calced.otkosi} />}
            </Box>
        </Card>
    )
}
type NetOutputProps = {
    size: ISizeShort
    label: 'skf' | 'simple'
}
const NetOut: React.FC<NetOutputProps> = (props) => {
    const { size: { w, h }, label } = props

    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'}>

            <Text styles={''}>
                {LABELS_LIST[label]}
            </Text>
            <Text>
                {w} x {h} mm
            </Text>
        </Stack>
    )
}

const OtkOut = (otk: { pm: number }) => {
    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'}>

            <Text>
                Откосы:
            </Text>
            <Text >
                {otk.pm} п.м.
            </Text>
        </Stack>
    )
}
type HeaderProps = {
    init: ISizeFull
    idx: number
}
const SizeCardHeader: React.FC<HeaderProps> = (props) => {
    const { idx, init: { width, height } } = props
    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'} columnGap={1}
            sx={{
                bgcolor: "#ff8000",
                minWidth: 'fit-content',
                borderRadius: 1,
                px: 1
            }}
        >

            <Stack direction={'row'} columnGap={1} alignItems={'center'} useFlexGap >
                {idx && <b>{idx}) </b>}
                <Icon>{Icons.WidthIcon}</Icon>
                <Text >
                    {width} мм
                </Text>

            </Stack>
            <Divider orientation='vertical' flexItem sx={{ bgcolor: 'white', width: 4 }} />
            <Stack direction={'row'} columnGap={1} alignItems={'center'} useFlexGap >
                <Icon>{Icons.HeightIcon} </Icon>


                <Text >
                    {height} мм
                </Text>
            </Stack>
        </Stack>)


}