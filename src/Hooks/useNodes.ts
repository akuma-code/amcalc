import { useState } from "react"
import { TSide } from "../Interfaces/Enums"
import { _TCoords } from "../Interfaces/FrameState"
import { ISideStateOffset, _CType } from "../Models/FrameComponent/StvState"
import { WithIdProp } from "../Interfaces/CommonTypes"
import { _SizeF, _ss } from "../Helpers/HelpersFns"
import { getSizeFromCoords } from "../Models/Drower/DrawerFns"

export type InitNodeT = {
    id: string
    sidesState: ISideStateOffset
}
export type _NodeType = {
    id: string
    coords?: _TCoords
    size?: _SizeF
}

export const useNodes = <T extends _NodeType>() => {
    const [nodes, setNodes] = useState<T[]>([])

    const checkSameId = (id: string) => !nodes.map(n => n.id).includes(id)
    const add = (node: T) => checkSameId(node.id) && setNodes(prev => [...prev, node])
    const del = (del_id: string) => setNodes(prev => prev.filter(p => p.id !== del_id))
    const search = (id: string) => nodes.filter(n => n.id === id)
    const edit = (id: string, new_data: object) => setNodes(prev => prev.map(n => n.id === id ? { ...n, ...new_data } : n))
    const addSize = (node: T, idx?: number) => {
        if (node.coords) return { ...node, size: getSizeFromCoords(...node.coords) } satisfies { size: _SizeF }
        else return node as T & { size: _SizeF }
        //  setNodes(prev=>prev.map(n=>({...n, size:getSizeFromCoords(...n.coords!)})))
    }
    // setNodes(prev => prev.map(addSize))
    const actions = { add, del, search, edit }

    return [nodes, actions] as const
}

export function createNode(id: string, coords: _TCoords, next?: ISideStateOffset) {
    let stateSide = { bottom: 'rama', left: 'rama', right: 'rama', top: 'rama' }
    if (next) stateSide = { ...stateSide, ...next }
    return { id, coords, stateSide }
}

export const sumSize = <T extends { size: _SizeF }>(...nodes: T[]) => {
    const sumW = nodes.reduce((prev, current) => {
        return prev += current.size.width
    }, 0)
    const sumH = nodes.reduce((prev, current) => {
        return prev += current.size.height
    }, 0)

    return _ss(sumW, sumH)
}