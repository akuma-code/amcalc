import { Box, Button, ButtonGroup, Container, Divider, Paper, Stack } from '@mui/material'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { NavLink, useLoaderData, useParams } from 'react-router-dom'
import { Text } from '../../../UI/Text'
import ReplyIcon from '@mui/icons-material/Reply';
import { pageRoutes } from '../../../../HTTP/PATHS';
import { useStoresContext } from '../../../../Hooks/useStoresContext';
import { _FrameNodeData, _FrameStateWithNodes } from '../DrawerPage';
import { drawframe } from '../../../../Models/Drower/DrawerFns';
import { _DRAWPATH } from '../../../../Models/Drower/DrawPaths';
import { TSidesArray } from '../../../../Interfaces/Enums';
import { toJS } from 'mobx';
import { _SizeF, _isArr, _ss } from '../../../../Helpers/HelpersFns';
import { JsxElement } from 'typescript';
import { IconButton } from '../../../UI/IconButton';
import Icons from '../../../Icons/SvgIcons';
import { MasterFrame } from '../../../../Models/FrameComponent/FrameFactory/FrameCreator';
import { FrameNodeWithSides } from '../../../../Models/FrameComponent/FrameFactory/FrameNodeWithSides';
import { observer } from 'mobx-react-lite';
import { useQuery } from 'react-query';
type FrameViewProps = {}
type FrameCanvasProps = {
    _viewbox?: string
    _scale?: number | [number, number]
} & Partial<_SizeF> & PropsWithChildren

