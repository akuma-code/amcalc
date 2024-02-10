import React, { useEffect, useMemo, useState } from 'react'
import { _Point, _SizeF, _p, _ss } from '../../../Helpers/HelpersFns'
import { $DrawPosOffset } from '../../../Hooks/useOffset'
import FrameBordersBlock from '../FrameBorderBox'
import { FrameRamaContainer } from '../FrameRamaContainer'
import { GlsRect } from '../GlsRect'
import { StvFrame } from '../StvState'
import { Stvorka } from '../Stvorka'


type FrameRamaProps = {
    size: _SizeF
    pos: _Point
}

const FrameF1: React.FC<FrameRamaProps> = ({ size, pos }) => {

    const { width: w, height: h } = size
    const [show, setShow] = useState({ s1: false })
    const _initAnchor = {
        frameStart: pos,
        frameEnd: _p(pos.x + size.width, pos.y + size.height)
    }
    const [anchor, setAnchor] = useState(_initAnchor)

    const stv = useMemo(() => new StvFrame([anchor.frameStart, anchor.frameEnd]), [anchor.frameEnd, anchor.frameStart])
    const toggleShow = (stv_id: string) => () => {
        setShow(prev => ({ ...prev, [stv_id]: !prev[stv_id as keyof typeof show] }))
    }


    useEffect(() => {
        setAnchor(prev => ({
            ...prev, frameStart: pos,
            frameEnd: _p(pos.x + size.width, pos.y + size.height)
        }))
    }, [pos, size])
    return (



        <FrameRamaContainer
            pos={ pos }
            width={ w }
            height={ h }
        >
            <GlsRect
                size={ size }
                posAnchor={ pos }
                rectProps={ { fill: 'lightblue' } }
                clickHandler={ toggleShow('s1') }
            />
            <FrameBordersBlock
                size={ size }
                anchor={ pos }
            />
            {
                // STV.map(stv =>
                //     <StvS1
                //         _id='s1'
                //         _nodeSize={ stv._nodeSize }
                //         anchor={ stv.anchor }
                //         isShow={ stv.isShow }
                //         key={ stv._id } />
                // )
            }
            <Stvorka
                isShow={ show.s1 }
                stv={ stv }
            />

        </FrameRamaContainer>
    )
}

export default FrameF1

export const StvS1 = ({ anchor, _id, _nodeSize, isShow }: { anchor: _Point, _id: string, isShow: boolean, _nodeSize: _SizeF }) => {
    const deltaW = $DrawPosOffset.rama + $DrawPosOffset.rama
    const deltaH = $DrawPosOffset.rama + $DrawPosOffset.rama
    const deltaAX = $DrawPosOffset.rama
    const deltaAY = $DrawPosOffset.rama
    const { width: w, height: h } = _nodeSize

    const [frame, setFrame] = useState({
        _size: _ss(w - deltaW, h - deltaH),
        anchor: _p(anchor.x + deltaAX, anchor.y + deltaAY),
        isShow
    })
    useEffect(() => {
        setFrame(prev => ({ ...prev, _size: _ss(w - deltaW, h - deltaH), anchor: _p(anchor.x + deltaAX, anchor.y + deltaAY), isShow: isShow }))
    }, [anchor.x, anchor.y, deltaAX, deltaAY, deltaH, deltaW, h, isShow, w]

    )

    return isShow ? <FrameBordersBlock anchor={ frame.anchor } size={ frame._size } /> : null
}