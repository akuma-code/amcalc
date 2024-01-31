import React from 'react';
import { _ID, _Point } from '../../Helpers/HelpersFns';
import { $DrawOffset } from '../../Hooks/useOffset';
import { useFrameContext } from '../../Hooks/useFrameContext';
import { observer } from 'mobx-react-lite';

type ImpostProps = {
    coords?: [_Point, _Point];
    anchor?: _Point;
    ih?: number
    clickHandler?: (id: string) => void;
};
const _id = 'impost1'
export const ImpostVertical = observer(({ clickHandler, coords, ih = $DrawOffset.imp }: ImpostProps) => {
    const { FrameCtx } = useFrameContext()
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
    const isSelected = () => FrameCtx.selected && FrameCtx.selected['id'] === _id
    const color = isSelected() ? 'orange' : 'whitesmoke'

    const onClickFn = () => {
        const impost = {
            id: _id,
            coords,
            impostH: ih
        }
        FrameCtx.selectItem(impost)
        // console.log('Impost coords:', s, e);
        clickHandler && clickHandler(_id);
    };
    return <path d={path} stroke='black' fill={color} onClick={onClickFn} />;
});


ImpostVertical.displayName = 'Vertical Impost'