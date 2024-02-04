import { Button, Divider, Stack } from '@mui/material';
import { useState } from 'react';
import { Outlet, useSubmit } from 'react-router-dom';
import { _Point, _SizeF, _p, _ss } from '../../../Helpers/HelpersFns';
import { IFrameVariants } from '../../../Interfaces/Enums';
import { _TCoords } from '../../../Interfaces/FrameState';
import { _TSideBaseState } from '../../Templates/Systems';
import { CreatePopup } from './CreatePopup';
import { StvFrame } from '../../../Models/FrameComponent/StvState';
import { FrameContext } from '../../../Hooks/useFrameContext';
import { FrameContextMobx, NodeStore } from '../../../Context/FrameContext/FrameContext';
export type FrameMainProps = _SizeF & _Point & { type: IFrameVariants }

interface _INodeFrameData<T extends IFrameVariants> {
    type: T
    nodes: {
        id: string;
        size: _SizeF;
        coords: _Point[];
        sidesState?: _TSideBaseState
    }[]

}
export interface _NodesT {
    type: IFrameVariants
    size: _SizeF
    pos: _Point
    nodes: {
        id: string;
        nsize: _SizeF;
        coords: _TCoords;
        isShow: boolean
        sidesState: Required<_TSideBaseState>
    }[]
}
export type _TNode_F = _INodeFrameData<'f'>
export type _TNode_FF = _INodeFrameData<'ff'>

export type _TNodeTypes = _TNode_F | _TNode_FF
const DrawerPage = () => {
    const submit = useSubmit()
    const [frame, setFrame] = useState<_NodesT | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const createHandler = (data: FrameMainProps) => {
        // if (frame) setFrame(null)

        const nodeCreator = nodeGenerator(data.type)

        const dataSize = _ss(data.width, data.height)
        const dataPos = _p(data.x, data.y)
        const _nodes = nodeCreator(dataSize, dataPos)
        setFrame({ nodes: _nodes, type: data.type, size: dataSize, pos: { x: data.x, y: data.y } })
        submit(JSON.stringify(frame), {
            method: 'post',
            action: '/drawer/' + data.type,
            encType: 'application/json'
        })

    }
    const deleteHandler = () => {
        setFrame(prev => null)
    }
    // if (!frame) return <div>No frame</div>
    return (
        // <FrameContext.Provider
        //     value={{
        //         FrameCtx: new FrameContextMobx(frame!.size, frame!.pos),
        //         NodeStore: new NodeStore()
        //     }}
        // >


        <Stack useFlexGap direction={'column'}>
            <Divider >
                <h3 className='text-center text-4xl'>DrawerPage</h3>

            </Divider>

            <Stack direction={'row'} useFlexGap gap={4} mx={4}>
                <CreatePopup isOpen={isOpen}
                    toggleOpen={() => { setIsOpen(prev => !prev) }}
                    onCreate={createHandler}
                />
                <Button variant='contained' color='warning'
                    onClick={deleteHandler}
                    disabled={frame === null}
                >
                    Delete Frame
                </Button>

            </Stack>
            <Outlet />
        </Stack>
        // </FrameContext.Provider>
    )
}

export default DrawerPage

export const _getcoords = (size: _SizeF, pos: _Point): _TCoords => [pos, _p(pos.x + size.width, pos.y + size.height)]
export function nodeGenerator(type: IFrameVariants) {
    function typesize(_type: IFrameVariants) {

        const _defaultSS = {
            bottom: "rama" as const,
            left: "rama" as const,
            right: "rama" as const,
            top: "rama" as const
        }
        const f = (frame_size: _SizeF, pos = _p(0, 0)): _NodesT['nodes'] => {
            const n1 = {
                nsize: frame_size,
                coords: _getcoords(frame_size, pos),
                id: 's1',
                sidesState: _defaultSS,
                isShow: false
            }
            return [n1]
        }
        const ff = (frame_size: _SizeF, pos = _p(0, 0)): _NodesT['nodes'] => {
            const nodeW = frame_size.width / 2
            const pos2 = _p(pos.x + nodeW, pos.y)
            const s = _ss(nodeW, frame_size.height)
            const n1: _NodesT['nodes'][number] = {
                id: 's1',
                nsize: s,
                coords: _getcoords(s, pos),
                sidesState: { ..._defaultSS, right: 'imp' as const },
                isShow: false
            }
            const n2: _NodesT['nodes'][number] = {
                id: 's2',
                nsize: s,
                coords: _getcoords(s, pos2),
                sidesState: { ..._defaultSS, left: 'imp' as const },
                isShow: false
            }
            const nodes = [n1, n2]
            return nodes
        }
        const fff = (frame_size: _SizeF, pos = _p(0, 0)): _NodesT['nodes'] => {
            const nodeW = frame_size.width / 3
            const pos2 = _p(pos.x + nodeW, pos.y)
            const pos3 = _p(pos.x + pos2.x, pos.y)
            const s = _ss(nodeW, frame_size.height)
            const n1: _NodesT['nodes'][number] = {
                id: 's1',
                nsize: s,
                coords: _getcoords(s, pos),
                sidesState: { ..._defaultSS, right: 'imp' as const },
                isShow: false

            }
            const n2: _NodesT['nodes'][number] = {
                id: 's2',
                nsize: s,
                coords: _getcoords(s, pos2),
                sidesState: { ..._defaultSS, right: 'imp' as const, left: 'imp' as const },
                isShow: false

            }
            const n3: _NodesT['nodes'][number] = {
                id: 's3',
                nsize: s,
                coords: _getcoords(s, pos3),
                sidesState: { ..._defaultSS, left: 'imp' as const },
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

export function nodeExtract(frame: _NodesT) {

    const { nodes, pos, size, type } = frame
    const stvs = nodes.map(node => {
        const { id, sidesState } = node
        const stvFrame = new StvFrame([...node.coords])
            .setId(id)
            .setNext(sidesState)
        return stvFrame
    }

    )

    let returnData = {
        frame: { size, pos, type },
        stvs: stvs,


    }
    return returnData

}