export const FrameView = observer((props: FrameViewProps) => {

    // const { id } = useLoaderData() as { id?: string }
    const { id } = useParams<{ id: string }>()
    const { NodeStore } = useStoresContext()


    const currentFrame = id ? NodeStore.getNode(id) : null
    const [nodes, setNodes] = useState(currentFrame?.nodes || [])
    const [selected, setSelected] = useState<FrameNodeWithSides | null>(null)

    const handleClickOnNode = (id: string) => {
        const currentNode = nodes.find(n => n.id === id)
        if (!currentNode) return
        setSelected(currentNode as unknown as FrameNodeWithSides)

    }
    const isSelected = (id: string) => id === selected?.id
    const resizeNode = (new_size: Partial<_SizeF>) => {
        if (!selected) return
        setNodes(prev => prev.map(n => isSelected(n.id) ? { ...n, nsize: { ...n.nsize, ...new_size } } : n))
        // setSelected(prev => ({ ...prev!, nsize: { ...prev!.nsize, ...new_size } }))
    }
    const resizeFrame = (id: string, new_size: _SizeF) => {
        if (!currentFrame) return
        NodeStore.edit(id, { size: new_size })
    }
    return currentFrame ?
        <Container sx={ { bgcolor: '#faa1a16e', mt: 2 } } maxWidth='xl' disableGutters>
            <Divider flexItem sx={ { display: 'flex', justifyContent: 'space-between', flexDirection: 'row' } }>
                <Text>Edit Frame View</Text>
                <div className="flex flex-row">

                    <NavLink to={ pageRoutes.frames } >
                        <ReplyIcon />
                        Back
                    </NavLink>

                </div>
            </Divider>
            <Stack direction={ 'row' } columnGap={ 4 } mb={ 1 } mt={ 3 }>
                <Stack component={ Paper } elevation={ 5 }
                    direction={ 'column' }
                    flexGrow={ 0 }
                    sx={ { borderRight: '4px  hsl(231, 51%, 59%)', borderStyle: 'groove' } }
                    rowGap={ 1 }
                    p={ 2 }>
                    <strong className='text-center'>Frame Data</strong>
                    <div>FrameSize: { currentFrame?.size.width }x{ currentFrame?.size.height }</div>
                    <div>Frame Position: { currentFrame?.pos.x }, { currentFrame?.pos.y }</div>
                    { selected &&
                        <ButtonGroup variant='contained' orientation='vertical' >

                            <Button variant='contained' fullWidth
                                onClick={ () => { resizeNode(_ss(100, 100)) } }
                                sx={ { border: '2px solid black' } }>
                                Height x 2
                            </Button>
                            <IconButton svg_icon={ Icons.BadgeCheck }
                                onClickFn={ () => setSelected(null) }
                                type='button'
                                desc='deselect'
                                rounded={ false }
                                bgcolor='bg-blue-400'
                            />
                        </ButtonGroup>
                    }
                </Stack>
                <Stack direction={ 'column' }
                    flexGrow={ 0 }
                    gap={ 2 }
                    sx={ { borderRight: '4px  hsl(231, 51%, 59%)', borderStyle: 'groove', borderBottom: '4px hsl(231, 51%, 59%)' } }
                    p={ 2 }

                    component={ Paper } elevation={ 5 }>
                    <strong className='text-center'>Nodes Data</strong>
                    { nodes &&
                        nodes.map(n =>
                            <div key={ n.id } className={ isSelected(n.id) ? `bg-red-100` : `inherit` }>
                                <NodeInfo node={ n } />
                                <Divider flexItem variant='fullWidth' sx={ { border: '1px solid black' } }></Divider>
                            </div>
                        ) }

                </Stack>
                <Stack direction={ 'column' } component={ Paper } elevation={ 5 } flexGrow={ 1 }
                    sx={ { borderRight: '4px  hsl(231, 51%, 59%)', borderRightStyle: 'groove', borderLeft: '4px  hsl(231, 51%, 59%)' } }
                    p={ 4 } position={ 'relative' }
                >
                    <strong>Frame View</strong>
                    <FrameCanvas
                        height={ 500 }
                    //  _viewbox='0 0 100 100'
                    // _scale={ 1 }
                    >

                        { drawframe(_DRAWPATH.f) }
                        {
                            nodes &&
                            nodes.map((n, i) => {
                                const { coords, id, } = n
                                const [anc, e] = coords
                                const [_w, _h] = [Math.abs(anc.x - e.x), Math.abs(anc.y - e.y),]
                                return <rect
                                    x={ anc.x }
                                    y={ anc.y }
                                    key={ id }
                                    width={ _w }
                                    height={ _h }
                                    fill={ isSelected(id) ? '#da6e6e' : '#5baac2' }
                                    stroke='black'
                                    onClick={ () => handleClickOnNode(id) }
                                />
                            }
                            )
                        }

                        <LineikaW _count={ 20 } />
                        <LineikaH _count={ 20 } />
                    </FrameCanvas>
                </Stack>
            </Stack>
        </Container>

        :
        <Box
            component={ Paper }
            sx={ { bgcolor: '#c73f09', py: 2, m: 5, textTransform: 'full-width', textAlign: 'center', } }
        >
            <NavLink to={ pageRoutes.frames } >
                <Text >Node with id: { id } not found! </Text>
                <ReplyIcon />
            </NavLink>
        </Box>
})

