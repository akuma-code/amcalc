import React from 'react'

import { Avatar, Box, Card, CardContent, Divider, Stack, IconButton, CardHeader, Typography } from '@mui/material';
import { AnyArg } from '../../../Hooks/useDynamicInputs';
import { ISize, SizeFull, SizeShort } from '../../../Interfaces/CommonTypes';
import { _sizeTuppler } from '../../../Helpers/HelpersFns';
import Icons from '../../Icons/SvgIcons';
import { Calc } from '../../../Hooks/useFuncs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
type OutputCardProps = {
    savedSize: ISize
    viewOptions?: { [x: string]: boolean }
}

const OutputCard = ({ savedSize }: OutputCardProps) => {
    const [initW, initH] = _sizeTuppler(savedSize)
    const computedNets = Calc.nets(new SizeFull(initW, initH))


    return (
        <Card
            sx={{
                p: 2,
                m: 1,
                borderRadius: 4,

            }}

        >
            <Divider flexItem variant='fullWidth'>вводные</Divider>
            <Box component={Stack} useFlexGap flexDirection={'row'} justifyContent={'space-around'}
                gap={2}
            >
                {/* <Avatar variant='square' sx={{ width: 30, height: 30 }}>
                    {Icons.WidthIcon}
                </Avatar>
                <Typography variant="h6" display="block" >{initW}</Typography>
                <Divider orientation='vertical' flexItem ></Divider>
                <Typography variant="h6" display="block" >{initH}</Typography>
                <Avatar variant='square' sx={{ width: 30, height: 30 }}>
                    {Icons.HeightIcon}
                </Avatar> */}
                <HeaderTable />
            </Box>
            <Divider flexItem variant='fullWidth'>вывод</Divider>
            <Box component={Stack}
                useFlexGap
                flexDirection={'column'}
                gap={2}
            >
                <Stack useFlexGap display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Avatar >SKF</Avatar>
                    <>
                        <Typography variant='body1'>
                            {computedNets.skf.w} mm

                        </Typography>
                        <Typography variant='body1'>
                            {computedNets.skf.h} mm
                        </Typography>
                    </>
                </Stack>





            </Box>


        </Card>
    )
}

const HeaderTable = () => <TableContainer component={Paper}>
    <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>
                    <Avatar variant='square' sx={{ width: 30, height: 30 }}>
                        {Icons.WidthIcon}
                    </Avatar>
                </TableCell>
                <TableCell align="right">
                    <Avatar variant='square' sx={{ width: 30, height: 30 }}>
                        {Icons.WidthIcon}
                    </Avatar>
                </TableCell>

            </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
    </Table>
</TableContainer>

export default OutputCard