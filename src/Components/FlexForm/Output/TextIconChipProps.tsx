import React from 'react';
import { Avatar, Box } from '@mui/material';
import { ANYobj } from '../../../Interfaces/MathActionsTypes';
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined';

type TextIconChipProps = {
    text: string;
    textSX?: ANYobj;
    iconSX?: ANYobj;
    icon?: React.ReactNode;

};
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
                    <WifiTetheringOutlinedIcon />}
            </Box>

            <Box
            >
                <span>{text}</span>
            </Box>
        </Box>
    );
};
