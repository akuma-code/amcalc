import { _Point, _SizeF, _p, _ss } from '../../Helpers/HelpersFns';
import { TSide } from '../../Interfaces/Enums';
import { BO, ds } from '../WinFrameModel/Rama/ARama';

interface StvPathProps {
    posAnchor: _Point;
    size: _SizeF;
    params?: React.SVGProps<SVGPathElement>;
    posOffset?: { ox: number; oy: number; };
    connectPoint?: { _type: 'rama' | 'impost', _side: 'left' | 'right' }
}
export const Stv: React.FC<StvPathProps> = ({ posAnchor, size, params, posOffset, connectPoint = { _type: 'rama' } }) => {
    let [ox = 20, oy = 20] = [posOffset?.ox, posOffset?.oy];
    let { width, height } = size
    if (connectPoint._type === 'impost' && connectPoint._side === 'right') {

        width += ox / 4
    }
    if (connectPoint._type === 'impost' && connectPoint._side === 'left') {
        ox = ox / 2
        width -= ox / 2
    }
    const stvOffset = {
        size: _ss(width - ox, height - oy),
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
