import React, { useState, useMemo, useCallback, useEffect, useReducer } from 'react';
import { DrawCanvas } from '../DrawCanvas';
import { _ss } from '../../../../Helpers/HelpersFns';
import { redirect, useActionData, useParams } from 'react-router-dom';
import { IFrameVariants } from '../../../../Interfaces/Enums';
import { Button, Container, Link } from '@mui/material';
import { _NodesT, nodeExtract } from '../DrawerPage';
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

const initstate: _NodesT = {
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
                right: "imp",
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

export const DrawerImage: React.FC<DrawerImageProps> = (props) => {
    const params = useParams() as { state: IFrameVariants }
    // const { data, isLoading } = useFetch(`${pageRoutes.drawer}/${params.state}`)
    // const data = useActionData() as Promise<_NodesT>
    const [nodesT, setNodesT] = useState<_NodesT | null>(null)
    const [state, dispatch] = useReducer<typeof frameReducer>(frameReducer, initstate)

    const frameBlock = useMemo(() => {
        if (!nodesT) return null
        const { frame, stvs } = nodeExtract(nodesT);
        return { frame, stvs }

    }, [nodesT])




    useEffect(() => {
        // if (!data) return


        // console.log('state', nodesT)

    }, [])

    return (
        <Container fixed sx={{ m: 2, border: '2px dotted red' }}>
            {
                !nodesT &&
                <div className="text-xl text-center">List of nodes is empty!</div>
            }

            <FrameContext.Provider
                value={{
                    FrameCtx: new FrameContextMobx(state.size),
                    NodeStore: new NodeStore()

                }}
            >


                <DrawCanvas viewBoxSize={_ss(2000, 2000)} canvasSize={{ w: '100%', h: '70vh' }}>

                    {
                        frameBlock &&
                        <FrameRamaContainer startPos={frameBlock.frame.pos} w={frameBlock.frame.size.width} h={frameBlock.frame.size.height}>
                            <FrameBordersBlock
                                size={frameBlock.frame.size}
                                anchor={frameBlock.frame.pos}
                            />
                            {frameBlock.stvs.map(stv =>
                                <>
                                    <GlsRect size={stv.size} posAnchor={stv.anchor} />
                                    <Stvorka
                                        stv={stv}
                                        isShow={true}
                                    />
                                </>
                            )}
                        </FrameRamaContainer>
                    }
                </DrawCanvas>
            </FrameContext.Provider>

        </Container >
    )
};

export const ViewModelDraw = (frame: _NodesT) => {





}

interface IFA_Load {
    type: 'load'
    payload: _NodesT
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


function frameReducer(state: _NodesT, action: _FrameActions): _NodesT {

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