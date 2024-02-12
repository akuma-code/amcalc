import React, { PropsWithChildren } from 'react';
import { _Point, _SizeF } from '../../Helpers/HelpersFns';

type FCRamaProps = {
    width: number;
    height: number;
    pos: _Point;
} & PropsWithChildren;

export const FrameRamaContainer: React.FC<FCRamaProps> = ({ width: w, height: h, children, pos: startPos }) => {

    const { x: sx, y: sy } = startPos;

    return <svg xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={ `0 0 ${sx + w} ${sy + h}` }
        width={ sx + w }
        height={ sy + h }>
        { children }
    </svg>;
};

type FCAProps = {
    type?: 'preview' | 'full'
    previewSize?: number
} & _SizeF & _Point & PropsWithChildren
export const FrameRamaContainerA: React.FC<FCAProps> = ({ height, width, x, y, children, type = 'full', previewSize = 500 }) => {
    const ST = {
        preview: { width: previewSize, height: previewSize },
        full: { width: width + x, height: height + y },
    }

    return <svg xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={ `0 0 ${width + x} ${height + y}` }
        { ...ST[type] }
        preserveAspectRatio='xMinYMin meet'
    >
        { children }
    </svg>;
}