
import { _Point, _SizeF, _p, _ss } from '../../Helpers/HelpersFns';
import { TSide, TSides } from '../../Interfaces/Enums';
import { NodeFactory } from '../FrameFactory';
import { ds } from '../WinFrameModel/Rama/ARama';
export type _TOverlap = { side: TSide, o: number }
interface StvPathProps {
    posAnchor: _Point;
    size: _SizeF;
    g_props?: React.SVGProps<SVGPathElement>;
    posOffset?: { ox: number; oy: number; };
    // sizeOffset?: { wo: number, ho: number }
    overlap?: _TOverlap
}
const BO = new NodeFactory()
export const Stv: React.FC<StvPathProps> = ({ posAnchor, size, g_props, posOffset, overlap }) => {
    let [ox = 0, oy = 0] = [posOffset?.ox, posOffset?.oy];
    let { width, height } = size
    const { offset } = BO
    const getOffset = () => {

    }
    let stvOffset = {
        size: _ss(width - ox * 2, height - 2 * oy),
        anchor: _p(posAnchor.x + ox, posAnchor.y + oy),
    };
    let _anchor = stvOffset.anchor
    let _size = stvOffset.size
    console.log('offset', offset)
    if (overlap) {

        // const { o } = overlap
        // switch (overlap.side) {
        //     case 'top': {

        //         _anchor.y -= o
        //         _size.height += o


        //         break
        //     }
        //     case 'right': {

        //         _size.width += o
        //         break
        //     }
        //     case 'bottom': {
        //         _anchor.y += o
        //         _size.height += o
        //         break
        //     }
        //     case 'left': {
        //         _anchor.x -= o
        //         _size.width += o
        //         break
        //     }
        // }

        // // stvOffset.size = { ...stvOffset.size, ..._ss(stvOffset.size.width + _O, stvOffset.size.height + _O),  }
        // stvOffset = {
        //     ...stvOffset,
        //     ..._anchor, ..._size
        //     // anchor: { x: stvOffset.anchor.x + posOverlap.ox, y: stvOffset.anchor.y + posOverlap.oy },
        //     // size: _ss(stvOffset.size.width + sizeOffset.wo, stvOffset.size.height + sizeOffset.ho),
        // }
    }


    const { pathPoints, pathCoords, } = BO.newPathCoordsMap(_size, _anchor);

    return (
        <g { ...g_props } >

            { pathPoints.map(b => <path key={ b.side } d={ ds.drawpath(...b.coords) } />
            ) }
        </g>
    );
};
