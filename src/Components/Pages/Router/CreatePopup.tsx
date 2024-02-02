import { Button, FormControl, Slider, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IFrameVariants } from '../../../Interfaces/Enums';
import { FrameMainProps } from './DrawerPage';

type CreatePopupProps = {
    isOpen: boolean;
    toggleOpen: () => void;
    onCreate: (data: FrameMainProps) => void;
};
export const CreatePopup: React.FC<CreatePopupProps> = ({ isOpen, toggleOpen, onCreate }) => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({ width: 500, height: 500, x: 0, y: 0, type: 'f' as const });
    const [node, setNode] = useState<{ type: IFrameVariants; }>({ type: 'f' });

    const handleClickOpen = () => {
        toggleOpen();

    };

    const handleClose = () => {
        toggleOpen();

    };
    return (
        <>
            <Button variant='contained'
                onClick={ handleClickOpen }
            >
                Create Frame
            </Button>
            <Dialog fullWidth
                open={ isOpen }
                onClose={ handleClose }
                PaperProps={ {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        onCreate(data);
                        handleClose();
                    },
                } }
            >
                <DialogTitle>Create Frame</DialogTitle>
                <DialogContent>
                    <DialogContentText gap={ 4 } display={ 'flex' } justifyContent={ 'center' }>
                        <span className='font-bold'>{ 'Frame type: ' } { data.type.toUpperCase() }</span>
                        <span>
                            Width: { data.width }
                        </span>
                        <span>
                            Height: { data.height }
                        </span>
                        <span>
                            X: { data.x }
                        </span>
                        <span>
                            Y: { data.y }
                        </span>
                    </DialogContentText>
                    <Stack>
                        <ToggleButtonGroup
                            value={ data }
                            onChange={ (e, v) => setData(prev => ({ ...prev, type: v })) }
                            exclusive
                        >
                            <ToggleButton value={ 'f' }>Type F</ToggleButton>
                            <ToggleButton value={ 'ff' }>Type FF</ToggleButton>
                            <ToggleButton value={ 'fff' }>Type FFF</ToggleButton>
                        </ToggleButtonGroup>
                        <FormControl>
                            <div className="flex flex-row gap-4">
                                W
                                <Slider value={ data.width } onChange={ (e, value) => { setData(prev => ({ ...prev!, width: +value })); } }
                                    step={ 100 }
                                    max={ 2000 }
                                    min={ 400 } />
                                { data.width }
                            </div>
                        </FormControl>
                        <FormControl>
                            <div className="flex flex-row gap-4">
                                H
                                <Slider value={ data.height } onChange={ (e, value) => { setData(prev => ({ ...prev!, height: +value })); } }
                                    step={ 100 }
                                    max={ 2000 }
                                    min={ 400 } />
                                { data.height }
                            </div>
                        </FormControl>
                        <FormControl>
                            <div className="flex flex-row gap-4">
                                X
                                <Slider value={ data.x } onChange={ (e, value) => { setData(prev => ({ ...prev!, x: +value })); } }
                                    step={ 10 }
                                    max={ 2000 }
                                    min={ 0 } />
                                { data.x }
                            </div>
                        </FormControl>
                        <FormControl>
                            <div className="flex flex-row gap-4">
                                Y
                                <Slider value={ data.y } onChange={ (e, value) => { setData(prev => ({ ...prev!, y: +value })); } }
                                    step={ 10 }
                                    max={ 2000 }
                                    min={ 0 } />
                                { data.y }
                            </div>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions sx={ { justifyContent: 'flex-start' } }>
                    <Button type="submit" color='info' variant='contained'>Create</Button>
                    <Button onClick={ handleClose } color='secondary' variant='contained'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
