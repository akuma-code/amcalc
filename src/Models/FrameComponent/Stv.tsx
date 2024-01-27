import { _Point, _SizeF, _p, _ss } from '../../Helpers/HelpersFns';
import { BO, ds } from '../WinFrameModel/Rama/ARama';

interface StvPathProps {
    posAnchor: _Point;
    size: _SizeF;
    params?: React.SVGProps<SVGPathElement>;
    posOffset?: { ox: number; oy: number; };
}
export const Stv: React.FC<StvPathProps> = ({ posAnchor, size, params, posOffset }) => {
    const [ox = 20, oy = 20] = [posOffset?.ox, posOffset?.oy];

    const stvOffset = {
        size: _ss(size.width - ox, size.height - oy),
        anchor: _p(posAnchor.x + ox / 2, posAnchor.y + oy / 2),
    };

    const stvBorders = BO.newNodeData(stvOffset.size, stvOffset.anchor).pathPoints;

    return (
        <g { ...params }>

            { stvBorders.map(b => <path key={ b.side } d={ ds.drawpath(...b.coords) } { ...params } />
            ) }
        </g>
    );
};
