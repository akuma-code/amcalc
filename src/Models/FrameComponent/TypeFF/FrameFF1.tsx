import React, { useEffect, useMemo, useState } from 'react'
import { _ID, _Point, _SizeF, _TPoint, _log, _p, _ss } from '../../../Helpers/HelpersFns'
import { TSide } from '../../../Interfaces/Enums'
import FrameBordersBlock from '../FrameBorderBox'
import { FrameRamaContainer } from '../FrameRamaContainer'
import { GlsRect } from '../GlsRect'
import { StvFrame, _CType } from '../StvState'
import { ImpostFrame } from "../ImpostFrame"
import { Stvorka } from '../Stvorka'
import { ImpostVertical } from '../ImpostVertical'
import { FrameContext, useFrameContext } from '../../../Hooks/useFrameContext'
import { observer } from 'mobx-react-lite'
import { _TCoords } from '../../FrameComponent/StvState'
import { _TNode } from '../../../Context/FrameContext/FrameContext'
import { createNode, useNodes } from '../../../Hooks/useNodes'
import { getSizeFromCoords } from '../../Drower/DrawerFns'

type FrameRamaProps = {
    frame_size: _SizeF
    pos: _Point
}

const LS = new StvFrame()
const RS = new StvFrame()
const IM = (coords: _TCoords) => new ImpostFrame([...coords])

const FrameFF1: React.FC<FrameRamaProps> = observer(({ frame_size, pos }) => {
    const { FrameCtx } = useFrameContext();
    const { width: w, height: h } = frame_size
    const [show, setShow] = useState({ s1: false, s2: false })
    const [nodes, nd] = useNodes()
    const _initAnchor = {
        frameStart: pos,
        frameEnd: _p(pos.x + frame_size.width, pos.y + frame_size.height),
        impStart: _p(pos.x + w / 2, pos.y),
        impEnd: _p(pos.x + w / 2, pos.y + h)

    }
    const [anchor, setAnchor] = useState(_initAnchor)




    const [impost, setImpost] = useState({ coords: [anchor.impStart, anchor.impEnd] as [_Point, _Point], id: _ID() })

    const n = createNode('s1', [anchor.frameStart, anchor.impEnd], { right: 'imp' })
    const n1 = createNode('s2', [anchor.impStart, anchor.frameEnd], { left: 'imp' })
    nd.add(n)
    nd.add(n1)

    const left = useMemo(() => {
        const s = LS.setBorderCoords([anchor.frameStart, anchor.impEnd])
            .setId(_ID())
            .setNext({ right: 'imp' })

        nd.edit('s1', {
            coords: [anchor.frameStart, anchor.impEnd],
            size: getSizeFromCoords(anchor.frameStart, anchor.impEnd)
        })

        return s.watch([anchor.frameStart, anchor.impEnd])

    }, [
        anchor.frameStart.x, anchor.frameStart.y,
        anchor.impEnd.x, anchor.impEnd.y
    ])

    const right = useMemo(() => {
        const r = RS
        r.setBorderCoords([anchor.impStart, anchor.frameEnd])
            .setId('s2')
            .setNext({ left: 'imp' })

        nd.edit('s2', {
            coords: [anchor.impStart, anchor.frameEnd],
            size: getSizeFromCoords(anchor.impStart, anchor.frameEnd)
        })

        return r.watch([anchor.impStart, anchor.frameEnd])

    }, [anchor.frameEnd.x, anchor.frameEnd.y, anchor.impStart.x, anchor.impStart.y])

    const Impst = useMemo(() => {
        const i = IM([anchor.impStart, anchor.impEnd])
        return i.watch([anchor.impStart, anchor.impEnd])

    }, [anchor.impEnd.x, anchor.impStart.x, anchor.impEnd.y, anchor.impStart.y])



    const toggleShow = (stv_id: string) => () => {
        FrameCtx.toggleStv(stv_id)

        setShow(prev => ({ ...prev, [stv_id]: !prev[stv_id as keyof typeof prev] }))
    }

    const selectItem = (id: string) => {
        FrameCtx.selectItem({ id })
    }


    useEffect(() => {
        FrameCtx && FrameCtx.resizeRama(frame_size)
        setAnchor(prev => ({
            ...prev,
            frameStart: pos,
            frameEnd: _p(pos.x + frame_size.width, pos.y + frame_size.height),
            impStart: _p(pos.x + frame_size.width / 2, pos.y),
            impEnd: _p(pos.x + frame_size.width / 2, pos.y + frame_size.height)
        }))
        setImpost(prev => ({
            ...prev,
            coords: [_p(pos.x + frame_size.width / 2, pos.y), _p(pos.x + frame_size.width / 2, pos.y + frame_size.height)] as [_Point, _Point]
        }))

        // return () => setNodes([])
    }, [pos.x, pos.y, frame_size.width, frame_size.height])
    return (

        <FrameRamaContainer
            pos={ pos }
            width={ w }
            height={ h }
        >
            { /*  //*Glasses **/ }
            {
                nodes.map(n =>
                    <GlsRect size={ n.size! }
                        posAnchor={ n?.coords![0] }
                        rectProps={ { fill: 'lightblue', fillOpacity: .5 } }
                        clickHandler={ toggleShow(n.id) }
                        key={ n.id }
                    />
                ) }
            { /*  //*Impost **/ }
            <ImpostVertical coords={ impost.coords } impFrame={ Impst } />
            { /*  //*RamaBorders **/ }
            <FrameBordersBlock
                size={ frame_size }
                anchor={ pos }

            />
            { /*  //*Stvorki **/ }
            <Stvorka
                isShow={ show.s1 }
                stv={ left }
            />
            <Stvorka
                isShow={ show.s2 }
                stv={ right }
            />




        </FrameRamaContainer>

    )
})
FrameFF1.displayName = '***Frame Type FF'
export default FrameFF1


