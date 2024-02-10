import { Container } from '@mui/material';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { _ss } from '../../../../Helpers/HelpersFns';
import { IFrameVariants } from '../../../../Interfaces/Enums';
import FrameBordersBlock from '../../../../Models/FrameComponent/FrameBorderBox';
import { FrameRamaContainer } from '../../../../Models/FrameComponent/FrameRamaContainer';
import { GlsRect } from '../../../../Models/FrameComponent/GlsRect';
import { Stvorka } from '../../../../Models/FrameComponent/Stvorka';
import { DrawCanvas } from '../DrawCanvas';
import { _FrameStateWithNodes, nodeExtract } from '../DrawerPage';

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


        </Container >
    )
};

