import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react-lite';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Cloud, ContentCopy, ContentCut, ContentPaste } from '@mui/icons-material';
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector';

export const ViewControlBar = observer(() => {

    const { ViewConfig: VC } = useStoresContext()


    return (
        <Box sx={{ flexGrow: 1 }} top={0}>
            <AppBar position="absolute">
                <Toolbar variant='dense'>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ViewConfig setup
                    </Typography>

                    <ToggleViewOutputButton />
                </Toolbar>
            </AppBar>
        </Box>
    );
})
ViewControlBar.displayName = '*** ViewControl ***'

type ToggleViewProps = {


}
const ToggleViewOutputButton: React.FC<ToggleViewProps> = observer((props) => {
    const { ViewConfig } = useStoresContext()

    const handleView = (
        e: React.MouseEvent<HTMLElement>,
        value: InputsTypeEnum) => {
        ViewConfig.selectOut(value)


    }
    const isSelected = (value: InputsTypeEnum) => {
        return value === ViewConfig.selected_output
    }
    return (
        <ToggleButtonGroup
            value={ViewConfig.selected_output}
            exclusive
            onChange={handleView}

        >
            <b className='m-auto px-2'>Output:</b>
            <ToggleButton value={InputsTypeEnum.size_full} color='warning' selected={isSelected(InputsTypeEnum.size_full)} >
                <b>Sizes </b>
            </ToggleButton>
            <ToggleButton value={InputsTypeEnum.offset5} color='warning' selected={isSelected(InputsTypeEnum.offset5)}>
                <b> Offset</b>
            </ToggleButton>

        </ToggleButtonGroup>
    )
})