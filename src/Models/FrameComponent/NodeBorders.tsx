import { _Point, _SizeF } from '../../Helpers/HelpersFns';
import { TSide } from '../../Interfaces/Enums';

export interface BordersProps {
    bpaths: { side: TSide; path: string; }[];
    anchor: _Point;
    size: _SizeF;
}
export const NodeBorders: React.FC<BordersProps> = (node) => {

    return (

        <g stroke='black' fill='white' key={ 'rama' }>

            { node.bpaths.map(bs => <path d={ bs.path } key={ bs.side } />
            ) }
        </g>
    );
};
