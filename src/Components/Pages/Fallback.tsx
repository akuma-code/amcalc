import { Box, Skeleton } from '@mui/material'
import React from 'react'

type Props = {}

export const Fallback = (props: Props) => {
    return (
        <Box width="100%">
            <Box mb={ 1 }>
                <Skeleton variant="text" animation="wave" sx={ { bgcolor: '#ffaaff' } } />
            </Box>
            <Box mb={ 1 }>
                <Skeleton variant="text" animation="wave" sx={ { bgcolor: '#ff12ff' } } />
            </Box>
            <Box mb={ 1 }>
                <Skeleton variant="text" animation="wave" sx={ { bgcolor: '#ffaaff' } } />
            </Box>
            <Box mb={ 1 }>
                <Skeleton variant="text" animation="wave" sx={ { bgcolor: '#ff12ff' } } />
            </Box>
        </Box>
    )
}