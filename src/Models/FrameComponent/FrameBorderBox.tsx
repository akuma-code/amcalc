import React, { useEffect, useState } from 'react'
import { _Point, _SizeF } from '../../Helpers/HelpersFns'
import { newBordersCoordMap } from '../../Hooks/useOffset'
import FrameBorder from './FrameBorder'

type FrameBordersBlockProps = {
    anchor: _Point
    size: _SizeF
    bh?: number
    gProps?: React.SVGProps<SVGGElement>
}

const FrameBordersBlock = ({ anchor, size, bh, gProps }: FrameBordersBlockProps) => {
    const { borderCoordPoints } = newBordersCoordMap(size, anchor)

    return (
        <g { ...gProps }>
            { borderCoordPoints.map(({ coords, side }) =>
                <FrameBorder coords={ coords } dir={ side } key={ side } bh={ bh || 48 }

                />
            ) }
        </g>
    )
}

export default FrameBordersBlock