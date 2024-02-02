import React from 'react';
import { _ID, _Point, _log } from '../../Helpers/HelpersFns';
import { $DrawOffset } from '../../Hooks/useOffset';
import { useFrameContext } from '../../Hooks/useFrameContext';
import { observer } from 'mobx-react-lite';
import { ImpostFrame } from "./ImpostFrame";

type ImpostProps = {
    coords?: [_Point, _Point];
    anchor?: _Point;
    ih?: number
    clickHandler?: (id: string) => void;
    impFrame: ImpostFrame
};
const _id = 'impost1'
export const ImpostVertical = observer(({ clickHandler, coords, ih = $DrawOffset.imp, impFrame }: ImpostProps) => {
    const { FrameCtx } = useFrameContext()
    const [s, e] = coords!;
    const wImp = ih * 2;
    const offsetHRama = $DrawOffset.rama;
    const ly = Math.abs(s.y - e.y) - offsetHRama * 2;



    const p1 = impFrame?.drawPath()
    const isSelected = () => FrameCtx.selected && FrameCtx.selected['id'] === _id
    const color = isSelected() ? 'orange' : 'whitesmoke'

    const onClickFn = () => {

        const fr = impFrame
        if (!fr) return
        FrameCtx.selectItem(fr)
        // _log(fr.drawPath())
        clickHandler && clickHandler(fr.id);
    };
    return <path d={ p1! } stroke='black' fill={ color } onClick={ onClickFn } />;
});


ImpostVertical.displayName = 'Vertical Impost'



// const path = [
//     `M${s.x - wImp / 2} ${s.y + offsetHRama - 5}`,
//     `l${0} ${ly + 5}`,
//     `l${wImp} ${0}`,
//     `l${0} ${-ly}`,
//     `l${-wImp} ${0}`,
//     `Z`
// ].join(" ");