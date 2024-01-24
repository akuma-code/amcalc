import React, { useState } from 'react'
import { SvgMainFrame } from './SvgMainFrame'
import { _CPoint, _Point, _SizeF, _TPoint, _p, _ss } from '../../Helpers/HelpersFns'
import { RamaBordersCoords } from './RamaBordersCoords'
import { DrawerService } from '../Drower/DrawerFns'
import { TSide } from '../../Interfaces/Enums'

type FixProps = {
    size: _SizeF
    pos: _CPoint
}

type FrameProps = {
    width: number,
    height: number,
    pos: _TPoint
}
type FrameParams = {
    size: _SizeF
    pos: _CPoint
    offset?: Record<TSide, number>
    glass?: _SizeF
}


export const RamaF: React.FC<FixProps> = ({ pos, size }) => {
    const [showStv, setShowStv] = useState(false)
    const [params, setParams] = useState<FrameParams>({ pos, size })
    const ds = new DrawerService();
    const { width, height } = size;
    const { x, y } = pos

    const stvProps: FrameProps = {
        width: width - 50,
        height: height - 50,
        pos: [x + 25, y + 25]
    }
    function exportParams() {

        return params
    }

    const RBCoords = RamaBordersCoords(_ss(width, height), _p(x, y))

    const Rama_Borders = RBCoords(45).map(b => ({ side: b.side, path: ds.drawpath(...b.coords) }))

    const Stv_Borders = ({ width, height, pos }: FrameProps) => {
        const StvBCoords = RamaBordersCoords(_ss(width, height), _p(...pos))
        return StvBCoords
    }
    const Stv = Stv_Borders(stvProps)(45).map(b => ({ side: b.side, path: ds.drawpath(...b.coords) }))

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox={ `0 0 ${x + width} ${y + height}` }
            width={ x + width }
            height={ y + height }

        >
            <g stroke="black" key={ 'rama' }>

                <rect fill="#0080ff"
                    x={ x } y={ y } width={ width } height={ height }
                    className="cursor-pointer"
                    onClick={ () => setShowStv(prev => !prev) }
                />
                {
                    Rama_Borders.map((b) =>

                        <path d={ b.path } key={ b.side } fill="whitesmoke" />
                    )
                }
            </g>
            { showStv &&
                <g stroke="black" fill="whitesmoke" key={ 'stv' }>

                    { Stv.map((s) => <path d={ s.path } key={ s.side } />) }
                </g>
            }

        </svg>
    )
}

