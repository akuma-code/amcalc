import { _Point, _SizeF, _TPoint, _isArr, _log, _p, _s, _ss } from "../../Helpers/HelpersFns"
import { TSide, TSides } from "../../Interfaces/Enums"
import { DrawerService } from "../Drower/DrawerFns"
import { ISideDirections } from "../FrameFactory"

type InnerCoords = readonly [x1: number, y1: number, x2: number, y2: number]
type MainFrameProps = {
    width: number,
    height: number,
    pos: InnerCoords
}

type _CoordsSE = _Point | _TPoint
const ds = new DrawerService()
export const SvgMainFrame = ({ width, height, pos }: MainFrameProps) => {
    const [x1, y1, x2, y2] = pos

    const vbox = pos.join(' ')
    const T = () => ds.path(
        [0, 0],
        [20, 20],
        [280, 20],
        [300, 0]
    )
    const R = () => BorderPath(
        _p(300, 0),
        _p(280, 20),
        _p(280, 460),
        _p(300, 480),
    )
    const B = () => BorderPath(
        _p(0, 480),
        _p(20, 460),
        _p(280, 460),
        _p(300, 480),
    )
    const L = () => BorderPath(
        _p(0, 0),
        _p(20, 20),
        _p(20, 460),
        _p(0, 480),
    )
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
        >
            <g>
                <rect width={width} height={height} fill="gray" stroke="#000" strokeWidth={4} />
            </g>
            <g strokeWidth={2} visibility={'hidden'}>
                <path d="M0 0 L20 20 L280 20 L300 0 Z" stroke="black" fill="whitesmoke" key={'top'} />
                <path d="M300 0 L280 20 L280 460 L300 480 Z" stroke="black" fill="whitesmoke" key={'right'} />
                <path d="M0 480 L20 460 L280 460 L300 480 Z" stroke="black" fill="whitesmoke" key={'bottom'} />
                <path d="M0 0 L20 20 L20 460 L0 480 Z" stroke="black" fill="whitesmoke" key={'left'} />
            </g>
            {/* <RamaBorders
                size={ _ss(width, height) }
                od={ 20 }
            /> */}

            <g>
                <T />
                <R />
                <B />
                <L />
            </g>
        </svg>
    )

}
type BordersProps = {
    size: _SizeF
    od: number
}
export const RamaBorders = (props: BordersProps) => {
    const { width, height } = props.size
    const { od } = props

    const Anchors = {
        tl: _p(od, od),
        tr: _p(+width - od, od),
        bl: _p(od, +height - od),
        br: _p(+width - od, +height - od),
    }
    // console.log('Anchors', Anchors)
    const Top = () => drawPath([{ x: 0, y: 0 }, Anchors.tl, Anchors.tr, { x: width, y: 0 }])
    const Right = () => drawPath([{ x: width, y: 0 }, Anchors.tr, Anchors.br, { x: width, y: height }])
    const Bottom = () => drawPath([{ x: width, y: height }, Anchors.br, Anchors.bl, { x: 0, y: height }])
    const Left = () => drawPath([{ x: 0, y: height }, Anchors.bl, Anchors.tl, { x: 0, y: 0 }])


    return (
        <g stroke="#000" fill="whitesmoke">
            <Top />
            <Right />
            <Bottom />
            <Left />
        </g>)
}

const drawPath = (pts: readonly { x: number, y: number }[]) => {
    const converted = pts.map(p => ([p.x, p.y]))
    // console.log('converted', converted)
    const [start, step1, step2, end] = converted
    const p = <path d={`M${start} L${step1} L${step2} L${end} Z`} />
    return p

}

export const BorderPath = (...pts: _Point[]) => {
    const ds = new DrawerService()
    return ds.path(...pts)
}

