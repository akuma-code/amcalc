import React from 'react'
import { _TPoint, _p, _ss } from '../../Helpers/HelpersFns'
import { FrameService } from './FrameService'
import { DrawerService } from '../Drower/DrawerFns'

type StvProps = {
    w: number
    h: number
    anchor: { p: _TPoint, _type: 'rama' | 'impost' }
}
const anchorOffsetRama = 20
const anchorOffsetImpost = 10
const ds = new DrawerService()
//**Stvorka */    
export const Stvorka = (props: StvProps) => {
    const { w, h, anchor: { _type, p: [ax, ay] } } = props;
    const stvStartPoint = _type === 'rama' ? _p(ax + anchorOffsetRama, ay + anchorOffsetRama) : _p(ax + anchorOffsetImpost, ay + anchorOffsetRama)
    const { borders, offsetBorder } = FrameService.getBorderCoordsFromSize(_ss(w, h), 45, stvStartPoint)
    const BSIDES = FrameService.generatePathSteps(borders, offsetBorder)

    return (
        <g fill='whitesmoke' stroke='black'>
            { BSIDES.map(s =>
                <path
                    d={ ds.drawpath(...s.coords) }
                    key={ s.side }
                    className='hover:fill-slate-400'
                    onClick={ () => console.log(...s.coords) }
                />
            ) }
        </g>
    )
}