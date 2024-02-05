import React, { useState, useMemo, useCallback, useEffect, useReducer, useLayoutEffect } from 'react';
import { DrawCanvas } from '../DrawCanvas';
import { _ID, _SizeF, _log, _p, _ss } from '../../../../Helpers/HelpersFns';
import { redirect, useActionData, useParams } from 'react-router-dom';
import { IFrameVariants } from '../../../../Interfaces/Enums';
import { Button, Container, Link } from '@mui/material';
import { _FrameStateWithNodes, nodeExtract } from '../DrawerPage';
import { ISideStateOffset, StvFrame } from '../../../../Models/FrameComponent/StvState';
import { FrameRamaContainer } from '../../../../Models/FrameComponent/FrameRamaContainer';
import FrameBordersBlock from '../../../../Models/FrameComponent/FrameBorderBox';
import { GlsRect } from '../../../../Models/FrameComponent/GlsRect';
import { Stvorka } from '../../../../Models/FrameComponent/Stvorka';
import { FrameContext, useFrameContext } from '../../../../Hooks/useFrameContext';
import { FrameContextMobx, NodeStore } from '../../../../Context/FrameContext/FrameContext';
import { useFetch } from '../../../../Hooks/useQueryFetcher';
import { pageRoutes } from '../../../../HTTP/PATHS';

interface DrawerImageProps {
}


export const DrawerImage: React.FC<DrawerImageProps> = (props) => {
    const params = useParams() as unknown as Promise<{ state: IFrameVariants }>
    const [nodesT, setNodesT] = useState<_FrameStateWithNodes | null>(null)
    const frameBlock = useMemo(() => {
        if (!nodesT) return null
        const { frame, stvs, imps } = nodeExtract(nodesT);
        return { frame, stvs, imps }

    }, [nodesT])




    useLayoutEffect(() => {
        // if (!data) return
        // setNodesT(state)



    }, [])

    return (
        <Container fixed sx={ { m: 2, border: '2px dotted red' } }>
            {
                !nodesT &&
                <div className="text-xl text-center">List of nodes is empty!</div>
            }
            { nodesT &&
                <ViewModelDraw
                    frame={ nodesT }
                />
            }

            {/* <DrawCanvas viewBoxSize={ _ss(2000, 2000) } canvasSize={ { w: '100%', h: '70vh' } }>

                {
                    frameBlock &&
                    <FrameRamaContainer startPos={ frameBlock.frame.pos } w={ frameBlock.frame.size.width } h={ frameBlock.frame.size.height }>
                        <FrameBordersBlock
                            size={ frameBlock.frame.size }
                            anchor={ frameBlock.frame.pos }
                        />
                        {
                            frameBlock.stvs.map(s =>
                                <GlsRect size={ s.size } posAnchor={ s.anchor } key={ s._id } rectProps={ { fill: '#ab7ac7' } } />
                            )
                        }
                        {
                            frameBlock.stvs.map(stv =>
                                <Stvorka
                                    stv={ stv }
                                    isShow={ true }
                                    key={ stv._id }
                                />

                            )
                        }
                    </FrameRamaContainer>
                }
            </DrawCanvas> */}


        </Container >
    )
};

export const ViewModelDraw = ({ frame }: { frame: _FrameStateWithNodes }) => {
    const [nodesT, setNodesT] = useState<_FrameStateWithNodes>(frame)
    const frameBlock = useMemo(() => {
        if (!nodesT) return null
        const { frame, stvs, imps } = nodeExtract(nodesT);
        return { frame, stvs, imps }

    }, [nodesT])

    useLayoutEffect(() => {
        frame && setNodesT(frame)
    }, [])

    return (
        <DrawCanvas viewBoxSize={ _ss(2000, 2000) } canvasSize={ { w: '100%', h: '70vh' } }>

            {
                frameBlock &&
                <FrameRamaContainer startPos={ frameBlock.frame.pos } w={ frameBlock.frame.size.width } h={ frameBlock.frame.size.height }>
                    <FrameBordersBlock
                        size={ frameBlock.frame.size }
                        anchor={ frameBlock.frame.pos }
                    />
                    {
                        frameBlock.stvs.map(s =>
                            <GlsRect size={ s.size } posAnchor={ s.anchor } key={ s._id } rectProps={ { fill: '#ab7ac7' } } />
                        )
                    }
                    {
                        frameBlock.stvs.map(stv =>
                            <Stvorka
                                stv={ stv }
                                isShow={ true }
                                key={ stv._id }
                            />

                        )
                    }
                </FrameRamaContainer>
            }
        </DrawCanvas>
    )

}

interface IFA_Load {
    type: 'load'
    payload: _FrameStateWithNodes
}




const initstate: _FrameStateWithNodes = {
    id: _ID(),
    type: 'f',
    size: { width: 350, height: 800 },
    pos: { x: 0, y: 0 },
    nodes: [
        {
            id: "s1",
            coords: [
                { "x": 0, y: 0 },
                { "x": 350, y: 800 }
            ],
            sidesState: {
                bottom: "rama",
                left: "rama",
                right: "rama",
                top: "rama"
            },
            nsize: {
                width: 350,
                height: 800
            },
            isShow: false,

        }
    ]
}
const initializer = (size: _SizeF, pos = { x: 0, y: 0 }): _FrameStateWithNodes => {
    const { width, height } = size
    const { x, y } = pos
    const state = ({ width, height }: _SizeF, { x = 0, y = 0 }) => ({
        id: _ID(),
        type: 'f',
        size: { width, height },
        pos: { x, y },
        nodes: [
            {
                id: "s1",
                coords: [
                    { x, y },
                    _p(x + width, y + height)
                ],
                sidesState: {
                    bottom: "rama",
                    left: "rama",
                    right: "rama",
                    top: "rama"
                },
                nsize: {
                    width,
                    height
                },
                isShow: false,

            }
        ]
    }) satisfies _FrameStateWithNodes
    return state(size, pos)
}
interface IFA_setNext {
    type: 'setNext',
    payload: { next: ISideStateOffset, id: string }
}

interface IFA_setId {
    type: 'setId',
    payload: { new_id: string }
}

type _FrameActions =
    | IFA_Load
    | IFA_setNext


function frameReducer(state: _FrameStateWithNodes, action: _FrameActions): _FrameStateWithNodes {

    switch (action.type) {
        case 'load': {
            const frame = action.payload
            return { ...state, ...frame }
        }

        case 'setNext': {
            const { next, id } = action.payload
            if (!state) return initstate
            let n = state.nodes
            n = [...n.map(node => node.id === id ? { ...node, sidesState: { ...node.sidesState!, ...next } } : node)]

            return {
                ...state,
                nodes: n
            }


        }
        default: return state
    }



}