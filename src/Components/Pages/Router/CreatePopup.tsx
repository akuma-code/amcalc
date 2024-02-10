import { Button, FormControl, IconButton, Input, InputLabel, Slider, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import { _Point, _SizeF, _p, _ss } from '../../../Helpers/HelpersFns';
import { IFrameVariants, TSide, TSidesArray } from '../../../Interfaces/Enums';
import { _DRAWPATH } from '../../../Models/Drower/DrawPaths';
import { drawframe } from '../../../Models/Drower/DrawerFns';
import { FrameMainProps, _FrameNodeData } from './DrawerPage';

type CreatePopupProps = {
    isOpen: boolean;
    toggleOpen: () => void;
    onCreate: (data: FrameMainProps) => void;
};
export const CreatePopup: React.FC<CreatePopupProps> = ({ isOpen, toggleOpen, onCreate }) => {

    const [data, setData] = useState({ width: 500, height: 800, x: 0, y: 0, type: 'f' as const });

    // const [frame_rama, nodes] = useFrameData(
    //     {
    //         size: _ss(data.width, data.height),
    //         pos: _p(data.x, data.y),
    //     },
    //     new FrameNodeWithSides({ right: 'imp' }),
    //     new FrameNodeWithSides({ left: 'imp' }),
    // )
    // _log(nodes)
    const isSelected = (type: FrameMainProps['type']) => data.type === type
    const handleClickOpen = () => {
        toggleOpen();
        ModelSkeleton({ size: _ss(data.width, data.height) })
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
                    <Stack useFlexGap>
                        <ToggleButtonGroup
                            value={ data }
                            onChange={ (e, v) => setData(prev => ({ ...prev, type: v })) }
                            exclusive
                            sx={ { [`& .MuiToggleButton-root.Mui-selected`]: { fontWeight: 'bolder', bgcolor: 'red' } } }
                        >
                            <ToggleButton value={ 'f' }
                                selected={ isSelected('f') }
                            >
                                Type F
                            </ToggleButton>
                            <ToggleButton value={ 'ff' }
                                selected={ isSelected('ff') }>
                                Type FF
                            </ToggleButton>
                            <ToggleButton value={ 'fff' }
                                selected={ isSelected('fff') }>
                                Type FFF
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-full">

                                <div className="flex flex-col gap-4 flex-grow-0">
                                    <FormControl>
                                        <div className="flex flex-row gap-4 max-w-52">

                                            W
                                            <Slider value={ data.width } onChange={ (e, value) => { setData(prev => ({ ...prev!, width: +value })); } }
                                                step={ 100 }
                                                max={ 2000 }
                                                min={ 400 } />
                                            { data.width }
                                        </div>
                                    </FormControl>
                                    <FormControl>
                                        <div className="flex flex-row gap-4 max-w-52">
                                            H
                                            <Slider value={ data.height } onChange={ (e, value) => { setData(prev => ({ ...prev!, height: +value })); } }
                                                step={ 100 }
                                                max={ 2000 }
                                                min={ 400 } />
                                            { data.height }
                                        </div>
                                    </FormControl>
                                </div>
                                {/* <div className="flex flex-row gap-4 flex-grow"> */ }
                                <Stack useFlexGap direction={ 'row' } columnGap={ 2 } mt={ 3 } justifyContent={ 'space-between' } flexGrow={ 1 } maxWidth={ '16rem' }
                                    sx={ {
                                        border: '2px double black', p: 1,
                                        [`& .MuiFormControl-root`]: { flexDirection: 'row', gap: 1 },
                                        [`& .MuiInput-root.MuiInput-underline`]: { bgcolor: 'inherit', maxWidth: 150, textAlign: 'center', pt: 1, mx: 'auto' },

                                    } } >



                                    <FormControl variant='filled'
                                    >


                                        <Input value={ data.x || 0 } onChange={ (e) => { setData(prev => ({ ...prev!, x: +e.target.value })) } }
                                            id='posx'
                                        />
                                        <InputLabel sx={ { fontWeight: 'bold', fontSize: 18, justifyItems: 'end', } } htmlFor='posx' >
                                            X coord
                                        </InputLabel>
                                        <IconButton sx={ {
                                            ml: 1, bgcolor: 'hsl(0, 0%, 42%)', maxHeight: 'fit-content'
                                        } } color='warning' size='small'
                                            onClick={ () => setData(prev => ({ ...prev!, x: 0 })) }>R</IconButton>
                                    </FormControl>
                                    <FormControl variant='filled'>


                                        <Input value={ data.y || 0 } onChange={ (e) => { setData(prev => ({ ...prev!, y: +e.target.value })) } }
                                            id='posy'
                                        />
                                        <InputLabel sx={ { fontWeight: 'bold', fontSize: 18, justifyItems: 'end' } } htmlFor='posy' >
                                            Y coord
                                        </InputLabel>
                                        <IconButton sx={ {
                                            ml: 1, bgcolor: 'hsl(0, 0%, 42%)', maxHeight: 'fit-content'
                                        } } color='warning' size='small'
                                            onClick={ () => setData(prev => ({ ...prev!, y: 0 })) }>R</IconButton>

                                    </FormControl>
                                </Stack>
                                {/* </div> */ }
                            </div>
                            <div className='w-42 h-42'>
                                <div>
                                    <svg
                                        viewBox='0 0 100 100' width={ '100%' } height={ '100%' }

                                    >
                                        {/* <path d={_DRAWPATH.type_f} stroke='black' fill='transparent' /> */ }
                                        { drawframe(_DRAWPATH[data.type]) }
                                    </svg>
                                    {/* <svg viewBox={_viewboxStr(data.width / 10, data.height / 10)} width={100} height={100} >
                                        <g>

                                            <path d={`m0 0 h${data.width} v${data.height} h-${data.width} z`} stroke='black' fill='none' />
                                            <path d={`m${data.width * .1} ${data.height * .1} h${data.width * .8} v${data.height * .8} h${-data.width * .8} z`} stroke='grey' fill='#46c5db' strokeDasharray={'10 10'} fillOpacity={.3} />
                                        </g>
                                    </svg> */}
                                </div>
                            </div>
                        </div>
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



export interface IModelSkeletonProps {
    size: _SizeF
    type?: IFrameVariants
    pos?: _Point
}
export const ModelSkeleton = ({ type = 'f', size, pos = { x: 0, y: 0 } }: IModelSkeletonProps) => {
    const { width, height } = size
    const offset = _p(width * .1, height * .1)
    const _offsetsize = { dw: width - offset.x * 2, dh: height - offset.y * 2 }
    const scale = +(height / width).toFixed(2)

    const _viewbox = `0 0 100 ${(scale * 100).toFixed(0)}`


}

const _viewboxStr = (width: number, height: number) => {
    const scale = +(height / width).toFixed(2)
    const _viewbox = `0 0 100 ${(scale * 100).toFixed(0)}` as const
    return _viewbox
}

function iter<T extends { side: TSide, state: 'rama' | 'imp' }>(acc: T[], sides: _FrameNodeData['sides']) {
    for (let side of TSidesArray) {
        const s = side
        const state = sides[s]
        if (state !== 'rama') acc.push({ side: s, state } as T)
    }
    return acc
}