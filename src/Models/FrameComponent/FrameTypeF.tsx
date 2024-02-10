import React, { useEffect, useState, useMemo, PropsWithChildren } from 'react'
import { _Point, _SizeF, _log, _p } from '../../Helpers/HelpersFns'
import { SystemProfile } from '../../Components/Templates/Systems'
import { NodeFactory } from '../FrameFactory'
import { StateData } from '../WinFrameModel/Rama/ARama'
import { NodeBorders } from './NodeBorders'
import { Stv } from './Stv'
import { GlsRect } from './GlsRect'
import { DrawerService } from '../Drower/DrawerFns'
import { FrameRamaContainer } from './FrameRamaContainer'
import { useOffsetRama } from '../../Hooks/useOffset'

type FrameRamaProps = {
    size: _SizeF
    pos: _Point
} & PropsWithChildren

const BO = new NodeFactory(SystemProfile.Proline)
const ds = new DrawerService()
export const FrameTypeF = (props: FrameRamaProps) => {

    const [showStv, setshowStv] = useState({ s1: false })
    const { size, pos: { x, y } } = props
    const { width: w, height: h } = size
    const [frameState, setFrameState] = useState<Pick<StateData, 'size' | 'anchor'>>({ size, anchor: { x, y } })
    const rama = useOffsetRama(size, _p(x, y))

    const Node = useMemo(() => {
        const extRama = BO.newPathCoordsMap(size, props.pos)
        const bpaths = extRama.pathCoords
            .map(pc => ({ side: pc.side, path: ds.drawpathC(...pc.points) }))


        return { bpaths, anchor: extRama.anchor, size: extRama.size }
    }, [props.pos, size])

    _log(rama)

    useEffect(() => {

        setFrameState(prev => ({ ...prev, ...Node }))

    }, [Node])


    return (
        <FrameRamaContainer
            pos={ _p(x, y) }
            width={ w }
            height={ h }
        >

            <GlsRect
                posAnchor={ frameState.anchor }
                size={ frameState.size }
                clickHandler={ () => setshowStv(prev => ({ ...prev, s1: !prev.s1 })) }
                rectProps={ { fill: 'lightblue' } }
            />

            <NodeBorders { ...Node } />
            {
                showStv.s1 &&

                <Stv
                    posOffset={ { ox: 60, oy: 60 } }
                    posAnchor={ frameState.anchor }
                    size={ frameState.size }
                    g_props={ { fill: 'whitesmoke', stroke: 'black' } }
                />
            }
            { props.children }

        </FrameRamaContainer>

    )
}

