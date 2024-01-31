import { _Point, _SizeF } from '../../Helpers/HelpersFns';

interface GlsRectProps {
    posAnchor: _Point;
    size: _SizeF;
    rectProps?: React.SVGProps<SVGRectElement>;
    clickHandler?: () => void
}
export const GlsRect: React.FC<GlsRectProps> = ({ size, posAnchor, rectProps, clickHandler }) => (
    <rect x={ posAnchor.x } y={ posAnchor.y } { ...size } { ...rectProps } onClick={ clickHandler } />
);
