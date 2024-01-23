import { Box, Container, FormControl, FormHelperText, FormLabel, ImageList, ImageListItem, Input, InputLabel, Stack } from '@mui/material'
import React, { useState } from 'react'
import { FrameFactory } from '../../../Models/FrameFactory'
import { _ID, _log, _s, _ss } from '../../../Helpers/HelpersFns'
import ff from '../../../Assets/ff.svg'
import s1 from '../../../Assets/s1.svg'
import { SvgMainFrame } from '../../../Models/WinFrameModel/SvgMainFrame'


type TestPageProps = {}

export const TestPage: React.FC<TestPageProps> = (props) => {
    const [params, setParams] = useState({ width: 300, height: 480, x1: 0, y1: 0, x2: 300, y2: 480 })
    const changeHandler = (param: keyof typeof params) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setParams(prev => ({ ...prev, [param]: +e.target.value }))
    }

    const tt = new FrameFactory('tt')

    const { x1 = 0, y1 = 0, x2 = 0, y2 = 0 } = params

    return (
        <Container disableGutters fixed maxWidth='lg' sx={ { borderWidth: 2, borderColor: 'red' } }>
            <Stack direction={ 'row' } useFlexGap gap={ 6 }>
                <Stack mx={ 2 }
                    sx={ {
                        [`& .MuiInputBase-input`]: { maxWidth: 60, textAlign: 'center' }
                    } }
                >

                    <FormControl>
                        <FormHelperText >
                            Width
                        </FormHelperText>
                        {/* <InputLabel id='inputW' > Width </InputLabel> */ }
                        <Input onChange={ changeHandler('width') }
                            value={ +params.width }
                            id='inputW'
                            placeholder='width'

                        />


                    </FormControl>
                    <FormControl>
                        <FormHelperText>Height</FormHelperText>
                        <Input onChange={ changeHandler('height') }
                            value={ +params.height }
                            id='inputW'
                            placeholder='height'
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText>x1</FormHelperText>
                        <Input onChange={ changeHandler('x1') }
                            value={ +params.x1 }
                            id='inputW'
                            placeholder='x1'
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText>y1</FormHelperText>
                        <Input onChange={ changeHandler('y1') }
                            value={ +params.y1 }
                            id='inputW'
                            placeholder='y1'
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText>x2</FormHelperText>
                        <Input onChange={ changeHandler('x2') }
                            value={ +params.x2 }
                            id='inputW'
                            placeholder='x2'
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText>y2</FormHelperText>
                        <Input onChange={ changeHandler('y2') }
                            value={ +params.y2 }
                            id='inputW'
                            placeholder='y2'
                        />
                    </FormControl>

                </Stack>

                <SvgMainFrame
                    height={ +params.height }
                    width={ +params.width }
                    pos={ [+x1, +y1, +x2, +y2] } />

            </Stack>

        </Container>
    )
}


export const FrameBox = ({ frame }: { frame: typeof TestFrame }) => {
    const rama = {
        size: frame.size,
        borders: {
            top: 'rama',
            right: 'rama',
            bottom: 'rama',
            left: 'rama',
        }
    }

    const nodes = frame.nodes
    return (
        <Box sx={ { border: '2px solid #000', ...rama.size, background: `url(${ff}) no-repeat top/100% content-box` } } position={ 'relative' } >

            <img src={ s1 } width={ '50%' } alt='not found' className='absolute' />
            <img src={ s1 } className='rotate-180 absolute left-[50%]' alt='not found' width={ '50%' } />
            {/* <img src={ s1 } alt='not found' /> */ }


        </Box>
    )


}



// const testbox = <Box sx={ { ...rama.size, border: "2px solid black" } } position={ 'relative' } key={ 'rama' }>
//         { nodes.map(n =>
//             <Box key={ n._id } sx={ { ...n.resultSize, ...n.pos, border: "2px solid black", position: 'absolute' } } >
//                 {/* <Box sx={ { ...n.resultSize, ...n.pos, bgcolor: '#ffffff' } } textAlign={ 'center' }>
//                     nodeId: { n._id }
//                 </Box> */}
//             </Box>
//         ) }
//     </Box>

const TestFrame = {
    size: { width: 450, height: 600 },
    nodes: [
        {
            _id: 1,
            _size: _ss(200, 600),
            pos: { left: 10, top: 10 },
            bsides: {
                top: 'rama',
                right: 'impost',
                bottom: 'rama',
                left: 'rama',
            },
            bdelta: {
                top: 10,
                right: 6,
                bottom: 10,
                left: 10,
            },
            state: 'fix',
            resultSize: {
                width: 200 - 6 - 10,
                height: 600 - 10 - 10
            }
        },
        {
            _id: 2,
            _size: _ss(250, 600),
            pos: { left: 210, top: 13 },
            bsides: {
                top: 'rama',
                right: 'rama',
                bottom: 'rama',
                left: 'impost',
            },
            bdelta: {
                top: 13,
                right: 13,
                bottom: 13,
                left: 9,
            },
            state: 'stv',
            resultSize: {
                width: 250 - 13 - 9,
                height: 600 - 13 - 13
            }
        }]
}

