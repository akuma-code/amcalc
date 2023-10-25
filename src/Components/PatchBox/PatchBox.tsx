import { Box, Skeleton, SkeletonTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { _ID } from '../../Helpers/HelpersFns'
type Divprops = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type PatchBoxProps = {
    width?: number
    height?: number
    view_mode?: 'div' | 'inline'
    bg_color?: string
    description?: string
    counter?: number
    rows?: number

} & Partial<Divprops>


const PatchBox: React.FC<PatchBoxProps> = (props) => {

    const { bg_color, rows, view_mode, width, height, description, counter, ...restprops } = props
    const rows_count = view_mode === 'div' ? 0 : rows
    return (
        <Box sx={{
            backgroundColor: bg_color || 'transcparent',
            width: width || '100%',
            height: height || '100%',
            minHeight: '5em',
            minWidth: '5em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 1,
            border: '2px solid #00000053',
            borderRadius: 2,

        }}
        >
            {/* <Skeleton animation="wave" sx={{ bgcolor: 'rgb(255, 255, 255)' }} variant={sceleton_variant} />
            <Skeleton animation="wave" sx={{ bgcolor: 'rgb(255, 255, 255)' }} variant={sceleton_variant} />
            <Skeleton animation="wave" sx={{ bgcolor: 'rgb(255, 255, 255)' }} variant={sceleton_variant} />
            <Skeleton animation="wave" sx={{ bgcolor: 'rgb(255, 255, 255)' }} variant={sceleton_variant} /> */}
            {SkeletonSelector(rows_count)}

        </Box>
    )
}

function SkeletonSelector(rows = 0) {
    const Rows = []
    if (!rows) return ([<Skeleton animation="wave" sx={{ bgcolor: 'rgb(255, 255, 255)', height: '100%' }} variant={'rounded'} />])
    let counter = rows
    while (counter > 0) {
        Rows.push(
            <Skeleton animation="wave" sx={{ bgcolor: 'rgb(255, 255, 255)', height: '100%' }} variant={'text'} key={_ID()} />
        )
        counter--
        if (Rows.length === 5) break
    }
    return Rows
}

export default PatchBox