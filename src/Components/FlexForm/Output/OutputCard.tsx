import { useMemo } from 'react'

import { Box, Card, Divider, Stack, Typography, Icon } from '@mui/material';
import { ISize, ISizeShort } from '../../../Interfaces/CommonTypes';
import { _log, _sizeTuppler } from '../../../Helpers/HelpersFns';
import Icons from '../../Icons/SvgIcons';
import { OutputSizeBlock } from '../../../Context/DataStoreObserver';
type OutputCardProps = {
    savedSize: ISize
    outblock?: OutputSizeBlock
    viewOptions?: { [x: string]: boolean }
}

const OutputCard = ({ savedSize, outblock }: OutputCardProps) => {
    const [initW, initH] = _sizeTuppler(savedSize)

    const output = useMemo(() => {
        const block = new OutputSizeBlock(savedSize)
        const { netSkf, netSimple, Otk } = block.out
        return { netSimple, netSkf, Otk }
    }, [savedSize])
    const InitSizeHeader = useMemo(() => {
        const HEADER = () => <Stack flexDirection={'row'} justifyContent={'space-between'} columnGap={1}
            sx={{
                bgcolor: "#ff8000",
                minWidth: 'fit-content',
                borderRadius: 1,
                px: 1
            }}
        >

            <Stack direction={'row'} columnGap={1} alignItems={'center'} useFlexGap>
                <Icon >{Icons.WidthIcon}</Icon>
                <Typography variant='h6' align='right'>
                    {initW} мм
                </Typography>
            </Stack>
            <Divider orientation='vertical' flexItem sx={{ bgcolor: 'white' }} />
            <Stack direction={'row'} columnGap={1} alignItems={'center'} useFlexGap>
                <Icon>{Icons.HeightIcon} </Icon>
                <Typography variant='h6' align='right'>
                    {initH} мм
                </Typography>
            </Stack>
        </Stack>;
        return HEADER
    }, [initH, initW])



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
                <SkfOut {...output.netSkf as ISizeShort} />
                <SimpleOut {...output.netSimple as ISizeShort} />
                <OtkOut {...output.Otk as { pm: number }} />
            </Box>


        </Card>
    )
}

const SkfOut = (net: ISizeShort) => {
    const { w, h } = net

    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'}>

            <Typography variant='h6'>
                СКФ:
            </Typography>
            <Typography variant='h6' align='justify'>
                {w} x {h} mm
            </Typography>
        </Stack>
    )
}
const SimpleOut = (net: ISizeShort) => {
    const { w, h } = net

    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'}>

            <Typography variant='h6'>
                Простая:
            </Typography>
            <Typography variant='h6' align='justify'>
                {w} x {h} mm
            </Typography>
        </Stack>
    )
}

const OtkOut = (otk: { pm: number }) => {
    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'}>

            <Typography variant='h6'>
                Откосы:
            </Typography>
            <Typography variant='h6' align='justify'>
                {otk.pm} п.м.
            </Typography>
        </Stack>
    )
}

export default OutputCard









// type HeaderProps = {
//     inpW: number,
//     inpH: number
// }

// const HeaderTable = (props: HeaderProps) => <TableContainer component={Paper} >
//     <Table sx={{ minWidth: 100, }} aria-label="simple table" size='small' >
//         <TableHead>
//             <TableRow sx={{ bgcolor: "rgb(150, 150, 150)", borderRadius: 3 }}>
//                 <TableCell sx={{ fontWeight: 'bold', borderRight: 1 }} >
//                     <Stack direction={'row'} columnGap={1} alignItems={'center'} useFlexGap>
//                         <Icon >{Icons.WidthIcon}</Icon>
//                         <Typography variant='h6' align='right'>
//                             {props.inpW} мм
//                         </Typography>
//                     </Stack>
//                 </TableCell>
//                 <TableCell align='center' sx={{ fontWeight: 'bold', }}>
//                     <Stack direction={'row'} columnGap={1} alignItems={'center'}>
//                         <Icon >{Icons.HeightIcon}</Icon>
//                         <Typography variant='h6' align='right'>
//                             {props.inpH} мм
//                         </Typography>
//                     </Stack>

//                 </TableCell>
//             </TableRow>
//         </TableHead>
//         {/* <TableBody>

//         </TableBody> */}
//     </Table>
// </TableContainer>

