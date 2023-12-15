import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';


type CustomTooltipProps = {
    open?: boolean
    viewState?: boolean
} & TooltipProps
export const CustomTT = styled(({ className, sx, ...props }: CustomTooltipProps) => {
    const { viewState } = props
    const bgcolor = viewState ? 'red' : 'transparent'

    return <Tooltip {...props} classes={{ popper: className }} sx={{ ...sx, bgcolor }} placement='left-end' />
})
    ({
        [`& .${tooltipClasses.tooltip}`]: {
            minWidth: 100,
            textAlign: 'center',
            fontSize: 20,

        },
    });

const NoMaxWidthTooltip = styled(({ className, ...props }: CustomTooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 'none',
    },
});

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

export default function VariableWidth() {
    return (
        <div>
            <Tooltip title={longText}>
                <Button sx={{ m: 1 }}>Default Width [300px]</Button>
            </Tooltip>
            <CustomTT title={longText}>
                <Button sx={{ m: 1 }}>Custom Width [500px]</Button>
            </CustomTT>
            <NoMaxWidthTooltip title={longText}>
                <Button sx={{ m: 1 }}>No wrapping</Button>
            </NoMaxWidthTooltip>
        </div>
    );
}