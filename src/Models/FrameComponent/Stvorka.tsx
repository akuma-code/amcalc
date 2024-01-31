import React from 'react';
import FrameBordersBlock from './FrameBorderBox';
import { StvFrame } from './StvState';

export const Stvorka = (props: { stv: StvFrame; isShow: boolean; }) => {
    const { size, anchor } = props.stv;
    // const anchor = drawCoords[0].coords[0]
    return props.isShow ? <FrameBordersBlock anchor={ anchor } size={ size } bh={ 60 } /> : null;
};
