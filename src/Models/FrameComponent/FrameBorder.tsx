import React from 'react'
import { _Point, _log, _p } from '../../Helpers/HelpersFns'
import { TSide, TSides } from '../../Interfaces/Enums'
import { DrawerService } from '../Drower/DrawerFns'

interface FrameBorderProps {
    coords: [start: _Point, end: _Point]
    dir: TSide
    bh?: number
}
const ds = new DrawerService()

const FrameBorder = ({ coords, dir, bh = 50 }: FrameBorderProps) => {

    const [s0, s3] = [coords['0'], coords[1]]
    const lx = s3.x - s0.x
    const ly = s3.y - s0.y
    const [s1, s2] = [
        _p(s0.x + bh, s0.y + bh),
        _p(s0.x - bh, s0.y + bh)
    ]
    console.log('l', lx)
    const pathTop = [
        `m`, 0, 0,
        `l${bh}`, bh,
        `l${lx}`, 0,
        `l${bh}`, -bh,
        `z`
    ].join(" ")
    const pathBot = [
        `M${s0.x} ${s3.y}`,
        `l${-bh}`, bh,
        `l${lx}`, 0,
        `l${-bh}`, -bh,
        `z`
    ].join(" ")
    _log(pathBot)
    return (
        <path x={s0.x} y={s0.y} d={pathBot} stroke='green' fill='blue' />
    )
}


const absLength = (coords: [_Point, _Point]) => {
    const [start, end] = coords
    const [ax, ay] = [Math.abs(start.x - end.x), Math.abs(start.y - end.y)]

    console.log('ax-ay', ax, ay)
    const l = Math.sqrt(ax ^ 2 + ay ^ 2)
    return l
}







export default FrameBorder