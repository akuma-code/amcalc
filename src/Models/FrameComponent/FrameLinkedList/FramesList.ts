import { _Point, _SizeF } from "../../../Helpers/HelpersFns";
import { _TCoords } from "../../FrameComponent/StvState";
import { DataNode, LinkedList } from "../../LinkedList";

interface ChainFrameData {
    size: _SizeF
    coords: _TCoords
    anchorPos?: _Point
}

export class FrameList extends LinkedList<ChainFrameData>{
    constructor() {
        super()
    }

    add(data: ChainFrameData) {
        let node = new DataNode(data)
        node = { ...node, ...{ watch: this.watchNext } }
        this.insertAtEnd(data)
    }

    watchNext(...keys: (keyof ChainFrameData)[]) {

    }
}