const FrameCanvas: React.FC<FrameCanvasProps> = ({ width, height, children, _viewbox, _scale }) => {
    const _rate = _isArr(_scale) ? _scale.join(" ") : _scale?.toString()

    return (
        <Box width={ width || '100%' }
            height={ height || '100%' }
            bgcolor={ '#ddd' }
            position={ 'relative' }
            overflow={ 'clip' }
        >
            <svg viewBox={ _viewbox || '0 0 2000 2000' }
                transform={ `scale(${_rate || `1 1`})` }
                preserveAspectRatio='xMinYMin meet'
            >

                { children }
            </svg>
        </Box>
    )
};
const LineikaH: React.FC<{ _count: number }> = ({ _count }) => {

    const _d = [`m0 0`, ..._stepsV(_count), 'z'].join(" ")
    const initSteps = _stepsSize(_count).map(n => ({
        numb: n, t: <text textAnchor="start" x={ -120 } y={ n === 0 ? 30 : n } fontSize={ 32 } key={ n }>{ n }</text>
    })
    )
    const [steps, setSteps] = useState(initSteps)

    return (

        <svg viewBox={ `0 0 100 2000` } preserveAspectRatio='xMinYMin meet' x={ 0 } pointerEvents={ 'none' }>

            <path stroke='black' d={ _d } />
            <g>

                { initSteps.map((step, i) =>
                    <text key={ step.numb }
                        textAnchor="start" x={ 60 } y={ step.numb === 0 ? 30 : step.numb }
                        fontSize={ 32 } >{ step.numb }</text>
                ) }
            </g>
        </svg>
    )
}
const LineikaW: React.FC<{ _count: number }> = ({ _count }) => {

    const _d = [`m0 0`, ..._stepsH(_count), 'z'].join(" ")
    const initSteps = _stepsSize(_count).map(n => ({
        numb: n, t: <text textAnchor="start" x={ n === 0 ? 30 : n } y={ 120 } fontSize={ 32 } key={ n }>{ n }</text>
    })
    )
    const [steps, setSteps] = useState(initSteps)

    return (

        <svg viewBox={ `0 0 2000 100` } preserveAspectRatio='xMinYMin meet' x={ 0 } pointerEvents={ 'none' }>

            <path stroke='black' d={ _d } />
            <g>

                { initSteps.map((step, i) =>
                    <text key={ step.numb }
                        textAnchor="start" y={ 60 } x={ step.numb === 0 ? 30 : step.numb }
                        fontSize={ 32 } >{ step.numb }</text>
                ) }
            </g>
        </svg>
    )
}
const _stepsV = (count: number) => {
    let c = 1
    let res: string[] = []
    while (c <= count) {
        res.push([
            `h50 `,
            `h-50`,
            `v25`,
            `h20`,
            `h-20`,
            `v25`,
            `h20`,
            `h-20`,
            `v25`,
            `h20 `,
            `h-20`,
            `v25`,


        ].join(" ")
        )
        c++
    }

    return res
}
const _stepsH = (count: number) => {
    let c = 1
    let res: string[] = []
    while (c <= count) {
        res.push([
            `v50 `,
            `v-50`,
            `h100`,
            `v50`,
            `v-50`,
        ].join(" ")
        )
        c++
    }

    return res
}
const _stepsSize = (count: number) => {
    let c = 0
    let res: number[] = []
    while (c < count + 1) {
        res.push(100 * c)
        c++
    }

    return res
}
const NodeInfo = ({ node }: { node: _FrameNodeData }) => {
    const { id, coords: [{ ...s }, { ...e }], isShow, nsize, sides } = node;

    return (
        <Stack >
            <div >ID: { id }</div>
            <div>size: { nsize.width }x{ nsize.height }</div>
            <div>isShow: { isShow ? 'true' : 'false' }</div>
            <div>Coords: { s.x }, { s.y }, { e.x },{ e.y }</div>
            { TSidesArray.map(side => {
                return sides[side] !== 'rama' ? <div key={ side }>{ side }: { sides[side] }</div> : null
            }
            ) }
        </Stack>)
}

const NodeView = ({ node }: { node: _FrameNodeData }) => {
    const { coords, nsize, sides: sidesState } = node
    const wscale = 1
    const _c = {
        ox: 100,
        oy: 100,
    }
    const [s, e] = coords
    console.log('_c', _c)
    const l = _c.ox
    const path = [
        `m0 0`,
        `h${100}`,
        `v${100}`,
        `h-${100}`,
        `v-${100}`,
        `z`
    ].join(' ')
    return (

        <svg viewBox={ `0 0 ${100} ${100}` } x={ s.x } y={ s.y } width={ 100 } height={ 100 } >
            <g>

                { drawframe(path) }
            </g>
        </svg>
    )

}