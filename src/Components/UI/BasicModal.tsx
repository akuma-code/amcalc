import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SettingsIcon from '@mui/icons-material/Settings';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
type ModalProps = {
    title?: string
    button_label?: string
    variant: 'button' | 'icon'
} & React.PropsWithChildren
export const BasicModal: React.FC<ModalProps> = ({ button_label, children, title, variant }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            { variant === 'button' &&
                <Button onClick={ handleOpen } variant='contained'>{ button_label || "Open" }</Button>
            }
            { variant === 'icon' &&
                <Button onClick={ handleOpen }>{ <SettingsIcon color='info' sx={ { width: 35, height: 35 } } /> }</Button>
            }
            <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={ style }>
                    { title &&
                        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={ 'right' }>
                            { title }
                        </Typography>
                    }
                    <Stack>
                        { children }
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}