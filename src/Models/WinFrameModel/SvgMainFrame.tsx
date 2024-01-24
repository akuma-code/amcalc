import { useState } from "react"
import { _TPoint, _isArr, _log, _p, _s, _ss } from "../../Helpers/HelpersFns"
import { TSide, TSides } from "../../Interfaces/Enums"
import { DrawerService } from "../Drower/DrawerFns"
import { TSideBorderState } from "../FrameFactory"
import { RamaBordersCoords } from "./RamaBordersCoords"

export type InnerCoords = readonly [x1: number, y1: number, x2: number, y2: number]
type MainFrameProps = {
    width: number,
    height: number,
    pos: _TPoint
}


const ds = new DrawerService()
export const SvgMainFrame = ({ width, height, pos }: MainFrameProps) => {
    const [showStv, setShowStv] = useState(false)
    const [x1, y1] = pos
    const stvProps: MainFrameProps = {
        width: width - 50,
        height: height - 50,
        pos: [x1 + 25, y1 + 25]
    }


    const RBCoords = RamaBordersCoords(_ss(width, height), _p(x1, y1))

    const Rama_Borders = RBCoords(45).map(b => ({ side: b.side, path: ds.drawpath(...b.coords) }))

    const Stv_Borders = ({ width, height, pos }: MainFrameProps) => {
        const StvBCoords = RamaBordersCoords(_ss(width, height), _p(...pos))
        return StvBCoords
    }
    const Stv = Stv_Borders(stvProps)(45).map(b => ({ side: b.side, path: ds.drawpath(...b.coords) }))

    return (

        <svg xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox={ `0 0 ${x1 + width} ${y1 + height}` }
            width={ x1 + width }
            height={ y1 + height }

        >
            <g stroke="black" key={ 'rama' }>

                <rect fill="#0080ff"
                    x={ x1 } y={ y1 } width={ width } height={ height }
                    onClick={ () => setShowStv(prev => !prev) }
                    className="cursor-pointer"
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


type TLineProps<T> = T extends TSide ?
    T extends TSides[0 | 2] ? { side: T, coords: { x1: number, x2: number } }
    : T extends TSides[1 | 3] ? { side: T, coords: { y1: number, y2: number } }
    : never : never


type LineProps = { side: TSides[0 | 2], coords: [number, number, number] } | { side: TSides[1 | 3], coords: [number, number, number] }

