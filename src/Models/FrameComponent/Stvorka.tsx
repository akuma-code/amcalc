import React, { useState } from 'react';
import FrameBordersBlock from './FrameBorderBox';
import { StvFrame } from './StvState';
import { GlsRect } from './GlsRect';
import { useFrameContext } from '../../Hooks/useFrameContext';
import { _log } from '../../Helpers/HelpersFns';

export const Stvorka = (props: { stv: StvFrame; isShow: boolean }) => {
    const frame = useFrameContext()
    const { size, anchor } = props.stv;

    if (!props.isShow) return null
    // const anchor = drawCoords[0].coords[0]
    return (
        <>
            <FrameBordersBlock anchor={ anchor } size={ size } bh={ 60 } />

            {/* <GlsRect size={ size } posAnchor={ anchor } rectProps={ { fillOpacity: 0 } } /> */ }
        </>
    )
}
