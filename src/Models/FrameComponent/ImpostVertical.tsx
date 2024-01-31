import React from 'react';
import { _Point } from '../../Helpers/HelpersFns';
import { $DrawOffset } from '../../Hooks/useOffset';
import { useFrameContext } from '../../Hooks/useFrameContext';

type ImpostProps = {
    coords?: [_Point, _Point];
    anchor?: _Point;
    ih?: number
    clickHandler?: () => void;
};
export const ImpostVertical = ({ clickHandler, coords, ih = $DrawOffset.imp }: ImpostProps) => {
    const context = useFrameContext()
    const [s, e] = coords!;
    const wImp = ih * 2;
    const offsetHRama = $DrawOffset.rama;
    const ly = Math.abs(s.y - e.y) - offsetHRama * 2;



    const path = [
        `M${s.x - wImp / 2} ${s.y + offsetHRama - 5}`,
        `l${0} ${ly + 5}`,
        `l${wImp} ${0}`,
        `l${0} ${-ly}`,
        `l${-wImp} ${0}`,
        `Z`
    ].join(" ");


    const onClickFn = () => {
        console.log('Impost coords:', s, e);
        clickHandler && clickHandler();
    };
    return <path d={ path } stroke='black' fill='whitesmoke' onClick={ onClickFn } />;
};
