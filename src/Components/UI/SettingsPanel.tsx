import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ViewControlButtonGroup } from './ViewControlButtonGroup';
import { IconButton, Stack } from '@mui/material';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import { useStoresContext } from '../../Hooks/useStoresContext';
import LogoDevSharpIcon from '@mui/icons-material/LogoDevSharp';
import { observer } from 'mobx-react-lite';
type SettingsDialogProps = {}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export const SettingsDialog: React.FC<SettingsDialogProps> = observer((props) => {
    const { ViewConfig } = useStoresContext();
    const currentState = {
        globalFetch: ViewConfig.globalFetching,
        devtools: ViewConfig.visible.devtools
    }

    const currentColor = (state: boolean) => state ? 'green' : 'red'
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const toggleFetchingGlobal = () => ViewConfig.toggleIsFetching()
    return (
        <React.Fragment>
            <Button variant="contained" color='warning' onClick={handleClickOpen}>
                <SettingsIcon sx={{ color: 'whitesmoke' }} />
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth
                maxWidth={'sm'}
            >
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <Stack direction={'column'} >
                        <div className='border-b-2 border-black flex flex-row  justify-between cursor-pointer rounded-md hover:bg-amber-300 gap-3'
                            onClick={() => ViewConfig.toggleIsFetching()}
                        >
                            <div className='my-auto flex-grow'> Global Fetch display</div>
                            <div className='my-auto  flex-grow-0'>  {currentState.globalFetch ? 'Enabled' : 'Disabled'}</div>
                            <IconButton                             >
                                <VpnLockIcon htmlColor={currentColor(currentState.globalFetch)} />
                            </IconButton>
                        </div>
                        <div className='border-b-2 border-black flex flex-row  justify-between cursor-pointer rounded-md hover:bg-amber-300 gap-3'
                            onClick={() => ViewConfig.toggleVisible('devtools')}
                        >
                            <div className='my-auto flex-grow'> DevTools component display</div>
                            <div className='my-auto  flex-grow-0'>  {currentState.devtools ? 'Enabled' : 'Disabled'}</div>
                            <IconButton                             >
                                <LogoDevSharpIcon htmlColor={currentColor(currentState.devtools)} />
                            </IconButton>
                        </div>

                    </Stack>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
})