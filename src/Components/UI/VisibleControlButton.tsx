import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import LogoDevSharpIcon from '@mui/icons-material/LogoDevSharp';
import PreviewSharpIcon from '@mui/icons-material/PreviewSharp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { SvgIconTypeMap } from '@mui/material';
import Box from '@mui/material/Box';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { IVisibileItems } from '../../Context/ThemeView';
import { useStoresContext } from '../../Hooks/useStoresContext';



type ISpeedActionItem = {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    },
    name: string,
    view: keyof IVisibileItems,
}



const actions: ISpeedActionItem[] = [
    { icon: LogoDevSharpIcon, name: 'devtools', view: 'devtools', },
    { icon: AlignVerticalTopIcon, name: 'offset', view: 'showOffset5', },
    { icon: AspectRatioIcon, name: 'otkosi', view: 'showOtkosi', },
    { icon: ReceiptOutlinedIcon, name: 'simple', view: 'showSimple', },
    { icon: ReceiptIcon, name: 'skf', view: 'showSkf', },
];

export const VisibleControlBotton = observer(() => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { ViewConfig } = useStoresContext()

    const toggleView = (option_id: keyof IVisibileItems) => {
        ViewConfig.toggleVisible(option_id)

    }
    const actualState = React.useMemo(() => {
        const show = ViewConfig.visible

        return show
    }, [ViewConfig.visible])

    const updateAction = React.useCallback((action: ISpeedActionItem) => {

        const styleView = actualState[action.view] ? { opacity: 1, color: 'green' } : { opacity: 0.7, color: '#e00f0f' }
        const Icon = action.icon

        return { ...action, icon: <Icon sx={{ ...styleView }} /> }
    }, [actualState])
    const updatedActions = React.useMemo(() => actions.map(updateAction), [updateAction])
    return (
        <Box sx={{ height: 'fit-contnet', transform: 'translateZ(0px)' }} >
            {/* <Backdrop open={open} /> */}
            <SpeedDial direction='up'
                ariaLabel="SpeedDial tooltip example"
                sx={{ bot: 8, right: 16, zIndex: 2 }}
                icon={<PreviewSharpIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >

                {updatedActions.map((action) => (


                    <SpeedDialAction FabProps={{ sx: { bgcolor: '#b9b1da' } }}
                        key={action.name}
                        icon={action.icon}

                        tooltipTitle={action.name}
                        tooltipPlacement='left'
                        tooltipOpen={open}
                        onClick={() => toggleView(action.view)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
})