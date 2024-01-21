import { Box } from '@mui/material'
import React from 'react'
import { FrameFactory } from '../../../Models/FrameFactory'
import { _log } from '../../../Helpers/HelpersFns'

type TestPageProps = {}

export const TestPage: React.FC<TestPageProps> = (props) => {

    const tt = new FrameFactory('tt')
    const frame = tt.createFrame({ size: { w: 500, h: 400 } })


    return (
        <Box position={'relative'}
            sx={{ width: 1000, height: 850, border: '2px solid black', bgcolor: '#1e8fff42' }}
        >
            <Box position={'absolute'} left={20} top={20}
                sx={{ width: 800, height: 400, bgcolor: 'turquoise' }}
            >

            </Box>

        </Box>

    )
}