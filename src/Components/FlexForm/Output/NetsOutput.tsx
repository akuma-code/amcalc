import React from 'react'
import { ISizeFull, SizeFull } from '../../../Interfaces/CommonTypes'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { useFuncs } from '../../Hooks/useFuncs'
import { observer } from 'mobx-react-lite'
import { Fn_Output_nets } from '../../../ActionComponents/ActionTypes/Types'
import { Avatar, Box, Card, CardContent, CardHeader, Chip, Divider, List, Paper, Typography } from '@mui/material'
import { _ID } from '../../../Helpers/HelpersFns'

type NetOutputProps = {

}

const testsaved = [
    new SizeFull(600, 800),
    new SizeFull(300, 500),
    new SizeFull(100, 100),
]

const NetsOutput: React.FC<NetOutputProps> = observer(() => {

    const { RootStore } = useStoresContext()
    const { nets } = useFuncs()
    const saved = RootStore.stores.size_full?.saved || []
    const CalcedNets = saved.map(nets)

    console.log('CalcedNets', CalcedNets)
    return (
        <div>
            {CalcedNets.map(net =>
                <NetsCard {...net} key={_ID()} />
            )}
        </div>
    )
})

const NetsCard = (net: Fn_Output_nets) => {
    const { simple, skf } = net

    return (
        <Card
            component={Box}
            color="neutral"
            sx={{ bgcolor: 'neutral.900' }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', m: 1 }}>

                <Avatar sx={{ width: 'fit-content', p: 0.5, bgcolor: '#3f0e0e' }}>
                    SKF
                </Avatar>
                <Avatar sx={{ width: 'fit-content', p: 0.5, bgcolor: '#3f0e0e' }}>
                    Simple
                </Avatar>
            </Box>
            <CardContent
                sx={{ display: 'flex', flexDirection: 'row', }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', px: 1, }}>

                    <span>{simple.w} mm</span>
                    <span>{simple.h} mm</span>
                </Box>
                <Divider orientation='vertical' flexItem sx={{ mx: 1, width: '2px', bgColor: 'red' }} variant='fullWidth' />
                <Box sx={{ display: 'flex', flexDirection: 'column', px: 1, }}>

                    <span>{skf.w} mm</span>
                    <span>{skf.h} mm</span>
                </Box>
            </CardContent>
        </Card>
    )

}








NetsOutput.displayName = '***NetsOutput***'
export default NetsOutput