import { _ID, _SizeF } from "../../../Helpers/HelpersFns";
import { $DrawPosOffset } from "../../../Hooks/useOffset";
import { TSide } from "../../../Interfaces/Enums";
import { ISideStateOffset, _CType, _TCoords } from "../StvState";


export class FrameNodeWithSides {
    id: string = _ID();
    isShow: boolean = false;
    sides: Record<TSide, _CType>;
    offset: Record<TSide, number> = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    };
    nsize?: _SizeF;
    coords?: _TCoords;
    constructor(next?: ISideStateOffset) {
        this.sides = {
            bottom: "rama" as const,
            left: "rama" as const,
            right: "rama" as const,
            top: "rama" as const
        };

        if (next) this.setSides(next);

    }
    setSides(next: ISideStateOffset) {
        this.sides = { ...this.sides, ...next };

        return this.setOffset();
    }

    setOffset() {

        for (let side in this.sides) {
            let s = side as TSide;
            const sideState = this.sides[s];

            this.offset = { ...this.offset, [s]: $DrawPosOffset[sideState] };
        }
        return this;
    }
    setNodeSize(nodesize: _SizeF) {
        this.nsize = nodesize;
        return this;
    }

    setNodeCoords(coords: _TCoords) {
        this.coords = coords;
        return this;
    }
    resize(new_size: Partial<_SizeF>) {
        if (!this.nsize) return
        this.nsize = { ...this.nsize, ...new_size }
    }


}


export const nodesPreset = {
    f: [new FrameNodeWithSides()],
    ff: [
        new FrameNodeWithSides({ right: 'imp' }),
        new FrameNodeWithSides({ left: 'imp' })
    ],
    fff: [
        new FrameNodeWithSides({ right: 'imp' }),
        new FrameNodeWithSides({ left: 'imp', right: 'imp' }),
        new FrameNodeWithSides({ left: 'imp' })
    ],
}