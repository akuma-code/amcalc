import { FiAlertTriangle } from "react-icons/fi";
import { Avatar, Box, Button, ButtonGroup, Container, Divider, Paper, Stack } from '@mui/material'
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
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
import { _SizeF, _isArr, _p, _ss } from '../../../../Helpers/HelpersFns';

import { IconButton } from '../../../UI/IconButton';
import Icons from '../../../Icons/SvgIcons';
import { MasterFrame } from '../../../../Models/FrameComponent/FrameFactory/FrameCreator';
import { FrameNodeWithSides } from '../../../../Models/FrameComponent/FrameFactory/FrameNodeWithSides';
import { observer } from 'mobx-react-lite';
import { useQuery } from 'react-query';
import MemoFrameFFsvg from '../../../../Assets/FrameFFsvg';
import { Rulers } from './Rulers';
import { useFrameData } from "../../../../Hooks/useFrameData";
type FrameViewProps = {}




export const FrameView = observer((props: FrameViewProps) => {

    // const { id } = useLoaderData() as { id?: string }
    const { id } = useParams<{ id: string }>()
    const { NodeStore } = useStoresContext()


    const currentFrame = id ? NodeStore.getNode(id) : null
    const [nodes, setNodes] = useState(currentFrame?.nodes || [])
    const [selected, setSelected] = useState<FrameNodeWithSides | null>(null)

    const handleClickOnNode = (id: string) => {
        const currentNode = nodes.find(n => n._id === id)
        if (!currentNode) return
        setSelected(currentNode as unknown as FrameNodeWithSides)

    }
    const isSelected = (id: string) => id === selected?._id
    const resizeNode = (new_size: Partial<_SizeF>) => {
        if (!selected) return
        setNodes(prev => prev.map(n => isSelected(n._id) ? { ...n, nsize: { ...n.nsize, ...new_size } } : n))
        // setSelected(prev => ({ ...prev!, nsize: { ...prev!.nsize, ...new_size } }))
    }
    const resizeFrame = (id: string, new_size: _SizeF) => {
        if (!currentFrame) return
        NodeStore.edit(id, { size: new_size })
    }

    const ViewNodes = useMemo(() => {
        if (!currentFrame) return null
        const rects = nodes.map((n, i) => {
            const { coords, _id: id, } = n
            const [anc, e] = coords
            const { x, y } = anc
            const [_w, _h] = [Math.abs(x - e.x), Math.abs(y - e.y),]
            return <rect
                x={ i >= 1 ? x + 20 : x }
                y={ y }
                key={ id }
                width={ _w }
                height={ _h }
                fill={ isSelected(id) ? '#da6e6e' : '#5baac2' }
                stroke='black'
                onClick={ () => handleClickOnNode(id) }
            />
        }
        )


        const { width, height } = currentFrame.size
        const { x, y } = currentFrame.pos
        const vb = `0 0 ${width + x} ${height + y}`
        return <svg viewBox={ vb } preserveAspectRatio='xMinYMin meet' width={ width } height={ height }>{ rects }</svg>
    }, [selected?._id, nodes, currentFrame, handleClickOnNode])

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
                            <div key={ n._id } className={ isSelected(n._id) ? `bg-red-100` : `inherit` }>
                                <NodeInfo node={ n } />
                                <Divider flexItem variant='fullWidth' sx={ { border: '1px solid black' } }></Divider>
                            </div>
                        ) }

                </Stack>
                <Stack direction={ 'column' } component={ Paper } elevation={ 5 } flexGrow={ 1 }
                    sx={ { borderRight: '4px  hsl(231, 51%, 59%)', borderRightStyle: 'groove', borderLeft: '4px  hsl(231, 51%, 59%)' } }
                    p={ 2 } position={ 'relative' }
                >
                    <strong className='text-center'>Frame View</strong>
                    { selected &&
                        <ButtonGroup variant='contained' orientation='horizontal' sx={ {} }>

                            <Button variant='contained'
                                onClick={ () => { resizeFrame(currentFrame.id, _ss(currentFrame.size.width * 1.5, currentFrame.size.height)) } }
                                sx={ { border: '2px solid black', flexGrow: 0 } }


                            >
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
                    <FrameCanvas
                        height={ 500 }

                    //  _viewbox='0 0 100 100'

                    >

                        { drawframe(_DRAWPATH.f) }

                        { ViewNodes }
                        <Rulers c={ 20 } />

                    </FrameCanvas>
                </Stack>
            </Stack>
        </Container>

        :
        <Box
            component={ Paper }
            sx={ { bgcolor: '#c73f09', p: 4, mx: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, mt: 2 } }
        >
            <Avatar>
                <FiAlertTriangle size={ 38 } color="red" />
            </Avatar>
            <NavLink to={ pageRoutes.frames } >

                <strong >  Node with id: { id } not found! </strong>
                <ReplyIcon sx={ { fontSize: 42, bgcolor: 'red', borderRadius: '45%', color: '#fff', mx: 2 } } />
            </NavLink>
        </Box>
})

FrameView.displayName = `_____Frame View Page`

type FrameCanvasProps = {
    _viewbox?: string
    _scale?: number | string
} & Partial<_SizeF> & PropsWithChildren
const FrameCanvas: React.FC<FrameCanvasProps> = ({ width, height, children, _viewbox, _scale }) => {
    const _rate = typeof _scale === 'string' ? _scale : _scale?.toString()

    return (
        <Box width={ width || '100%' }
            height={ height || '100%' }
            bgcolor={ '#ddd' }
            // position={ 'relative' }
            overflow={ 'clip' }
            mt={ 2 }
        >
            <svg version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox={ _viewbox || '0 0 2000 2000' }
                transform={ `scale(${_rate || `1 1`})` }
                preserveAspectRatio='xMinYMin meet'

            >

                { children }
            </svg>
        </Box>
    )
};
const NodeInfo = ({ node }: { node: _FrameNodeData }) => {
    const { _id: id, coords: [{ ...s }, { ...e }], isShow, nsize, sides } = node;

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





