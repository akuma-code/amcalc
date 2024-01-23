import { _Point, _SizeF, _isArr, _p, _s, _ss } from "../../Helpers/HelpersFns"
import { DrawerService } from "../Drower/DrawerFns"

type InnerCoords = readonly [x1: number, y1: number, x2: number, y2: number]
type MainFrameProps = {
    width: number,
    height: number,
    pos: InnerCoords
}
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
            viewBox={ `0 0 ${width} ${height}` }
            width={ width }
            height={ height }
        >
            <g>
                <rect width={ width } height={ height } fill="gray" stroke="#000" strokeWidth={ 4 } />
            </g>
            <g strokeWidth={ 2 } visibility={ 'hidden' }>
                <path d="M0 0 L20 20 L280 20 L300 0 Z" stroke="black" fill="whitesmoke" key={ 'top' } />
                <path d="M300 0 L280 20 L280 460 L300 480 Z" stroke="black" fill="whitesmoke" key={ 'right' } />
                <path d="M0 480 L20 460 L280 460 L300 480 Z" stroke="black" fill="whitesmoke" key={ 'bottom' } />
                <path d="M0 0 L20 20 L20 460 L0 480 Z" stroke="black" fill="whitesmoke" key={ 'left' } />
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
    console.log('Anchors', Anchors)
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
    const p = <path d={ `M${start} L${step1} L${step2} L${end} Z` } />
    return p

}

export const BorderPath = (...pts: _Point[]) => {
    const ds = new DrawerService()
    return ds.path(...pts)
}