const RamaFrameData = (size: _SizeF, startPos: _Point, offsetValue: number) => {

    const { width, height } = size
    const { x, y } = startPos
    const _of = offsetValue
    const [x1, y1, x2, y2] = [
        x,
        y,
        x + width,
        y + height
    ]
    const borders: Record<ISideDirections, [_TPoint, _TPoint]> = {
        top: [[x1, y1], [x2, y1]] as const,
        right: [[x2, y1], [x2, y2]] as const,
        bottom: [[x2, y2], [x1, y2]] as const,
        left: [[x1, y2], [x1, y1]] as const,
    }

    const offsetBorder: Record<ISideDirections, [_TPoint, _TPoint]> = {
        top: [[x1 + _of, y1 + _of], [x2 - _of, y1 + _of]] as const,
        right: [[x2 - _of, y1 + _of], [x2 - _of, y2 - _of]] as const,
        bottom: [[x2 - _of, y2 - _of], [x1 + _of, y2 - _of]] as const,
        left: [[x1 + _of, y2 - _of], [x1 + _of, y1 + _of]] as const,
    }


    return generateCoords(borders, offsetBorder)


}

export const generateCoords = (
    borders: Record<ISideDirections, [_TPoint, _TPoint]>,
    offset: Record<ISideDirections, [_TPoint, _TPoint]>
): { [x: string]: readonly [_TPoint, _TPoint, _TPoint, _TPoint] }[] => {


    const sides = ['top', 'right', 'bottom', 'left'] as const
    const res = sides.map(s => {
        let s1: _TPoint, s2: _TPoint, s3: _TPoint, s4: _TPoint;
        const _b = borders[s]
        const _o = offset[s]

        switch (s) {
            case "top": {
                s1 = _b[0];
                s2 = _o[0];
                s3 = _o[1];
                s4 = _b[1]
                break
            }
            case "right": {
                s1 = _b[0];
                s2 = _o[0];
                s3 = _o[1];
                s4 = _b[1]
                break
            }
            case "bottom": {
                s1 = _b[1];
                s2 = _o[1];
                s3 = _o[0];
                s4 = _b[0]
                break
            }
            case "left": {
                s1 = _b[1];
                s2 = _o[1];
                s3 = _o[0];
                s4 = _b[0]
                break
            }
        }
        return { [s as ISideDirections]: [s1, s2, s3, s4] as const }
    })
    return res
}

const sides = ['top', 'right', 'bottom', 'left'] as const
export const _sideIterate = sides.map


const y = RamaFrameData(_ss(400, 600), _p(0, 0), 20)
_log(y)

type TLineProps<T> = T extends TSide ?
    T extends TSides[0 | 2] ? { side: T, coords: { x1: number, x2: number } }
    : T extends TSides[1 | 3] ? { side: T, coords: { y1: number, y2: number } }
    : never : never

type TP = TLineProps<'left'>
type LineProps = { side: TSides[0 | 2], coords: [number, number, number] } | { side: TSides[1 | 3], coords: [number, number, number] }
function _newline<T>(props: TLineProps<T>) {
    const border = (restCoord: number) => {
        const start = []
    }
    switch (props.side) {
        case "top":
        case "bottom":
        case "right":
        case "left":
    }

}


const converter = (line: LineProps) => {

    switch (line.side) {
        case "top": {
            const { coords } = line
            const [x1, x2, y1] = coords
            const offset = (off: number) => [x1 + off, x2 - off, y1 + off]
            return offset
        }
        case "bottom": {
            const { coords } = line
            const [x1, x2, y2] = coords
            const offset = (off: number) => [x1 - off, x2 + off, y2 + off]
            return offset
        }
        case "right": {
            const { coords } = line
            const [y1, y2, x2] = coords
            const offset = (off: number) => [y1 + off, y2 - off, x2 - off]
            return offset
        }
        case "left": {
            const { coords } = line
            const [y1, y2, x1] = coords
            const offset = (off: number) => [y1 - off, y2 + off, x1 + off]
            return offset
        }
    }
}

_log(converter({ side: 'left', coords: [200, 0, 300] })(20))