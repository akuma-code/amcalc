import React, { useEffect, useState } from 'react'
import { _Point, _SizeF, _log, _p, _ss } from '../../../Helpers/HelpersFns'
import { $DrawOffset, $DrawPosOffset } from '../../../Hooks/useOffset'
import FrameBordersBlock from '../FrameBorderBox'
import { FrameRamaContainer } from '../FrameRamaContainer'
import { GlsRect } from '../GlsRect'
import path from 'path'
import { TSide } from '../../../Interfaces/Enums'

type FrameRamaProps = {
    size: _SizeF
    pos: _Point
}
type IOverlap = { [Key in TSide]?: number }
const FrameFF1: React.FC<FrameRamaProps> = ({ size, pos }) => {

    const { width: w, height: h } = size

    const initImpost = {
        coords: [_p(pos.x + w / 2, pos.y), _p(pos.x + w / 2, pos.y + h)] as [_Point, _Point]
    }
    const [impost, setImpost] = useState(initImpost)
    const [STVs, setStv] = useState([
        {
            _id: 's1',
            isShow: false,
            anchorCoords: [pos, impost.coords[1]] as [_Point, _Point],

        },
        {
            _id: 's2',
            isShow: false,
            anchorCoords: [_p(pos.x + size.width / 2, pos.y), _p(pos.x + size.width, pos.y + size.height)] as [_Point, _Point],


        },

    ])
    const toggleShow = (stv_id: string) => () => {
        setStv(prev => prev.map(stv => stv._id === stv_id ? { ...stv, isShow: !stv.isShow } : stv))
    }


    useEffect(() => {


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
                params={ { fill: 'lightblue' } }
                clickHandler={ toggleShow('s1') }
            />
            <GlsRect
                size={ _ss(size.width / 2, size.height) }
                posAnchor={ { x: size.width / 2 + pos.x, y: pos.y } }
                params={ { fill: 'lightblue' } }
                clickHandler={ toggleShow('s2') }
            />
            <Impost coords={ impost.coords } />
            <FrameBordersBlock
                size={ size }
                anchor={ pos }
            />
            {
                STVs.map(stv =>
                    <StvS2 key={ stv._id }
                        _id={ stv._id }
                        anchorCoords={ stv.anchorCoords }
                        isShow={ stv.isShow }
                    // overlap={ stv.overlap }
                    />
                )
            }

        </FrameRamaContainer>
    )
}

export default FrameFF1

type ImpostProps = {
    coords: [_Point, _Point]
    anchor?: _Point

    clickHandler?: () => void
}
export const Impost = ({ coords, anchor, clickHandler }: ImpostProps) => {

    const [s, e] = coords
    const wImp = $DrawOffset.imp * 2
    const rama = $DrawOffset.rama
    const ly = Math.abs(s.y - e.y) - rama * 2



    const path = [
        `M${s.x - wImp / 2} ${s.y + rama - 5}`,
        `l${0} ${ly + 5}`,
        `l${wImp} ${0}`,
        `l${0} ${-ly}`,
        `l${-wImp} ${0}`,
        `Z`
    ].join(" ")


    const onClickFn = () => {
        clickHandler && clickHandler()
    }
    return <path d={ path } stroke='black' fill='white' onClick={ onClickFn } />
}

type StvProps = {
    anchor: _Point,
    _id: string,
    isShow: boolean,
    _nodeSize: _SizeF
    _anchorCoords: [_Point, _Point]
}
export const StvS1 = ({ anchor, _id, _nodeSize, isShow, _anchorCoords }: StvProps) => {
    const deltaW = $DrawPosOffset.stv_rama + $DrawPosOffset.stv_impost
    const deltaH = $DrawPosOffset.stv_rama + $DrawPosOffset.stv_rama
    const deltaAX = $DrawPosOffset.stv_rama
    const deltaAY = $DrawPosOffset.stv_rama
    // const { width: w, height: h } = _nodeSize
    const [s, e] = _anchorCoords
    const { width, height } = _ss(Math.abs(s.x - e.x) - deltaW, Math.abs(s.y - e.y) - deltaH)
    const [frame, setFrame] = useState({ anchor, _nodeSize: { width, height }, isShow })


    useEffect(() => {

        setFrame(prev => ({
            ...prev,
            _size: _ss(width - deltaW, height - deltaH),
            anchor: _p(anchor.x + deltaAX, anchor.y + deltaAY),
            isShow: isShow
        }))
        // return () => setFrame({

        //     _nodeSize: _ss(width - deltaW, height - deltaH),
        //     anchor: _p(anchor.x + deltaAX, anchor.y + deltaAY),
        //     isShow: isShow
        // })
    }, [anchor.x, anchor.y, deltaAX, deltaAY, deltaH, deltaW, height, isShow, width]

    )

    return isShow ? <FrameBordersBlock anchor={ frame.anchor } size={ frame._nodeSize } /> : null
}
export const StvS2 = ({ _id, anchorCoords, isShow, overlap }: { anchorCoords: [_Point, _Point], isShow: boolean, _id: string, overlap?: IOverlap }) => {
    const deltaW = $DrawPosOffset.stv_rama + $DrawPosOffset.stv_impost
    const deltaH = $DrawPosOffset.stv_rama + $DrawPosOffset.stv_rama
    const deltaAX = $DrawPosOffset.stv_rama
    const deltaAY = $DrawPosOffset.stv_rama
    let [s, e] = anchorCoords
    let [os, oe] = [
        _p(s.x + deltaAX, s.y + deltaAY),
        _p(e.x - deltaAX, e.y - deltaAY)
    ]
    const [frame, setFrame] = useState({

        isShow: false,
        anchorCoords,
        _size: _ss(e.x - s.x - deltaW, e.y - s.y - deltaH),
        anchor: _p(s.x + deltaAX, s.y + deltaAY)

    })

    useEffect(() => {
        // let [s, e] = frame.anchorCoords
        // const [s, e] = anchorCoords
        const size = _ss(e.x - s.x - deltaW, e.y - s.y - deltaH)
        const coords = [_p(s.x + deltaAX, s.y + deltaAY), _p(e.x - $DrawPosOffset.stv_rama, e.y - deltaAY)] as [_Point, _Point]
        setFrame(prev => ({ ...prev, isShow, anchorCoords: coords, _size: size }))
    }, [anchorCoords, deltaAX, deltaAY, deltaH, deltaW, e.x, e.y, isShow, s.x, s.y]

    )

    return isShow ? <FrameBordersBlock anchor={ frame.anchor } size={ frame._size } /> : null
}