import { _Point, _SizeF } from '../../Helpers/HelpersFns';

interface GlsRectProps {
    posAnchor: _Point;
    size: _SizeF;
    params?: React.SVGProps<SVGRectElement>;
    clickHandler?: () => void
}
export const GlsRect: React.FC<GlsRectProps> = ({ size, posAnchor, params, clickHandler }) => (
    <rect x={ posAnchor.x } y={ posAnchor.y } { ...size } { ...params } onClick={ clickHandler } />
);
