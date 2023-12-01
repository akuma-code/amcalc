import React from 'react';
import { Avatar, Box } from '@mui/material';
import { ANYobj } from '../../../Interfaces/MathActionsTypes';
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined';

type TextIconChipProps = {
    text: string;
    textSX?: ANYobj;
    iconSX?: ANYobj;
    icon?: React.ReactNode;
    wh?: number

};
export const TextIconChip = ({ text, icon, textSX, iconSX, wh = 28 }: TextIconChipProps) => {
    const SX = {
        textSX,
        iSX: { ...{ width: wh, height: wh, p: 0.3 }, ...iconSX }
    }
    return (
        <Box
            display={'flex'}
            alignContent={'center'}
            maxHeight={'2em'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={1}>
            <Box component={Avatar} variant='square' sx={SX.iSX}>

                {icon ?
                    icon
                    :
                    <WifiTetheringOutlinedIcon />}
            </Box>

            <Box sx={SX.textSX}
            >
                <span>{text}</span>
            </Box>
        </Box>
    );
};
