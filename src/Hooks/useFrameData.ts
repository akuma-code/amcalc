import { useEffect, useState } from "react";
import { _Point, _SizeF, _getcoords, _log, _p, _ss } from "../Helpers/HelpersFns";

import { BaseNode, BordersBlock, FrameNodeWithSides } from "../Models/FrameComponent/FrameFactory/FrameNodeWithSides";
import { _TCoords } from "../Models/FrameComponent/StvState";
import { toJS } from "mobx";



type InitArgsType<T> = T extends [infer F, _Point]
    ? F extends _SizeF
    ? [_SizeF, _Point]
    : F extends _Point
    ? [_Point, _Point]
    : T
    : never

type IUseFrameData = {
    rama: { size: _SizeF, pos?: _Point }
    nodes?: FrameNodeWithSides[]

}
const init: IUseFrameData = {
    rama: { size: _ss(1000, 1000), pos: _p(0, 0) },
    nodes: [new FrameNodeWithSides()]
}
export function useFrameData(initFrameData: IUseFrameData = init) {
    const { rama, nodes } = initFrameData
    const { size, pos = { x: 0, y: 0 } } = rama




    const [frame_rama, frame_control] = useFrameRama_(size, pos)



    return [frame_rama] as const

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
        setRama(prev => ({
            ...prev,
            size: _ss(width, height),
            pos: _p(x, y),
            borders
        }))
    }, [height, x, y, width])

    return [frame_rama, setRama] as const
}

const useFrameNodes_ = (rama: { size: _SizeF, pos: _Point }, ...rest: FrameNodeWithSides[]) => {
    const { size, pos } = rama
    const ramaCoords = _getcoords(size, pos)
    const [nodes, setNodes] = useState<FrameNodeWithSides[]>(rest)

    useEffect(() => {
        const readynodes = rest.filter(n => n.isReady())
        setNodes(readynodes)
    }, [rest.length])

    return [nodes, setNodes]
}

const useFrameImpost_ = (rama: { size: _SizeF, pos: _Point }, ...args: { xy: _Point, direction: 'horisontal' | 'vertical' }[]) => {





}








