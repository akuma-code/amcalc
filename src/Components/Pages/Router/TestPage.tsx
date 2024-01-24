import { Box, Button, Container, FormControl, FormHelperText, Input, Stack } from '@mui/material'
import React, { useState } from 'react'
import ff from '../../../Assets/ff.svg'
import s1 from '../../../Assets/s1.svg'
import { _p, _ss } from '../../../Helpers/HelpersFns'
import { SvgMainFrame } from '../../../Models/WinFrameModel/SvgMainFrame'
import { RamaF } from '../../../Models/WinFrameModel/RamaF'
import { RamaFF } from '../../../Models/WinFrameModel/RamaFF'


type TestPageProps = {}

export const TestPage: React.FC<TestPageProps> = (props) => {
    const [params, setParams] = useState({ width: 300, height: 480, x1: 0, y1: 0 })
    const [data, setData] = useState<typeof params | undefined>()
    const changeHandler = (param: keyof typeof params) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setParams(prev => ({ ...prev, [param]: +e.target.value }))
    }

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
                            id='inputH'
                            placeholder='height'
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText>x1</FormHelperText>
                        <Input onChange={ changeHandler('x1') }
                            value={ +params.x1 }
                            id='inputX1'
                            placeholder='x1'
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText>y1</FormHelperText>
                        <Input onChange={ changeHandler('y1') }
                            value={ +params.y1 }
                            id='inputY1'
                            placeholder='y1'
                        />
                    </FormControl>
                    {/* <FormControl>
                        <FormHelperText>x2</FormHelperText>
                        <Input onChange={ changeHandler('x2') }
                            value={ +params.x2 }
                            id='inputX2'
                            placeholder='x2'
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText>y2</FormHelperText>
                        <Input onChange={ changeHandler('y2') }
                            value={ +params.y2 }
                            id='inputY2'
                            placeholder='y2'
                        />
                    </FormControl> */}
                    <Button variant='contained' onClick={ () => setData(prev => params) }>Submit</Button>
                </Stack>
                <svg xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox={ `0 0 800 800` }
                    width={ 800 }
                    height={ 800 }
                >

                    {
                        // data &&

                        // <RamaF
                        //     size={ _ss(data.width, data.height) }
                        //     pos={ _p(data.x1, data.y1) }
                        // />

                    }
                    { data &&
                        <RamaFF
                            size={ _ss(600, 500) }
                            pos={ _p(0, 0) }
                        />
                    }
                </svg>
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

