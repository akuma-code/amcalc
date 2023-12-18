import { useCallback, useMemo } from 'react'

import { Box, Card, Divider, Stack, Typography, Icon } from '@mui/material';
import { ISize, ISizeShort } from '../../../Interfaces/CommonTypes';
import { _log, _sizeTuppler } from '../../../Helpers/HelpersFns';
import Icons from '../../Icons/SvgIcons';
import { OutputSizeBlock } from '../../../Context/DataStoreObserver';
import { Text } from '../../UI/Text';
import { DataOutput } from '../../../Context/DataOutputBlock';
type OutputCardProps = {
    savedSize: ISize
    outblock: any
    viewOptions?: { [x: string]: boolean }
}

const OutputSizeCard = ({ savedSize, outblock, viewOptions }: OutputCardProps) => {
    const [initW, initH] = _sizeTuppler(savedSize)
    const [skf, simple, otk] = outblock.out



    const InitSizeHeader = useCallback(() => getHeader(initW, initH), [initH, initW])



    return (
        <Card
            sx={{
                p: 1,
                m: 1,
                borderRadius: 3,

            }}

        >
            <InitSizeHeader />

            <Box component={Stack}
                useFlexGap
                flexDirection={'column'}
                margin={1}
            >
                {viewOptions && viewOptions.showSkf && <SkfOut {...skf} />}
                {viewOptions && viewOptions.showSimple && <SimpleOut {...simple} />}
                {viewOptions && viewOptions.showOtkosi && <OtkOut {...otk} />}
            </Box>


        </Card>
    )
}

const SkfOut = (net: ISizeShort) => {
    const { w, h } = net

    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'}>

            <Text styles={''}>
                СКФ:
            </Text>
            <Text>
                {w} x {h} mm
            </Text>
        </Stack>
    )
}
const SimpleOut = (net: ISizeShort) => {
    const { w, h } = net

    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'} >

            <Text >
                Простая:
            </Text>
            <Text >
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

export default OutputSizeCard




const getHeader = (initW: number, initH: number) => {

    return (<Stack flexDirection={'row'} justifyContent={'space-between'} columnGap={1}
        sx={{
            bgcolor: "#ff8000",
            minWidth: 'fit-content',
            borderRadius: 1,
            px: 1
        }}
    >

        <Stack direction={'row'} columnGap={1} alignItems={'center'} useFlexGap >
            <Icon>{Icons.WidthIcon}</Icon>


            <Text >
                {initW} мм
            </Text>

        </Stack>
        <Divider orientation='vertical' flexItem sx={{ bgcolor: 'white' }} />
        <Stack direction={'row'} columnGap={1} alignItems={'center'} useFlexGap >
            <Icon>{Icons.HeightIcon} </Icon>


            <Text >
                {initH} мм
            </Text>
        </Stack>
    </Stack>)


}
