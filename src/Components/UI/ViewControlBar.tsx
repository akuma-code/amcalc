import MenuIcon from '@mui/icons-material/Menu';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector';
import { useStoresContext } from '../../Hooks/useStoresContext';

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
                    <Typography variant="h6" component="div" sx={{ alignSelf: 'flex-end', justifyItems: 'center', my: 'auto', mr: 1 }}>
                        Output:
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

            <ToggleButton value={InputsTypeEnum.size_full} color='warning' selected={isSelected(InputsTypeEnum.size_full)} >
                <b>Sizes </b>
            </ToggleButton>
            <ToggleButton value={InputsTypeEnum.offset5} color='warning' selected={isSelected(InputsTypeEnum.offset5)}>
                <b> Offset</b>
            </ToggleButton>

        </ToggleButtonGroup>
    )
})

