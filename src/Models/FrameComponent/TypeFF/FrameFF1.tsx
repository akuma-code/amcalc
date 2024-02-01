import React, { useEffect, useMemo, useState } from 'react'
import { _ID, _Point, _SizeF, _log, _p, _ss } from '../../../Helpers/HelpersFns'
import { TSide } from '../../../Interfaces/Enums'
import FrameBordersBlock from '../FrameBorderBox'
import { FrameRamaContainer } from '../FrameRamaContainer'
import { GlsRect } from '../GlsRect'
import { ImpostFrame, StvFrame, _CType } from '../StvState'
import { Stvorka } from '../Stvorka'
import { ImpostVertical } from '../ImpostVertical'
import { FrameContext, useFrameContext } from '../../../Hooks/useFrameContext'
import { observer } from 'mobx-react-lite'
import { _TCoords } from '../../../Interfaces/FrameState'

type FrameRamaProps = {
    size: _SizeF
    pos: _Point
}
const FrameFF1: React.FC<FrameRamaProps> = observer(({ size, pos }) => {
    const { FrameCtx } = useFrameContext();

    const { width: w, height: h } = size
    const [show, setShow] = useState({ s1: false, s2: false })
    const _initAnchor = {
        frameStart: pos,
        frameEnd: _p(pos.x + size.width, pos.y + size.height),
        impStart: _p(pos.x + w / 2, pos.y),
        impEnd: _p(pos.x + w / 2, pos.y + h)

    }
    const [anchor, setAnchor] = useState(_initAnchor)

    const [impost, setImpost] = useState({ coords: [anchor.impStart, anchor.impEnd] as [_Point, _Point], id: _ID() })
    const LS = new StvFrame('s1', [anchor.frameStart, anchor.impEnd], { right: 'impost' })
    const RS = new StvFrame('s2', [anchor.impStart, anchor.frameEnd], { left: 'impost' })
    const IM = new ImpostFrame([anchor.impStart, anchor.impEnd])


    const left = useMemo(() => LS.watch([anchor.frameStart, anchor.impEnd]),
        [anchor.frameStart, anchor.impEnd])
    const right = useMemo(() => RS.watch([anchor.impStart, anchor.frameEnd]),
        [anchor.frameEnd, anchor.impStart])
    const Impst = useMemo(() => IM.watch([anchor.impStart, anchor.impEnd]),
        [anchor.impEnd, anchor.impStart])



    const toggleShow = (stv_id: string) => () => {
        FrameCtx.toggleStv(stv_id)

        setShow(prev => ({ ...prev, [stv_id]: !prev[stv_id as keyof typeof prev] }))
    }

    const selectItem = (id: string) => {
        FrameCtx.selectItem({ id })
    }
    useEffect(() => {
        FrameCtx && FrameCtx.resizeRama(size)
        setAnchor(prev => ({
            ...prev,
            frameStart: pos,
            frameEnd: _p(pos.x + size.width, pos.y + size.height),
            impStart: _p(pos.x + size.width / 2, pos.y),
            impEnd: _p(pos.x + size.width / 2, pos.y + size.height)
        }))
        setImpost(prev => ({
            ...prev,
            coords: [_p(pos.x + size.width / 2, pos.y), _p(pos.x + size.width / 2, pos.y + size.height)] as [_Point, _Point]
        }))
    }, [pos, size])
    return (

        <FrameRamaContainer
            startPos={ pos }
            w={ w }
            h={ h }
        >
            { /*  //*Glasses **/ }
            <GlsRect
                size={ _ss(size.width / 2, size.height) }
                posAnchor={ pos }
                rectProps={ { fill: 'lightblue', fillOpacity: .5 } }
                clickHandler={ toggleShow('s1') }
            />
            <GlsRect
                size={ _ss(size.width / 2, size.height) }
                posAnchor={ anchor.impStart }
                rectProps={ { fill: 'lightblue', fillOpacity: .7 } }
                clickHandler={ toggleShow('s2') }
            />
            { /*  //*Impost **/ }
            <ImpostVertical coords={ impost.coords } impFrame={ Impst } />
            { /*  //*RamaBorders **/ }
            <FrameBordersBlock
                size={ size }
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


