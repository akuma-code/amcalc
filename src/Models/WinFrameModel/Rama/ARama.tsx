import { useEffect, useMemo, useState } from 'react'
import { OFFSET, SystemProfile } from '../../../Components/Templates/Systems'
import { _ID, _Point, _SizeF, _TPoint } from '../../../Helpers/HelpersFns'
import { NodeFactory } from '../../FrameFactory'
import { joinCoordsMatrix } from '../AnchorModel'
import { DrawerService } from '../../Drower/DrawerFns'
import { _TCoords } from '../../../Interfaces/FrameState'
import { GlsRect } from '../../FrameComponent/GlsRect'
import { Stv } from '../../FrameComponent/Stv'
import { NodeBorders } from '../../FrameComponent/NodeBorders'

type FrameRamaProps = {
    size: _SizeF
    pos: _Point
}
export const ds = new DrawerService()
const _MockSystemStore = SystemProfile.Proline
export type StateData = {
    corners: _TCoords;
    anchor: _Point;
    size: _SizeF;
    pathPoints: {
        side: string;
        coords: _Point[];
    }[]
    pathCoords: {
        side: string;
        path: [_TPoint, _TPoint][];
        points: [_Point, _Point]
        dataSide: {
            outerborder: number[][];
            innerborder: number[][];
        };
    }[];
}

//________FrameRama
export const BO = new NodeFactory(_MockSystemStore)
export const FrameRamaA: React.FC<FrameRamaProps> = (props) => {
    const [showStv, setshowStv] = useState({ s1: false })
    const { size, pos: { x, y } } = props
    const { width: w, height: h } = size
    const [frameState, setFrameState] = useState<Pick<StateData, 'size' | 'anchor'>>({ size, anchor: { x, y } })


    const Node = useMemo(() => {
        const extRama = BO.newNodeData(size, props.pos)
        const bpaths = extRama.pathCoords
            .map(pc => ({ side: pc.side, path: ds.drawpathC(...pc.points) }))


        return { bpaths, anchor: extRama.anchor, size: extRama.size }
    }, [props.pos, size])



    useEffect(() => {

        setFrameState(prev => ({ ...prev, ...Node }))

    }, [Node])

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox={ `0 0 ${x + w} ${y + h}` }
            width={ x + w }
            height={ y + h }>
            <g fill='lightblue' onClick={ () => setshowStv(prev => ({ ...prev, s1: !prev.s1 })) }>
                <GlsRect posAnchor={ frameState.anchor } size={ frameState.size } />
            </g>

            <NodeBorders { ...Node } />
            {
                showStv.s1 &&
                <Stv
                    posOffset={ { ox: 60, oy: 60 } }
                    posAnchor={ frameState.anchor }
                    size={ frameState.size }
                    params={ { fill: 'whitesmoke', stroke: 'black' } }
                />
            }
        </svg>
    )
}

