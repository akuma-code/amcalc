import React, { useState } from 'react'
import { InnerCoords, SvgMainFrame } from './SvgMainFrame'
import { _CPoint, _Point, _SizeF, _TPoint, _log, _p, _ss } from '../../Helpers/HelpersFns'
import { RamaBordersCoords } from './RamaBordersCoords'
import { DrawerService } from '../Drower/DrawerFns'
import { IFrameVariants, TSide } from '../../Interfaces/Enums'
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { Button } from '@mui/material'

interface IFrameState<T extends IFrameVariants> {
    _type: T
    rama: {
        size: _SizeF
        pos: _TPoint
        params?: {
            system: string
        }
    }
    imposts: {
        axisCoords: [_TPoint, _TPoint]
        params?: {
            _impType: 'standart' | 'fram'
            delta: number
        }
    }[]
    stvs: {
        sCoords: [_TPoint, _TPoint]
        pos: _CPoint
        _id: `s${number}`
        isShow: boolean
    }[]
}
class FrameState implements IFrameState<'f'>{
    _type: 'f' = 'f'
    rama!: { size: _SizeF; pos: _TPoint; params?: { system: string } | undefined }
    imposts!: { axisCoords: [_TPoint, _TPoint]; params?: { _impType: 'standart' | 'fram'; delta: number } | undefined }[]
    stvs!: { sCoords: [_TPoint, _TPoint]; pos: _CPoint; _id: `s${number}`; isShow: boolean }[]
    constructor(size: _SizeF, pos: _TPoint, params?: any) {

    }
}



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
export type _CCoords = { x1: number, y1: number, x2: number, y2: number }

const ds = new DrawerService();
export const RamaFF: React.FC<FixProps> = ({ pos, size }) => {
    const { width, height } = size;
    const { x, y } = pos
    const [params, setParams] = useState<FrameParams>({ pos, size })
    const [showStv, setShowStv] = useState(false)
    const [impCoords, setimpCoords] = useState({
        x1: x + width / 2,
        y1: y + 45,
        x2: x + width / 2,
        y2: y + height - 45
    })
    const [STV, setStv] = useState<Record<'s1' | 's2', FrameProps & { isShow: boolean }>>({
        s1: {
            width: width / 2 - 30,
            height: y + height - 40,
            pos: [x + 20, y + 20],
            isShow: true
        },
        s2: {
            width: width / 2 - 30,
            height: y + height - 40,
            pos: [x + width / 2 + 10, y + 20],
            isShow: true
        },
    })

    const RBCoords = RamaBordersCoords(_ss(width, height), _p(x, y))

    const Rama_Borders = RBCoords(45).map(b => ({ side: b.side, path: ds.drawpath(...b.coords) }))

    const Stv_Borders = ({ width, height, pos }: FrameProps) => {
        const StvBCoords = RamaBordersCoords(_ss(width, height), _p(...pos))
        return StvBCoords
    }
    const Stv1 = Stv_Borders(STV.s1)(45).map(b => ({ side: b.side, path: ds.drawpath(...b.coords) }))
    const Stv2 = Stv_Borders(STV.s2)(45).map(b => ({ side: b.side, path: ds.drawpath(...b.coords) }))
    const ImpostCoords = (delta: number, coords: _CCoords) => {
        const { x1, y1, x2, y2 } = coords
        const impostCoords = [] as _TPoint[]
        if (y1 === y2) {
            impostCoords.push(
                [x1, y1 - delta],
                [x1, y1 + delta],
                [x2, y1 + delta],
                [x2, y1 - delta],)
        }

        if (x1 === x2) {
            impostCoords.push(
                [x1 - delta, y1],
                [x2 - delta, y2],
                [x2 + delta, y2],
                [x1 + delta, y1],)
        }
        return impostCoords!
    }
    const _imp = ImpostCoords(25, impCoords)


    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox={ `0 0 ${x + width} ${y + height}` }
            width={ x + width }
            height={ y + height }

        >
            <g stroke="black" key={ 'rama' }>

                <rect fill="#0080aa"
                    x={ STV.s1.pos[0] } y={ STV.s1.pos[1] } width={ STV.s1.width } height={ STV.s1.height }
                    className="cursor-pointer" onClick={ () => setStv(prev => ({ ...prev, s1: { ...prev.s1, isShow: !prev.s1.isShow } })) }
                />
                <rect fill="#0080aa"
                    x={ STV.s2.pos[0] } y={ STV.s2.pos[1] } width={ STV.s2.width } height={ STV.s2.height }
                    className="cursor-pointer" onClick={ () => setStv(prev => ({ ...prev, s2: { ...prev.s2, isShow: !prev.s2.isShow } })) }
                />
                {
                    Rama_Borders.map((b) =>
                        <path d={ b.path } key={ b.side } fill="whitesmoke" />
                    )
                }

            </g>
            <path d={ ds.drawpath(..._imp) } fill='white' stroke='black' key={ 'impost' } />

            {
                STV.s1.isShow &&
                <g stroke="black" fill="whitesmoke" key={ 'stv1' }>
                    { Stv1.map((s) => <path d={ s.path } key={ s.side } />) }
                </g>
            }

            {
                STV.s2.isShow &&
                <g stroke="black" fill="whitesmoke" key={ 'stv2' }>
                    { Stv2.map((s) => <path d={ s.path } key={ s.side } />) }

                </g>
            }

            <g x={ x + 100 } y={ y + height - 100 } width={ 100 } height={ 100 } fontSize={ 10 }>
                <div>

                    <AspectRatioIcon />
                </div>
            </g>



        </svg>
    )
}

