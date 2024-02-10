import { useEffect, useState } from "react";
import { _Point, _SizeF, _getcoords, _log, _p, _ss } from "../Helpers/HelpersFns";

import { FrameNodeWithSides } from "../Models/FrameComponent/FrameFactory/FrameNodeWithSides";
import { _TCoords } from "../Models/FrameComponent/StvState";



type InitArgsType<T> = T extends [infer F, _Point]
    ? F extends _SizeF
    ? [_SizeF, _Point]
    : F extends _Point
    ? [_Point, _Point]
    : T
    : never

type IUseFrameData = {
    rama: { size: _SizeF, pos: _Point }
    nodes: FrameNodeWithSides[]

}

export function useFrameData(data_rama: IUseFrameData['rama'], ...data_nodes: FrameNodeWithSides[]) {
    const { size, pos } = data_rama

    const frame_rama_control = useFrameRama(size, pos)
    const nodes = useFrameNodes(frame_rama_control[0],
        ...data_nodes,
    )


    return [frame_rama_control, nodes] as const

}

function useFrameRama(size: _SizeF = { width: 1000, height: 1000 }, pos: _Point = { x: 0, y: 0 }) {
    const { width, height } = size
    const { x, y } = pos
    const [frame_rama, setRama] = useState({ size, pos })

    useEffect(() => {

        setRama(prev => ({ ...prev, size: _ss(width, height), pos: _p(x, y) }))



    }, [height, x, y, width])

    return [frame_rama, setRama] as const
}

const useFrameNodes = (rama: { size: _SizeF, pos: _Point }, ...rest: (FrameNodeWithSides | undefined)[]) => {
    const { size, pos } = rama
    const nc = _getcoords(size, pos)
    let node = rest[0]
    if (node === undefined) {
        node = new FrameNodeWithSides()
        node
            .setNodeSize(size)
            .setNodeCoords([...nc])

        _log(node)
        return [node] as const
    } else {
        const nodes = rest.map(n => n?.setNodeSize(_ss(size.width / 2, size.height))

        )
        // console.log('nodes', nodes)
        return [...nodes] as const
    }
}











type FrameNodeArgs = [_SizeF, _Point] | [_Point, _Point]
function useFrameNodes_Bad(...args: [_SizeF, _Point][]) {
    const nodes = args.map((arg) => {
        arg.map(n => {
            if ('width' in n) {
                return { ...n }
            } else return { ...n }
        })
        return [...arg]
    }
    )

}

function _isSizeOrPoint<T extends _SizeF | _Point>(arg: T): arg is T {
    if ('x' in arg) return arg.x !== undefined
    else return arg.width !== undefined
}