import { Button, Divider, Stack } from '@mui/material';
import { useState } from 'react';
import { Outlet, useSubmit } from 'react-router-dom';
import { _ID, _Point, _SizeF, _getcoords, _p, _ss } from '../../../Helpers/HelpersFns';
import { IFrameVariants } from '../../../Interfaces/Enums';

import { _TSideBaseState } from '../../Templates/Systems';
import { CreatePopup } from './CreatePopup';
import { StvFrame, _TCoords } from '../../../Models/FrameComponent/StvState';
import { FrameContext } from '../../../Hooks/useFrameContext';
import { FrameContextMobx, NodeStore } from '../../../Context/FrameContext/FrameContext';
import { ImpostFrame } from '../../../Models/FrameComponent/ImpostFrame';
import { useStoresContext } from '../../../Hooks/useStoresContext';
import { ActionFrame, MasterFrame } from '../../../Models/FrameComponent/FrameFactory/FrameCreator';
import { FrameNodeWithSides } from "../../../Models/FrameComponent/FrameFactory/FrameNodeWithSides";
import { observer } from 'mobx-react-lite';
import { pageRoutes } from '../../../HTTP/PATHS';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';




export type FrameMainProps = _SizeF & _Point & { type: IFrameVariants }

export interface _FrameNodeData {
    _id: string;
    nsize: _SizeF;
    coords: _TCoords;
    isShow: boolean
    sides: _TSideBaseState
}
export interface _FrameStateWithNodes {
    id: string
    type: IFrameVariants
    size: _SizeF
    pos: _Point
    nodes: _FrameNodeData[]
}

export const DrawerPage = observer(() => {
    const submit = useSubmit()
    const { NodeStore } = useStoresContext()
    // const [frame, setFrame] = useState<_FrameStateWithNodes | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const fc = new MasterFrame()

    const createHandler = (data: FrameMainProps) => {
        // if (frame) setFrame(null)

        const createNodes = nodeGenerator(data.type)

        const dataSize = _ss(data.width, data.height)
        const dataPos = _p(data.x, data.y)
        fc.create(dataSize, dataPos)
            .setType(data.type)
            .setNodes()

        fc.isready() && NodeStore.add(fc.frame as _FrameStateWithNodes)
        submit(JSON.stringify(fc.frame), {
            method: 'post',
            action: pageRoutes.frames,
            encType: 'application/json'
        })
        // const _nodes = createNodes(dataSize, dataPos)

        // setFrame(prev => ({ ...prev, nodes: _nodes, type: data.type, size: dataSize, pos: { x: data.x, y: data.y }, id: _ID() }))
        // .setNodes()
        // NodeStore.add(frame)
        // const af = new ActionFrame(fc)
        // console.log('fc', fc.frame)
    }
    const deleteHandler = () => {
        NodeStore.clear()
    }
    // if (!frame) return <div>No frame</div>
    return (

        <Stack useFlexGap direction={ 'column' }>
            <Stack useFlexGap direction={ 'row' } flexGrow={ 1 }>

                <Stack direction={ 'row' } useFlexGap gap={ 4 } mx={ 4 } mt={ 2 } justifyContent={ 'space-around' } width={ '100%' }>
                    <CreatePopup isOpen={ isOpen }
                        toggleOpen={ () => { setIsOpen(prev => !prev) } }
                        onCreate={ createHandler }
                    />
                    <Button variant='contained' color='secondary'
                        onClick={ deleteHandler }
                        disabled={ NodeStore.nodes.length === 0 }
                    >
                        Clear Store <DeleteOutlinedIcon color='warning' sx={ { ml: 1 } } />
                    </Button>
                </Stack>
            </Stack>
            {/* <Divider >
                <h3 className='text-center text-4xl'>DrawerPage</h3>

            </Divider> */}
            <Outlet />
        </Stack>
        // </FrameContext.Provider>
    )
})

DrawerPage.displayName = '*** DrapwePage ___'


export function nodeGenerator(type: IFrameVariants) {
    function typesize(_type: IFrameVariants) {

        const _defaultSS = {
            bottom: "rama" as const,
            left: "rama" as const,
            right: "rama" as const,
            top: "rama" as const
        }
        const f = (frame_size: _SizeF, pos = _p(0, 0)): _FrameStateWithNodes['nodes'] => {
            const n1 = {
                nsize: frame_size,
                coords: _getcoords(frame_size, pos),
                _id: 's1',
                sides: _defaultSS,
                isShow: false
            }
            return [n1]
        }
        const ff = (frame_size: _SizeF, pos = _p(0, 0)): _FrameStateWithNodes['nodes'] => {
            const nodeW = frame_size.width / 2
            const pos2 = _p(pos.x + nodeW, pos.y)
            const s = _ss(nodeW, frame_size.height)
            const n1: _FrameStateWithNodes['nodes'][number] = {
                _id: 's1',
                nsize: s,
                coords: _getcoords(s, pos),
                sides: { ..._defaultSS, right: 'imp' as const },
                isShow: false
            }
            const n2: _FrameStateWithNodes['nodes'][number] = {
                _id: 's2',
                nsize: s,
                coords: _getcoords(s, pos2),
                sides: { ..._defaultSS, left: 'imp' as const },
                isShow: false
            }
            const nodes = [n1, n2]
            return nodes
        }
        const fff = (frame_size: _SizeF, pos = _p(0, 0)): _FrameStateWithNodes['nodes'] => {
            const nodeW = frame_size.width / 3
            const pos2 = _p(pos.x + nodeW, pos.y)
            const pos3 = _p(pos.x + pos2.x, pos.y)
            const s = _ss(nodeW, frame_size.height)
            const n1: _FrameStateWithNodes['nodes'][number] = {
                _id: 's1',
                nsize: s,
                coords: _getcoords(s, pos),
                sides: { ..._defaultSS, right: 'imp' as const },
                isShow: false

            }
            const n2: _FrameStateWithNodes['nodes'][number] = {
                _id: 's2',
                nsize: s,
                coords: _getcoords(s, pos2),
                sides: { ..._defaultSS, right: 'imp' as const, left: 'imp' as const },
                isShow: false

            }
            const n3: _FrameStateWithNodes['nodes'][number] = {
                _id: 's3',
                nsize: s,
                coords: _getcoords(s, pos3),
                sides: { ..._defaultSS, left: 'imp' as const },
                isShow: false

            }
            const nodes = [n1, n2, n3]
            return nodes
        }
        const result = { f, ff, fff }
        const r = result[_type]
        return r
    }


    return typesize(type)
}

export function nodeExtract(frame: _FrameStateWithNodes) {

    const { nodes, pos, size, type } = frame
    const stvs: StvFrame[] = nodes.map(node => {
        const { _id: id, sides: sidesState } = node
        const stvFrame = new StvFrame([...node.coords])
            .setId(id)
            .setNext(sidesState)
        return stvFrame
    })
    const imps: ImpostFrame[] = []
    let returnData = {
        frame: { size, pos, type },
        stvs: stvs,
        imps: imps


    }
    return returnData

}

