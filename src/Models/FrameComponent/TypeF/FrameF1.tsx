import React, { useEffect, useState } from 'react'
import { _Point, _SizeF, _p, _ss } from '../../../Helpers/HelpersFns'
import { $DrawPosOffset } from '../../../Hooks/useOffset'
import FrameBordersBlock from '../FrameBorderBox'
import { FrameRamaContainer } from '../FrameRamaContainer'
import { GlsRect } from '../GlsRect'

type FrameRamaProps = {
    size: _SizeF
    pos: _Point
}

const FrameF1: React.FC<FrameRamaProps> = ({ size, pos }) => {

    const { width: w, height: h } = size

    const [STV, setStv] = useState([
        {
            _id: 's1',
            _nodeSize: size,
            anchor: pos,
            isShow: false
        }
    ])

    const toggleShow = (stv_id: string) => () => {
        setStv(prev => prev.map(stv => stv._id === stv_id ? { ...stv, isShow: !stv.isShow } : stv))
    }


    useEffect(() => {
        setStv(prev => prev.map(stv => stv._id === 's1' ? {
            ...stv,
            anchor: pos,
            _nodeSize: size
        }
            : stv))
    }, [pos, size])
    return (
        <FrameRamaContainer
            startPos={ pos }
            w={ w }
            h={ h }
        >
            <GlsRect
                size={ size }
                posAnchor={ pos }
                params={ { fill: 'lightblue' } }
                clickHandler={ toggleShow('s1') }
            />
            <FrameBordersBlock
                size={ size }
                anchor={ pos }
            />
            {
                STV.map(stv =>
                    <StvS1
                        _id='s1'
                        _nodeSize={ stv._nodeSize }
                        anchor={ stv.anchor }
                        isShow={ stv.isShow }
                        key={ stv._id } />
                )
            }

        </FrameRamaContainer>
    )
}

export default FrameF1

export const StvS1 = ({ anchor, _id, _nodeSize, isShow }: { anchor: _Point, _id: string, isShow: boolean, _nodeSize: _SizeF }) => {
    const deltaW = $DrawPosOffset.stv_rama + $DrawPosOffset.stv_rama
    const deltaH = $DrawPosOffset.stv_rama + $DrawPosOffset.stv_rama
    const deltaAX = $DrawPosOffset.stv_rama
    const deltaAY = $DrawPosOffset.stv_rama
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