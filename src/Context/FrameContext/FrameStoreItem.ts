import { _Point, _SizeF } from "../../Helpers/HelpersFns"
import { StvFrame } from "../../Models/FrameComponent/StvState"

class FrameStoreItem {
    id?: string
    type = 'frame_f' as const
    pos: _Point = { x: 0, y: 0 }
    size?: _SizeF
    stvs: StvFrame[] = []
    imps = []
    constructor() {

    }
}