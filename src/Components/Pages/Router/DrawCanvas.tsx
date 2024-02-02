import React, { PropsWithChildren } from 'react';
import { _SizeF } from '../../../Helpers/HelpersFns';


export const DrawCanvas: React.FC<{ viewBoxSize: _SizeF; canvasSize?: { w: string | number, h: string | number } } & PropsWithChildren> = ({ children, viewBoxSize, canvasSize }) => {



    return <svg xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={ `0 0 ${viewBoxSize.width} ${viewBoxSize.height}` }
        className='bg-gray-300'
        width={ canvasSize?.w || '45rem' }
        height={ canvasSize?.h || '45rem' }
    >
        { children }
    </svg>;
};
