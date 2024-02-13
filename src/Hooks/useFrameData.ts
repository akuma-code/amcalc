import { useEffect, useState } from "react";
import { _ID, _Point, _SizeF, _getcoords, _log, _p, _psum, _ss } from "../Helpers/HelpersFns";

import { BaseNode, BordersBlock, FrameNodeWithSides } from "../Models/FrameComponent/FrameFactory/FrameNodeWithSides";
import { ISideStateOffset, _TCoords } from "../Models/FrameComponent/StvState";
import { toJS } from "mobx";
import { ActionCoordService } from "../Models/Drower/Actions";



type RamaCreateProps = { size: _SizeF, pos?: _Point }
type ImpostCreateProps = {
    xy: _Point,
    direction: 'horisontal' | 'vertical',
    _type: 'main' | 'secondary'
}
type IUseFrameData = {
    rama: RamaCreateProps
    // nodes?: FrameNodeWithSides[]

}
const init: IUseFrameData = {
    rama: { size: _ss(1000, 1000), pos: _p(0, 0) },

}
export function useFrameData(initFrameData: IUseFrameData = init) {
    const { rama } = initFrameData
    const { size, pos = { x: 0, y: 0 } } = rama

    const [frame_rama, frame_control] = useFrameRama_(size, pos)
    const [_nodes] = useFrameNodes_(frame_rama)


    return [frame_rama, _nodes] as const

}

function useFrameRama_(
    size: _SizeF = { width: 1000, height: 1000 },
    pos: _Point = { x: 0, y: 0 }
) {
    const { width, height } = size
    const { x, y } = pos
    const borders = new BordersBlock()
    const [frame_rama, setRama] = useState({ size, pos, borders })


    useEffect(() => {
        const impostData = getInitImpostData_({
            size: _ss(width, height),
            pos: _p(x, y),
        }, 'vertical')

        setRama(prev => ({
            ...prev,
            size: _ss(width, height),
            pos: _p(x, y),
            borders,
            impost: impostData,

        }))
    }, [height, x, y, width])

    return [frame_rama, setRama] as const
}
const New_node = (size: _SizeF, pos: _Point = { x: 0, y: 0 }, next?: ISideStateOffset) => ({ _id: _ID(), coords: _getcoords(size, pos), borders: new BordersBlock(next) })
type IFrameNode = {
    _id: string
    coords: _TCoords
    borders: BordersBlock
}
const useFrameNodes_ = (rama: { size: _SizeF, pos?: _Point }) => {
    const { size, pos = { x: 0, y: 0 } } = rama
    const ramaCoords = useCoords_(size, pos)

    const [nodes, setNodes] = useState<IFrameNode[]>([])
    const addNode = () => {


    }


    useEffect(() => {
        addNode()
    }, [])

    return [nodes]
}
const useCoords_ = (size: _SizeF, pos: _Point = _p(0, 0)) => {

    const [coords, setCoords] = useState(_getcoords(size, pos))
    const translate = (delta: _Point) => { setCoords([_psum(coords[0], delta), _psum(coords[1], delta)]) }
    useEffect(() => {
        setCoords(_getcoords(size, pos))
    }, [size.width, size.height, pos.x, pos.y])

    return { coords, translate } as const
}



const getInitImpostData_ = (node: RamaCreateProps, dir: ImpostCreateProps['direction']) => {

    const coords = _getcoords(node.size, node.pos)
    const axis = ActionCoordService.getXY(node.size, node.pos)
    const imp = { _id: _ID(), direction: dir, }
    switch (dir) {
        case "horisontal": {
            const y = axis.y
            const x1 = coords[0].x
            const x2 = coords[1].x
            const s = _p(x1, y)
            const e = _p(x2, y)
            return { coords: [s, e], ...imp }
        }
        case "vertical": {
            const x = axis.x
            const y1 = coords[0].y
            const y2 = coords[1].y
            const s = _p(x, y1)
            const e = _p(x, y2)
            return { coords: [s, e], ...imp }
        }
    }
}













