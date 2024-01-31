import React from 'react'
import { _Point, _log, _p } from '../../Helpers/HelpersFns'
import { TSide, TSides } from '../../Interfaces/Enums'
import { DrawerService } from '../Drower/DrawerFns'

interface FrameBorderProps {
    coords: [start: _Point, end: _Point]
    dir: TSide
    bh?: number
    pathProps?: React.SVGProps<SVGPathElement>
}
const ds = new DrawerService()

const FrameBorder = ({ coords, dir, bh = 50, pathProps }: FrameBorderProps) => {
    const { path } = absSidePath(dir, coords, bh)
    if (pathProps) return <path d={ path } strokeWidth={ 2 } key={ dir } { ...pathProps } />
    return (
        <path d={ path } stroke='black' fill='whitesmoke' strokeWidth={ 2 } key={ dir } />
    )
}





const absSidePath = (side: TSide, coords: [start: _Point, end: _Point], bh: number) => {

    const [s, e] = coords
    const lx = Math.abs(s.x - e.x) - 2 * bh
    const ly = Math.abs(s.y - e.y) - 2 * bh
    const { x, y } = s
    const path: (string | number)[] = []
    const b = bh

    switch (side) {
        case 'top': path.push(
            `M${x} ${y}`,
            `l${b}`, b,
            `l${lx}`, 0,
            `l${b}`, -b,
            'Z',
        );
            break
        case 'right': path.push(
            `M${x} ${y}`,
            `l${-b}`, b,
            `l0`, ly,
            `l${b}`, b,
            'Z',
        );
            break
        case 'bottom': path.push(
            `M${x} ${y}`,
            `l${-b}`, -b,
            `l${-lx}`, 0,
            `l${-b}`, b,
            'Z',
        );
            break
        case 'left': path.push(
            `M${x} ${y}`,
            `l${b}`, -b,
            `l${0}`, -ly,
            `l${-b}`, -b,
            'Z',
        );
            break
    }
    const abs = path.join(" ")

    const relativePathPoints = {
        top: [

            [b, b],
            [lx, 0],
            [b, -b]
        ],
        bottom: [

            [-b, -b],
            [-lx, 0],
            [-b, b]
        ],
        left: [
            [b, -b],
            [0, -ly],
            [-b, -b],
        ],
        right: [
            [-b, b],
            [0, ly],
            [b, b],
        ]
    }
    return { path: abs, relativePathPoints }

}




export default FrameBorder