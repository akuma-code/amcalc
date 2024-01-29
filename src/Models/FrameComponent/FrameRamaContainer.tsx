import React, { PropsWithChildren } from 'react';
import { _Point } from '../../Helpers/HelpersFns';

type FCRamaProps = {
    w: number;
    h: number;
    startPos: _Point;
} & PropsWithChildren;

export const FrameRamaContainer: React.FC<FCRamaProps> = ({ w, h, children, startPos }) => {

    const { x: sx, y: sy } = startPos;

    return <svg xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={ `0 0 ${sx + w} ${sy + h}` }
        width={ sx + w }
        height={ sy + h }>
        { children }
    </svg>;
};
