import React from 'react';
import { _Point } from '../../Helpers/HelpersFns';
import { $DrawOffset } from '../../Hooks/useOffset';

type ImpostProps = {
    coords: [_Point, _Point];
    anchor?: _Point;

    clickHandler?: () => void;
};
export const ImpostVertical = ({ coords, anchor, clickHandler }: ImpostProps) => {

    const [s, e] = coords;
    const wImp = $DrawOffset.imp * 2;
    const rama = $DrawOffset.rama;
    const ly = Math.abs(s.y - e.y) - rama * 2;



    const path = [
        `M${s.x - wImp / 2} ${s.y + rama - 5}`,
        `l${0} ${ly + 5}`,
        `l${wImp} ${0}`,
        `l${0} ${-ly}`,
        `l${-wImp} ${0}`,
        `Z`
    ].join(" ");


    const onClickFn = () => {
        console.log('Impost path:', path);
        clickHandler && clickHandler();
    };
    return <path d={ path } stroke='black' fill='#f87e0c' onClick={ onClickFn } />;
};
