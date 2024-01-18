import { Box, LinearProgress, Stack } from '@mui/material';
import React from 'react';

export const Loading = () => {
    return (
        <Box component={ Stack }
            sx={ { maxWidth: '70wv', py: 1, my: 1 } }
        >
            <LinearProgress color="info" variant='query' />
        </Box>);
};
