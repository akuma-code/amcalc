import React, { useEffect, useState, useMemo, PropsWithChildren } from 'react'
import { _Point, _SizeF } from '../../Helpers/HelpersFns'
import { SystemProfile } from '../../Components/Templates/Systems'
import { NodeFactory } from '../FrameFactory'
import { StateData } from '../WinFrameModel/Rama/ARama'
import { NodeBorders } from './NodeBorders'
import { Stv } from './Stv'
import { GlsRect } from './GlsRect'
import { DrawerService } from '../Drower/DrawerFns'

type FrameRamaProps = {
    size: _SizeF
    pos: _Point
} & PropsWithChildren

const BO = new NodeFactory(SystemProfile.Proline)
const ds = new DrawerService()
export const FrameContainer = (props: FrameRamaProps) => {

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

            <GlsRect
                posAnchor={ frameState.anchor }
                size={ frameState.size }
                clickHandler={ () => setshowStv(prev => ({ ...prev, s1: !prev.s1 })) }
                params={ { fill: 'lightblue' } }
            />

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
            { props.children }

        </svg>
    )
}

