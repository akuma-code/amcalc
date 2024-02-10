import { Button, Container, FormControl, FormHelperText, Input, Slider, Stack } from '@mui/material'
import React, { useState } from 'react'
import { _p, _ss } from '../../../Helpers/HelpersFns'
import FrameFF1 from '../../../Models/FrameComponent/TypeFF/FrameFF1'
import FrameF1 from '../../../Models/FrameComponent/TypeF/FrameF1'
import { FrameContextMobx, NodeStore } from '../../../Context/FrameContext/FrameContext'
import { FrameContext } from '../../../Hooks/useFrameContext'
import { observer } from 'mobx-react-lite'
import { DrawCanvas } from './DrawCanvas'
import { Rulers } from './DrawerImage/Rulers'
import { FrameViewA } from '../../../Models/FrameComponent/FrameView/FrameViewA'


type TestPageProps = {}

const ctx = new FrameContextMobx(_ss(500, 500))
export const TestPage: React.FC<TestPageProps> = (props) => {
    const [params, setParams] = useState({ width: 500, height: 500, x: 0, y: 0 })
    const [data, setData] = useState<typeof params>({ width: 500, height: 500, x: 0, y: 0 })
    const changeHandler = (param: keyof typeof params) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setParams(prev => ({ ...prev, [param]: +e.target.value }))
    }


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

                        { data && <FormControl >
                            <div className="flex flex-row gap-4">
                                W
                                <Slider value={ data.width } onChange={ (e, value) => { setData(prev => ({ ...prev!, width: +value })) } }
                                    step={ 100 }
                                    max={ 2000 }
                                    min={ 400 } />
                                { data.width }
                            </div>
                        </FormControl> }
                        { data && <FormControl >
                            <div className="flex flex-row gap-4">
                                H
                                <Slider value={ data.height } onChange={ (e, value) => { setData(prev => ({ ...prev!, height: +value })) } }
                                    step={ 100 }
                                    max={ 2000 }
                                    min={ 400 } />
                                { data.height }
                            </div>
                        </FormControl> }
                        <FormControl >
                            <div className="flex flex-row gap-4">
                                PosX
                                <Slider value={ params.x } onChange={ (e, value) => { setParams(prev => ({ ...prev, x: +value })) } }
                                    step={ 5 }
                                    max={ 500 }
                                    min={ 0 } />{ params.x }
                            </div>
                        </FormControl>
                        <FormControl >
                            <div className='flex flex-row gap-4'>
                                PosY
                                <Slider value={ params.y } onChange={ (e, value) => { setParams(prev => ({ ...prev, y: +value })) } }
                                    step={ 5 }
                                    max={ 500 }
                                    min={ 0 } /> { params.y }</div>
                        </FormControl>
                        <Button variant='contained' onClick={ () => setData(prev => ({ ...prev, ...params })) } >Submit</Button>
                    </form>
                </Stack>

                <Stack >

                    <DrawCanvas viewBoxSize={ _ss(2000, 2000) }
                    >
                        <FrameContext.Provider
                            value={ {
                                FrameCtx: new FrameContextMobx(_ss(params.width, params.height), _p(params.x, params.y)),
                                NodeStore: new NodeStore()
                            } }
                        >

                            {
                                // data &&
                                // <FrameF1
                                //     size={ _ss(data.width, data.height) }
                                //     pos={ _p(params.x, params.y) }
                                // />
                            }
                            {
                                data &&
                                <FrameFF1
                                    frame_size={ _ss(500, 800) }
                                    pos={ _p(1500, 1200) }
                                />
                            }
                            {
                                <FrameViewA
                                    rama_size={ _ss(data.width, data.height) }
                                    rama_pos={ _p(data.x, data.y) }
                                />
                            }
                            <Rulers c={ 20 } />
                        </FrameContext.Provider>
                    </DrawCanvas>
                </Stack>

            </Stack>

        </Container >
    )
}

