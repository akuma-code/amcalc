import { Button, Container, FormControl, FormHelperText, Input, Slider, Stack } from '@mui/material'
import React, { PropsWithChildren, useState } from 'react'
import { _SizeF, _p, _ss } from '../../../Helpers/HelpersFns'
import { FrameTypeF } from '../../../Models/FrameComponent/FrameTypeF'
import { FrameTypeFF } from '../../../Models/FrameComponent/FrameTypeFF'
import FrameBorder from '../../../Models/FrameComponent/FrameBorder'
import FrameBordersBlock from '../../../Models/FrameComponent/FrameBorderBox'
import FrameF1 from '../../../Models/FrameComponent/TypeF/FrameF1'
import FrameFF1 from '../../../Models/FrameComponent/TypeFF/FrameFF1'


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
    // const TT = FrameRamaA({ size: _ss(params.width, params.height), pos: _p(params.x, params.y) })


    return (
        <Container disableGutters maxWidth='lg' sx={ { borderWidth: 2, borderColor: '#ff0000' } }>
            <Stack direction={ 'row' } useFlexGap gap={ 8 }>
                <Stack mx={ 2 }
                    sx={ {
                        [`& .MuiInputBase-input`]: { maxWidth: 80, textAlign: 'center' }
                    } }
                >
                    <form className='flex flex-col w-56'>


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

                        <FormControl >
                            <div className="flex flex-row gap-4"> PosX  <Slider value={ params.x } onChange={ (e, value) => { setParams(prev => ({ ...prev, x: +value })) } } step={ 5 } max={ 500 } min={ 0 } />{ params.x }</div>
                        </FormControl>
                        <FormControl >
                            <div className='flex flex-row gap-4'>  PosY
                                <Slider value={ params.y } onChange={ (e, value) => { setParams(prev => ({ ...prev, y: +value })) } } step={ 5 } max={ 500 } min={ 0 } /> { params.y }</div>
                        </FormControl>
                        <Button variant='contained' onClick={ () => setData(prev => ({ ...prev, ...params })) } >Submit</Button>
                    </form>
                </Stack>

                <Stack >

                    <DrawCanvas size={ _ss(2000, 2000) }
                    >
                        {
                            //  data &&
                            // <FrameTypeF
                            //     size={ _ss(data.width, data.height) }
                            //     pos={ _p(params.x, params.y) }
                            // />
                        }
                        {
                            // data &&
                            // <FrameTypeFF
                            //     size={ _ss(data.width, data.height) }
                            //     pos={ _p(params.x, params.y) } />
                        }

                        {
                            data &&
                            <FrameFF1
                                size={ _ss(data.width, data.height) }
                                pos={ _p(params.x, params.y) }
                            />
                        }
                        {/* <FrameBorder
                            dir='top'
                            coords={ [_p(params.x, params.y), _p(params.x + 500, params.y)] }
                        />
                        <FrameBorder
                            dir='right'
                            coords={ [_p(params.x + 500, params.y), _p(params.x + 500, params.y + 600)] }
                        />
                        <FrameBorder
                            dir='bottom'
                            coords={ [_p(params.x + 500, params.y + 600), _p(params.x, params.y + 600)] }
                        />
                        <FrameBorder
                            dir='left'
                            coords={ [_p(params.x, params.y + 600), _p(params.x, params.y)] }
                        /> */}
                    </DrawCanvas>
                </Stack>

            </Stack>

        </Container >
    )
}

export const DrawCanvas: React.FC<{ size: _SizeF } & PropsWithChildren> = ({ children, size }) => {

    return <svg xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={ `0 0 ${size.width} ${size.height}` }
        className='bg-gray-300'
        width={ '45rem' }
        height={ '45rem' }
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

