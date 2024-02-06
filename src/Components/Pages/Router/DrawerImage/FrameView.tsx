import { Box, Container, Divider, Paper, Stack } from '@mui/material'
import React, { PropsWithChildren, useState } from 'react'
import { NavLink, useLoaderData, useParams } from 'react-router-dom'
import { Text } from '../../../UI/Text'
import ReplyIcon from '@mui/icons-material/Reply';
import { pageRoutes } from '../../../../HTTP/PATHS';
import { useStoresContext } from '../../../../Hooks/useStoresContext';
import { _FrameNodeData, _FrameStateWithNodes } from '../DrawerPage';
import { drawframe } from '../../../../Models/Drower/DrawerFns';
import { _DRAWPATH } from '../../../../Models/Drower/DrawPaths';
type FrameViewProps = {}

export const FrameView = (props: FrameViewProps) => {

    // const { id } = useLoaderData() as { id?: string }
    const { id } = useParams<{ id: string }>()
    const { NodeStore } = useStoresContext()

    const currentNode = id ? NodeStore.getNode(id) : null
    const [nodes, setNodes] = useState(currentNode?.nodes)




    const NodeCanvas = ({ children }: PropsWithChildren) => <svg viewBox='0 0 100 100' width={ '15em' } height={ '15em' }>{ children }</svg>
    return currentNode ?
        <Container sx={ { bgcolor: '#faa1a16e', mt: 2 } } maxWidth='xl' >
            <Divider flexItem sx={ { display: 'flex', justifyContent: 'space-between', flexDirection: 'row' } }>
                <Text>Edit Frame View</Text>
                <NavLink to={ pageRoutes.frames } >
                    Back
                    <ReplyIcon />
                </NavLink></Divider>
            <Stack direction={ 'row' } columnGap={ 4 } mb={ 1 } mt={ 3 }>
                <Stack component={ Paper } elevation={ 5 }
                    direction={ 'column' }
                    flexGrow={ 0 }
                    sx={ { borderRight: '4px  hsl(231, 51%, 59%)', borderStyle: 'groove' } }
                    rowGap={ 1 }
                    p={ 2 }>
                    <strong className='text-center'>Frame Data</strong>
                    <div>FrameSize: { currentNode?.size.width }x{ currentNode?.size.height }</div>
                    <div>Frame Position: { currentNode?.pos.x }, { currentNode?.pos.y }</div>
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
                            <div key={ n.id } >
                                <NodeInfo node={ n } />
                                <Divider flexItem variant='fullWidth' sx={ { border: '1px solid black' } }></Divider>
                            </div>
                        ) }
                </Stack>
                <Stack direction={ 'column' } component={ Paper } elevation={ 5 } flexGrow={ 0 }
                    sx={ { borderRight: '4px  hsl(231, 51%, 59%)', borderStyle: 'groove', borderLeft: '4px  hsl(231, 51%, 59%)' } }
                    p={ 4 }
                >
                    {/* <NodeCanvas > */ }





                    {/* </NodeCanvas> */ }
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
}




const NodeInfo = ({ node }: { node: _FrameNodeData }) => {
    const { id, coords: [s, e], isShow, nsize, sidesState } = node;
    return (
        <Stack >
            <div >ID: { id }</div>
            <div>size: { nsize.width }x{ nsize.height }</div>
            <div>isShow: { isShow ? 'true' : 'false' }</div>
            <div>Coords: { s.x }, { s.y }, { e.x },{ e.y }</div>
        </Stack>)
}

const NodeView = ({ node }: { node: _FrameNodeData }) => {
    const { coords, nsize, sidesState } = node
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