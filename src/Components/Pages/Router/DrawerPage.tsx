import { Button, Divider, FormControl, Slider, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { _p, _ss } from '../../../Helpers/HelpersFns';
type DataProps = {
    width: number;
    height: number;
    x: number;
    y: number;
}

const DrawerPage = () => {
    const [frame, setFrame] = useState<DataProps | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const createHandler = (data: DataProps) => setFrame(prev => ({ ...prev, ...data }))


    return (
        <Stack useFlexGap direction={ 'column' }>
            <Divider >
                <h3 className='text-center text-4xl'>DrawerPage</h3>

            </Divider>

            <Stack direction={ 'row' } useFlexGap gap={ 4 } mx={ 4 }>
                <CreatePopup isOpen={ isOpen }
                    toggleOpen={ () => { setIsOpen(prev => !prev) } }
                    onCreate={ createHandler }
                />
                <Button variant='contained' color='warning'
                    onClick={ () => setFrame(null) }
                >
                    Delete Frame
                </Button>

            </Stack>
            <Outlet />
        </Stack>
    )
}

export default DrawerPage

type CreatePopupProps = {
    isOpen: boolean
    toggleOpen: () => void
    onCreate: (data: { width: number, height: number, x: number, y: number }) => void
}
export const CreatePopup: React.FC<CreatePopupProps> = ({ isOpen, toggleOpen, onCreate }) => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({ width: 500, height: 500, x: 0, y: 0 })


    const handleClickOpen = () => {
        toggleOpen()

    };

    const handleClose = () => {
        toggleOpen()

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
                        onCreate(data)
                        handleClose();
                    },
                } }
            >
                <DialogTitle>Create Frame Type F</DialogTitle>
                <DialogContent >
                    <DialogContentText gap={ 4 } display={ 'flex' } justifyContent={ 'center' }>
                        <span>Type: 'FF'</span>
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

                        <FormControl >
                            <div className="flex flex-row gap-4">
                                W
                                <Slider value={ data.width } onChange={ (e, value) => { setData(prev => ({ ...prev!, width: +value })) } }
                                    step={ 100 }
                                    max={ 2000 }
                                    min={ 400 } />
                                { data.width }
                            </div>
                        </FormControl>
                        <FormControl >
                            <div className="flex flex-row gap-4">
                                H
                                <Slider value={ data.height } onChange={ (e, value) => { setData(prev => ({ ...prev!, height: +value })) } }
                                    step={ 100 }
                                    max={ 2000 }
                                    min={ 400 } />
                                { data.height }
                            </div>
                        </FormControl>
                        <FormControl >
                            <div className="flex flex-row gap-4">
                                X
                                <Slider value={ data.x } onChange={ (e, value) => { setData(prev => ({ ...prev!, x: +value })) } }
                                    step={ 10 }
                                    max={ 2000 }
                                    min={ 0 } />
                                { data.x }
                            </div>
                        </FormControl>
                        <FormControl >
                            <div className="flex flex-row gap-4">
                                Y
                                <Slider value={ data.y } onChange={ (e, value) => { setData(prev => ({ ...prev!, y: +value })) } }
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
    )
}
function nodeGenerator(type: 'f' | 'ff' | 'fff') {

    const _nodes = {
        f: [
            {
                id: "s1",
                coords: [
                    { "x": 0, y: 0 },
                    { "x": 350, y: 800 }
                ],
                stateSide: {
                    bottom: "rama",
                    left: "rama",
                    right: "impost",
                    top: "rama"
                },
                size: {
                    width: 350,
                    height: 800
                }
            }
        ],
        ff: [
            {
                id: "s1",
                coords: [
                    { "x": 0, y: 0 },
                    { "x": 350, y: 800 }
                ],
                stateSide: {
                    bottom: "rama",
                    left: "rama",
                    right: "impost",
                    top: "rama"
                },
                size: {
                    width: 350,
                    height: 800
                }
            },
            {
                id: "s2",
                coords: [
                    { x: 350, y: 0 },
                    { x: 700, y: 800 }
                ],
                stateSide: {
                    bottom: "rama",
                    left: "impost",
                    right: "rama",
                    top: "rama"
                },
                size: {
                    width: 350,
                    height: 800
                }
            }
        ],
        fff: [
            {
                id: "s1",
                coords: [
                    { "x": 0, y: 0 },
                    { "x": 350, y: 800 }
                ],
                stateSide: {
                    bottom: "rama",
                    left: "rama",
                    right: "impost",
                    top: "rama"
                },
                size: {
                    width: 350,
                    height: 800
                }
            },
            {
                id: "s2",
                coords: [
                    { "x": 0, y: 0 },
                    { "x": 350, y: 800 }
                ],
                stateSide: {
                    bottom: "rama",
                    left: "rama",
                    right: "impost",
                    top: "rama"
                },
                size: {
                    width: 350,
                    height: 800
                }
            },
            {
                id: "s3",
                coords: [
                    { "x": 0, y: 0 },
                    { "x": 350, y: 800 }
                ],
                stateSide: {
                    bottom: "rama",
                    left: "rama",
                    right: "impost",
                    top: "rama"
                },
                size: {
                    width: 350,
                    height: 800
                }
            },

        ]
    }

    return _nodes[type]
}