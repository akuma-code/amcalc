import { _ID, _Point, _SizeF, _getcoords } from "../../../Helpers/HelpersFns";
import { $DrawPosOffset } from "../../../Hooks/useOffset";
import { TSide } from "../../../Interfaces/Enums";
import { ISideStateOffset, _CType, _TCoords } from "../StvState";


export class FrameNodeWithSides {
    _id: string
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
        this._id = _ID();
        this.sides = {
            bottom: "rama" as const,
            left: "rama" as const,
            right: "rama" as const,
            top: "rama" as const
        };

        this.setOffset()
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
    isReady(): this is { coords: _TCoords, nsize: _SizeF } {
        const cond = this.coords !== undefined
            && this.nsize !== undefined
            && this.sides !== undefined
        return cond;
    }

}


export class BordersBlock {
    _id: string
    sides: Record<TSide, _CType>;
    stv_offset: Record<TSide, number> = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    };
    constructor(next?: ISideStateOffset) {
        this._id = _ID();
        this.sides = {
            bottom: "rama" as const,
            left: "rama" as const,
            right: "rama" as const,
            top: "rama" as const
        };

        this.setOffset()
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
            this.stv_offset = { ...this.stv_offset, [s]: $DrawPosOffset[sideState] };
        }
        return this;
    }
}

export class BaseNode {
    border: BordersBlock
    size: _SizeF
    coords!: _TCoords
    constructor(size: _SizeF, pos: _Point = { x: 0, y: 0 }) {
        this.border = new BordersBlock()
        this.size = size
        this.init(size, pos)


    }
    init(size: _SizeF, pos: _Point = { x: 0, y: 0 }) {
        const c = _getcoords(size, pos)
        this.setNodeSize(size)
            .setNodeCoords(c)
        return this
    }

    setNodeSize(nodesize: _SizeF) {
        this.size = nodesize;
        return this;
    }
    setNodeCoords(coords: _TCoords) {
        this.coords = coords;
        return this;
    }

    update(size: _SizeF, pos: _Point = { x: 0, y: 0 }) {
        const c = _getcoords(size, pos)
        this.setNodeSize(size)
        this.setNodeCoords(c)
        return this
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