import { Box, LinearProgress, Stack } from '@mui/material';
import React from 'react';

export const Loading = () => {
    return (
        <Box component={ Stack }
            sx={ { maxWidth: '70wv', py: 1, my: 1 } }
        >
            {/* <b className="text-3xl text-center">Loading...</b> */ }
            <LinearProgress color="info" variant='query' />
        </Box>);
};
