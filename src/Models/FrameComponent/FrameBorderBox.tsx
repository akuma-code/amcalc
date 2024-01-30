import React, { useEffect, useState } from 'react'
import { _Point, _SizeF } from '../../Helpers/HelpersFns'
import { newBordersCoordMap } from '../../Hooks/useOffset'
import FrameBorder from './FrameBorder'

type FrameBordersBlockProps = {
    anchor: _Point
    size: _SizeF
}

const FrameBordersBlock = ({ anchor, size }: FrameBordersBlockProps) => {
    const { borderCoordPoints } = newBordersCoordMap(size, anchor)
    const [border, setBorder] = useState(newBordersCoordMap(size, anchor))
    useEffect(() => {
        setBorder(prev => ({ ...prev, ...newBordersCoordMap(size, anchor) }))
    }, [anchor, size])
    return (
        <g>
            { borderCoordPoints.map(({ coords, side }) =>
                <FrameBorder coords={ coords } dir={ side } key={ side } bh={ 48 }

                />
            ) }
        </g>
    )
}

export default FrameBordersBlock