import { Button, FormControl, Slider, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IFrameVariants } from '../../../Interfaces/Enums';
import { FrameMainProps } from './DrawerPage';
import { _Point, _SizeF, _log, _p, _ss } from '../../../Helpers/HelpersFns';
import { _DRAWPATH } from '../../../Models/Drower/DrawPaths';

type CreatePopupProps = {
    isOpen: boolean;
    toggleOpen: () => void;
    onCreate: (data: FrameMainProps) => void;
};
export const CreatePopup: React.FC<CreatePopupProps> = ({ isOpen, toggleOpen, onCreate }) => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({ width: 500, height: 800, x: 0, y: 0, type: 'f' as const });
    const [node, setNode] = useState<{ type: IFrameVariants; }>({ type: 'f' });


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
                onClick={handleClickOpen}
            >
                Create Frame
            </Button>
            <Dialog fullWidth
                open={isOpen}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        onCreate(data);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Create Frame</DialogTitle>
                <DialogContent>
                    <DialogContentText gap={4} display={'flex'} justifyContent={'center'}>
                        <span className='font-bold'>{'Frame type: '} {data.type.toUpperCase()}</span>
                        <span>
                            Width: {data.width}
                        </span>
                        <span>
                            Height: {data.height}
                        </span>
                        <span>
                            X: {data.x}
                        </span>
                        <span>
                            Y: {data.y}
                        </span>
                    </DialogContentText>
                    <Stack useFlexGap>
                        <ToggleButtonGroup
                            value={data}
                            onChange={(e, v) => setData(prev => ({ ...prev, type: v }))}
                            exclusive

                        >
                            <ToggleButton value={'f'} selected={isSelected('f')}>Type F</ToggleButton>
                            <ToggleButton value={'ff'} selected={isSelected('ff')}>Type FF</ToggleButton>
                            <ToggleButton value={'fff'} selected={isSelected('fff')}>Type FFF</ToggleButton>
                        </ToggleButtonGroup>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-full">

                                <div className="flex flex-col gap-4 flex-grow-0">
                                    <FormControl>
                                        <div className="flex flex-row gap-4 max-w-52">

                                            W
                                            <Slider value={data.width} onChange={(e, value) => { setData(prev => ({ ...prev!, width: +value })); }}
                                                step={100}
                                                max={2000}
                                                min={400} />
                                            {data.width}
                                        </div>
                                    </FormControl>
                                    <FormControl>
                                        <div className="flex flex-row gap-4 max-w-52">
                                            H
                                            <Slider value={data.height} onChange={(e, value) => { setData(prev => ({ ...prev!, height: +value })); }}
                                                step={100}
                                                max={2000}
                                                min={400} />
                                            {data.height}
                                        </div>
                                    </FormControl>
                                </div>
                                <div className="flex flex-col gap-4 flex-grow-0">

                                    <FormControl>
                                        <div className="flex flex-row gap-4 max-w-48">
                                            X
                                            <Slider value={data.x} onChange={(e, value) => { setData(prev => ({ ...prev!, x: +value })); }}
                                                step={10}
                                                max={2000}
                                                min={0} />
                                            {data.x}
                                        </div>
                                    </FormControl>
                                    <FormControl>
                                        <div className="flex flex-row gap-4 max-w-48">
                                            Y
                                            <Slider value={data.y} onChange={(e, value) => { setData(prev => ({ ...prev!, y: +value })); }}
                                                step={10}
                                                max={2000}
                                                min={0} />
                                            {data.y}
                                        </div>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='w-42 h-42'>
                                <div>
                                    <svg
                                        viewBox='0 0 100 100' width={'100%'} height={'100%'}

                                    >
                                        {/* <path d={_DRAWPATH.type_f} stroke='black' fill='transparent' /> */}
                                        {drawframe(_DRAWPATH[`type_${data.type}`])}
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
                <DialogActions sx={{ justifyContent: 'flex-start' }}>
                    <Button type="submit" color='info' variant='contained'>Create</Button>
                    <Button onClick={handleClose} color='secondary' variant='contained'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const drawframe = (path: string) => <path d={path} stroke='black' fill='transparent' />

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
    console.log('_viewbox', _viewbox)

}

const _viewboxStr = (width: number, height: number) => {
    const scale = +(height / width).toFixed(2)
    const _viewbox = `0 0 100 ${(scale * 100).toFixed(0)}` as const
    return _viewbox
}