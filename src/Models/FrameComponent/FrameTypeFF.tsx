import React, { useEffect, useState, useMemo, PropsWithChildren } from 'react'
import { _Point, _SizeF, _log, _p, _ss } from '../../Helpers/HelpersFns'
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



export const FrameTypeFF = (props: FrameRamaProps) => {
    const { size, pos: { x, y } } = props
    const { width: w, height: h } = size
    const [showStv, setshowStv] = useState({ s1: false, s2: false })
    const toogleShow = (stvId: keyof typeof showStv) => () => {
        setshowStv(prev => ({ ...prev, [stvId]: !prev[stvId] }))
    }
    const ramaBordersPath = useOffsetRama(size, props.pos)
    const no = {
        s1: {
            size: _ss(w / 2, h),
            pos: _p(x, y)
        },
        s2: {
            size: _ss(w / 2, h),
            pos: _p(x + w / 2, y)
        }
    }
    const s1 = BO.newPathCoordsMap(no.s1.size, no.s1.pos)
    const s2 = BO.newPathCoordsMap(no.s2.size, no.s2.pos)
    const r = BO.newPathCoordsMap(size, { x, y })
    const [frameS1, setS1] = useState<Pick<StateData, 'size' | 'anchor'>>({ size: no.s1.size, anchor: no.s1.pos })
    const [frameS2, setS2] = useState<Pick<StateData, 'size' | 'anchor'>>({ size: no.s2.size, anchor: no.s2.pos })


    const Paths = useMemo(() => {


        const BordersStv1 = s1.pathCoords
            .map(pc => ({ side: pc.side, path: ds.drawpathC(...pc.points) }))
        const BordersStv2 = s2.pathCoords
            .map(pc => ({ side: pc.side, path: ds.drawpathC(...pc.points) }))
        // const nodes = [
        //     { bpaths: Stv1, anchor: s1.anchor, size: s1.size, _id: 's1' },
        //     { bpaths: Stv2, anchor: s2.anchor, size: s2.size, _id: 's2' },
        // ]
        const rama = r.pathCoords
            .map(pc => ({ side: pc.side, path: ds.drawpathC(...pc.points) }))
        return { BordersStv1, BordersStv2 }
    }, [w, h, x, y])




    useEffect(() => {
        setS1(prev => ({ ...prev, bpaths: Paths.BordersStv1, anchor: s1.anchor, size: s1.size }))
        setS2(prev => ({ ...prev, bpaths: Paths.BordersStv2, anchor: s2.anchor, size: s2.size }))

    }, [w, h, x, y])


    return (

        <FrameRamaContainer
            width={ w }
            height={ h }
            pos={ _p(x, y) }
        >

            <GlsRect
                posAnchor={ { x: BO.offset.left, y: BO.offset.top } }
                size={ { width: w - BO.offset.left - BO.offset.right, height: h - BO.offset.top - BO.offset.bottom } }
                rectProps={ { fill: 'blue' } }
            />
            <GlsRect
                posAnchor={ frameS1.anchor }
                size={ frameS1.size }
                clickHandler={ toogleShow('s1') }
                rectProps={ { fill: 'lightblue' } }
            />
            <GlsRect
                posAnchor={ frameS2.anchor }
                size={ frameS2.size }
                clickHandler={ toogleShow('s2') }
                rectProps={ { fill: '#6d6dc9' } }
            />
            <NodeBorders bpaths={ ramaBordersPath } anchor={ { x, y } } size={ _ss(w, h) } />
            {/* { Conteiner.nodes.map(n => <NodeBorders { ...n } key={ n._id } />) } */ }
            {
                showStv.s1 &&

                <Stv
                    posOffset={ { ox: BO.offset.left / 2, oy: BO.offset.top / 2 } }
                    posAnchor={ frameS1.anchor }
                    size={ frameS1.size }
                    g_props={ { fill: 'whitesmoke', stroke: 'black' } }
                    overlap={ { side: 'right', o: 15 } }

                />
            }
            {
                showStv.s2 &&

                <Stv
                    posOffset={ { ox: 30, oy: 30 } }
                    posAnchor={ frameS2.anchor }
                    size={ frameS2.size }
                    g_props={ { fill: 'whitesmoke', stroke: 'black' } }
                    overlap={ { side: 'left', o: 15 } }
                />
            }
            { props.children }
            <path d={ `M${no.s2.pos.x} ${no.s2.pos.y} L${no.s2.pos.x} ${no.s2.pos.y + h} Z` } x={ no.s2.pos.x + w / 2 } y={ no.s2.pos.y } stroke='black' />
        </FrameRamaContainer>
        // </svg>
    )
}

