import React, { useEffect, useState } from 'react'
import { InnerCoords, SvgMainFrame } from './SvgMainFrame'
import { _CPoint, _Point, _SizeF, _TPoint, _log, _p, _ss } from '../../Helpers/HelpersFns'
import { RamaBordersCoords } from './RamaBordersCoords'
import { DrawerService } from '../Drower/DrawerFns'
import { TSide } from '../../Interfaces/Enums'
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { Button } from '@mui/material'
import { FrameState } from './FrameStateData'

import { ANYobj } from '../../Interfaces/MathActionsTypes'
import { Stvorka } from './Stvorka'
import { ISideDirections } from '../../Components/Templates/Systems'
export type BorderPath = {
    side: ISideDirections;
    path: string;
}
type FixProps = {
    size: _SizeF
    pos: _CPoint
}

type FrameProps = {
    stv_W: number,
    stv_H: number,
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




    const [impCoords, setimpCoords] = useState({
        x1: x + params.size.width / 2,
        y1: y + 45,
        x2: x + params.size.width / 2,
        y2: y + params.size.height - 45
    })
    const [STV, setStv] = useState<Record<'s1' | 's2', FrameProps & { isShow: boolean }>>({
        s1: {
            stv_W: size.width / 2 - 30,
            stv_H: y + size.height - 40,
            pos: [x, y],
            isShow: true
        },
        s2: {
            stv_W: size.width / 2 - 30,
            stv_H: y + size.height - 40,
            pos: [width / 2 + x, y],
            isShow: true
        },
    })




    const RBCoords = RamaBordersCoords(_ss(params.size.width, params.size.height), _p(params.pos.x, params.pos.y))

    const Rama_Borders = RBCoords(45).map(b => ({ side: b.side, path: ds.drawpath(...b.coords) }))

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

    useEffect(() => {

        setimpCoords(prev => ({
            ...prev, x1: x + params.size.width / 2,
            y1: y + 45,
            x2: x + params.size.width / 2,
            y2: y + params.size.height - 45
        }))
        setParams(prev => ({ ...prev, pos: { ...prev.pos, ..._p(pos.x, pos.y) }, size: { ...size } }))
        setStv(prev => ({
            ...prev,
            s1: { ...prev.s1, pos: [x, y], stv_W: STV.s1.stv_W, stv_H: STV.s1.stv_H },
            s2: { ...prev.s2, pos: [x + params.size.width / 2, y] }, stv_W: STV.s2.stv_W, stv_H: STV.s2.stv_H
        }))
    }, [STV.s1.stv_H, STV.s1.stv_W, STV.s2.stv_H, STV.s2.stv_W, params.size.height, params.size.width, pos.x, pos.y, size, x, y])
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox={ `0 0 ${x + width} ${y + height}` }
            width={ x + width }
            height={ y + height }
        // x={ x }
        // y={ y }

        >
            {/* //________________________glass */ }
            <g key={ 'glass' }>

                <rect fill="#0080aa"
                    x={ STV.s1.pos[0] } y={ STV.s1.pos[1] } width={ width / 2 } height={ height }
                    className="cursor-pointer" onClick={ () => setStv(prev => ({ ...prev, s1: { ...prev.s1, isShow: !prev.s1.isShow } })) }
                />
                <rect fill="#0080aa"
                    x={ STV.s2.pos[0] } y={ STV.s2.pos[1] } width={ width / 2 } height={ height }
                    className="cursor-pointer" onClick={ () => setStv(prev => ({ ...prev, s2: { ...prev.s2, isShow: !prev.s2.isShow } })) }
                />
            </g>
            {/* //________________________rama */ }
            <g stroke="black" key={ 'rama' }>
                {
                    Rama_Borders.map((b) =>
                        <path d={ b.path } key={ b.side } fill="whitesmoke" />
                    )
                }

            </g>
            {/* //________________________IMPOST */ }
            <path d={ ds.drawpath(..._imp) } fill='white' stroke='black' key={ 'impost' } />
            {/* //________________________Stvorki */ }
            {
                STV.s1.isShow &&
                // <StvorkaSvg
                //     width={ STV.s1.stv_W }
                //     height={ STV.s1.stv_H }
                //     offset={ 45 }
                //     pos={ STV.s1.pos }
                //     anchor={ STV.s1.pos }
                // />
                <Stvorka
                    w={ STV.s1.stv_W }
                    h={ STV.s1.stv_H }
                    anchor={ { p: STV.s1.pos, _type: 'rama' } }

                />
            }

            {
                STV.s2.isShow &&
                <Stvorka
                    w={ STV.s2.stv_W }
                    h={ STV.s2.stv_H }
                    anchor={ { p: STV.s2.pos, _type: 'impost' } }

                />
                // <StvorkaSvg
                //     width={ STV.s2.stv_W }
                //     height={ STV.s2.stv_H }
                //     offset={ 45 }
                //     pos={ STV.s2.pos }
                //     anchor={ STV.s2.pos }
                // />
            }





        </svg>
    )
}
export type StvorkaSvgProps = {
    width: number
    height: number
    offset: number
    pos: _TPoint
    anchor: _TPoint
    g_props?: React.SVGProps<SVGGElement>
}
const StvorkaSvg: React.FC<StvorkaSvgProps> = (props) => {
    const { g_props, height, width, pos, offset } = props;
    const Stv_Borders = ({ width: stv_W, height: stv_H, pos }: Pick<StvorkaSvgProps, 'height' | 'width' | 'pos'>) => {
        const StvBCoords = RamaBordersCoords(_ss(stv_W, stv_H), _p(...pos!))
        return StvBCoords(offset)
    }
    const _borderPaths = Stv_Borders({ width, height, pos }).map(b => ({ side: b.side, path: ds.drawpath(...b.coords) }))




    return (
        <g stroke="black" fill="whitesmoke" { ...g_props }>
            { _borderPaths.map((s) =>
                <path d={ s.path } key={ s.side } />)
            }
        </g>
    )
}


const _BorderSide = (side: TSide, coords: readonly [_TPoint, _TPoint, _TPoint, _TPoint]) => {
    const dpath = { d: ds.drawpath(...coords) }

    return <path { ...dpath } key={ side } fill='whitesmoke' stroke='black' />
}