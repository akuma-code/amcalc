import React, { useEffect, useMemo, useState } from 'react'
import { _Point, _SizeF, _p, _ss } from '../../../Helpers/HelpersFns'
import { TSide } from '../../../Interfaces/Enums'
import FrameBordersBlock from '../FrameBorderBox'
import { FrameRamaContainer } from '../FrameRamaContainer'
import { GlsRect } from '../GlsRect'
import { StvFrame, _CType } from '../StvState'
import { Stvorka } from '../Stvorka'
import { ImpostVertical } from '../ImpostVertical'

type FrameRamaProps = {
    size: _SizeF
    pos: _Point
}

const FrameFF1: React.FC<FrameRamaProps> = ({ size, pos }) => {
    const { width: w, height: h } = size
    const [show, setShow] = useState({ s1: false, s2: false })
    const _initAnchor = {
        frameStart: pos,
        frameEnd: _p(pos.x + size.width, pos.y + size.height),
        impStart: _p(pos.x + w / 2, pos.y),
        impEnd: _p(pos.x + w / 2, pos.y + h)

    }
    const [anchor, setAnchor] = useState(_initAnchor)

    const [impost, setImpost] = useState({ coords: [anchor.impStart, anchor.impEnd] as [_Point, _Point] })


    const left = useMemo(() => new StvFrame('s1', [anchor.frameStart, anchor.impEnd], { right: 'impost' }),
        [anchor.frameStart, anchor.impEnd])
    const right = useMemo(() => new StvFrame('s2', [anchor.impStart, anchor.frameEnd], { left: 'impost' }),
        [anchor.frameEnd, anchor.impStart])




    const toggleShow = (stv_id: string) => () => {
        setShow(prev => ({ ...prev, [stv_id]: !prev[stv_id as keyof typeof prev] }))
    }


    useEffect(() => {

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
            <GlsRect
                size={ _ss(size.width / 2, size.height) }
                posAnchor={ pos }
                rectProps={ { fill: 'lightblue' } }
                clickHandler={ toggleShow('s1') }
            />
            <GlsRect
                size={ _ss(size.width / 2, size.height) }
                posAnchor={ anchor.impStart }
                rectProps={ { fill: 'lightblue' } }
                clickHandler={ toggleShow('s2') }
            />
            <ImpostVertical coords={ impost.coords } />
            <FrameBordersBlock
                size={ size }
                anchor={ pos }
            />

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
}

export default FrameFF1


