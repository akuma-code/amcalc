import { useMemo } from 'react'
import { OFFSET, SystemProfile } from '../../../Components/Templates/Systems'
import { _Point, _SizeF, _p } from '../../../Helpers/HelpersFns'
import { NodeFactory } from '../../FrameFactory'
import { joinCoordsMatrix } from '../AnchorModel'
import { DrawerService } from '../../Drower/DrawerFns'

type AramaProps = {
    size: _SizeF
    pos: _Point
}
const ds = new DrawerService()
const _MockSystemStore = SystemProfile.Proline
export const ARama = (props: AramaProps) => {


    const { size, pos: { x, y } } = props
    const { width: w, height: h } = size


    const Node = useMemo(() => {
        const BO = new NodeFactory(_MockSystemStore)
        const extRama = BO.newNodeData(size, props.pos)

        return { ...extRama }
    }, [props.pos, size])


    const bordersPath = Node.pathCoords.map(b => ({ side: b.side, path: b.path }))
    const paths = bordersPath.map(bp => ({ ...bp, path: ds.drawpath(...bp.path[0], ...bp.path[1]) }))

    // console.log('paths', paths)
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox={ `0 0 ${x + w} ${y + h}` }
            width={ x + w }
            height={ y + h }>
            <g stroke='black' fill='white' >
                { paths.map(bs =>
                    <path d={ bs.path } key={ bs.side } />
                ) }
            </g>





        </svg>
    )
}

