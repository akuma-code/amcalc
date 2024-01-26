import { Box, Button, Container, FormControl, FormHelperText, Input, Slider, Stack } from '@mui/material'
import React, { PropsWithChildren, useState } from 'react'
import ff from '../../../Assets/ff.svg'
import s1 from '../../../Assets/s1.svg'
import { _CPoint, _SizeF, _p, _ss } from '../../../Helpers/HelpersFns'
import { SvgMainFrame } from '../../../Models/WinFrameModel/SvgMainFrame'
import { RamaF } from '../../../Models/WinFrameModel/RamaF'
import { RamaFF } from '../../../Models/WinFrameModel/RamaFF'
import { FrameState } from '../../../Models/WinFrameModel/FrameStateData'
import { Stvorka } from '../../../Models/WinFrameModel/Stvorka'
import { ARama } from '../../../Models/WinFrameModel/Rama/ARama'


type TestPageProps = {}

export const TestPage: React.FC<TestPageProps> = (props) => {
    const [params, setParams] = useState({ width: 500, height: 500, x: 0, y: 0 })
    const [data, setData] = useState<typeof params | undefined>()
    const changeHandler = (param: keyof typeof params) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setParams(prev => ({ ...prev, [param]: +e.target.value }))
    }
    // const _s = _ss(data?.width || 600, data?.height || 600)
    // const frame = new FrameState(_s, [params.x, params.y])
    // console.log('frame', frame.stvs.map(s => s.pos))
    const TT = ARama({ size: _ss(params.width, params.height), pos: _p(params.x, params.y) })


    return (
        <Container disableGutters fixed maxWidth='lg' sx={ { borderWidth: 2, borderColor: 'red' } }>
            <Stack direction={ 'row' } useFlexGap gap={ 8 }>
                <Stack mx={ 2 }
                    sx={ {
                        // flexDirection: 'column', flexWrap: 'nowrap',
                        [`& .MuiInputBase-input`]: { maxWidth: 80, textAlign: 'center' }
                    } }
                >
                    <form className='flex flex-col w-64'>


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
                        {/* <FormControl>
                            <FormHelperText>x1</FormHelperText>
                            <Input onChange={ changeHandler('x') }
                                value={ +params.x }
                                id='inputX'
                                placeholder='x'
                            />
                        </FormControl>
                        <FormControl>
                            <FormHelperText>y1</FormHelperText>
                            <Input onChange={ changeHandler('y') }
                                value={ +params.y }
                                id='inputY'
                                placeholder='y'
                            />
                        </FormControl> */}
                        <FormControl >
                            <div className="flex flex-row gap-4"> PosX  <Slider value={ params.x } onChange={ (e, value) => { setParams(prev => ({ ...prev, x: +value })) } } step={ 5 } max={ 500 } min={ 0 } />{ params.x }</div>
                        </FormControl>
                        <FormControl >
                            <div className='flex flex-row gap-4'>  PosY
                                <Slider value={ params.y } onChange={ (e, value) => { setParams(prev => ({ ...prev, y: +value })) } } step={ 5 } max={ 500 } min={ 0 } /> { params.y }</div>
                        </FormControl>
                        <Button variant='contained' onClick={ () => setData(prev => ({ ...prev, ...params })) }>Submit</Button>
                    </form>
                </Stack>
                {/* <svg xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox={ `0 0 800 800` }
                    width={ 800 }
                    height={ 800 }
                > */}
                <Stack >

                    <DrawContainer size={ _ss(2000, 2000) }
                    >
                        {/* <Stvorka
                        w={ 300 }
                        h={ 500 }
                        anchor={ { _type: 'impost', p: [0, 0] } }
                    /> */}
                        {
                            // data &&
                            // <RamaFF
                            //     size={ _ss(data.width, data.height) }
                            //     pos={ _p(data.x, data.y) }
                            // />
                        }
                        { data &&
                            <ARama
                                size={ _ss(data.width, data.height) }
                                pos={ _p(params.x, params.y) }
                            />
                        }
                    </DrawContainer>
                </Stack>
                {
                    // data &&

                    // <RamaF
                    //     size={ _ss(data.width / 3, data.height) }
                    //     pos={ _p(data.x + data.width, data.y) }
                    // />

                }

                {/* </svg> */ }
            </Stack>

        </Container >
    )
}

export const DrawContainer: React.FC<{ size: _SizeF } & PropsWithChildren> = ({ children, size }) => {

    return <svg xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={ `0 0 ${size.width} ${size.height}` }
        // { ...size }
        className='bg-gray-300'
        width={ 1000 }
        height={ 1000 }
    >
        { children }
    </svg>
}

// export const FrameBox = ({ frame }: { frame: typeof TestFrame }) => {
//     const rama = {
//         size: frame.size,
//         borders: {
//             top: 'rama',
//             right: 'rama',
//             bottom: 'rama',
//             left: 'rama',
//         }
//     }

//     const nodes = frame.nodes
//     return (
//         <Box sx={ { border: '2px solid #000', ...rama.size, background: `url(${ff}) no-repeat top/100% content-box` } } position={ 'relative' } >

//             <img src={ s1 } width={ '50%' } alt='not found' className='absolute' />
//             <img src={ s1 } className='rotate-180 absolute left-[50%]' alt='not found' width={ '50%' } />
//             {/* <img src={ s1 } alt='not found' /> */ }


//         </Box>
//     )


// }



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

