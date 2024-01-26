import { useMemo } from 'react'
import { OFFSET, SystemProfile } from '../../../Components/Templates/Systems'
import { _Point, _SizeF } from '../../../Helpers/HelpersFns'
import { BorderStateOffset } from '../../FrameFactory'
import { joinCoordsMatrix } from '../AnchorModel'

type AramaProps = {
    size: _SizeF
    pos: _Point
}

const _MockSystemStore = SystemProfile.Proline
export const ARama = (props: AramaProps) => {


    const { size, pos: { x, y } } = props
    const { width: w, height: h } = size


    const ExtendRama = useMemo(() => {
        const BO = new BorderStateOffset()
        const extRama = BO.newNodeData(size, props.pos)
        // const OffsetRecord = OFFSET[_MockSystemStore]
        // TSidesArray.forEach(s => BO.setOffset(s, OffsetRecord))

        // const { borderCoordsMap } = extRama

        // const offsetMap = BO.coordsOffsetMap
        // // const matrix = coordsMap.map((side,idx)=>{
        // // const arr1 = Object.values(side)
        // // const arr2 = Object.values(offsetMap[idx])
        // // })
        // const matrix = []
        // for (let i = 0; i < borderCoordsMap.length; i++) {
        //     const arr1 = borderCoordsMap[i]['coords'] as [number, number, number, number]
        //     const arr2 = offsetMap[i]['coords'] as typeof arr1
        //     matrix.push(joinCoordsMatrix(arr1, arr2))
        // }
        // console.log('BO', BO)
        return { ...extRama }
    }, [props.pos, size])

    return (
        <div>ARama</div>
    )
}

