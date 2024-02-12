import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { DrawCanvas } from "../../../Components/Pages/Router/DrawCanvas";
import { FrameCanvas } from "../../../Components/Pages/Router/DrawerImage/FrameView";
import { _Point, _SizeF, _log, _ss } from "../../../Helpers/HelpersFns";
import { useFrameData } from "../../../Hooks/useFrameData";
import FrameBordersBlock from "../FrameBorderBox";
import { FrameRamaContainer, FrameRamaContainerA } from "../FrameRamaContainer";
import { GlsRect } from "../GlsRect";
import React, { useState } from "react";
import { IconButton } from "../../../Components/UI/IconButton";
import { TbFileSettings } from "react-icons/tb";
import { useToggle } from "../../../Hooks/useToggle";
import { FrameNodeWithSides } from "../FrameFactory/FrameNodeWithSides";

type FrameViewAProps = {
    rama_size: _SizeF
    rama_pos: _Point
}
export const FrameViewA: React.FC<FrameViewAProps> = ({ rama_pos, rama_size }) => {
    const [show, toggle] = useToggle(false)
    const [rama] = useFrameData({
        rama: {
            size: rama_size,
            pos: rama_pos
        },

    })
    function handleClick() {
        toggle.Switch()
        console.log('rama', rama)
    }
    return (
        <React.Fragment>
            <FrameRamaContainerA
                type="preview"
                { ...rama.size }
                { ...rama.pos }
            >
                <GlsRect
                    size={ rama.size }
                    posAnchor={ rama.pos }
                    rectProps={ { fill: 'inherit', fillOpacity: .2 } }
                    clickHandler={ handleClick }
                />
                <FrameBordersBlock
                    size={ rama.size }
                    anchor={ rama.pos }
                />

            </FrameRamaContainerA>



            <OnClickDialog
                toggleShow={ (s) => toggle.Switch() }
                show={ show }
            />
        </React.Fragment>
    )

}
type OnClickDialogProps = {
    show: boolean
    toggleShow: (state: boolean) => void
}
export const OnClickDialog: React.FC<OnClickDialogProps> = ({ toggleShow, show }) => {

    const handleClickOpen = () => {
        toggleShow(true)

    };

    const handleClose = () => {
        toggleShow(false)
    };
    return (
        <React.Fragment>

            <Dialog
                open={ show }
                onClose={ handleClose }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">

                </DialogTitle>
                <DialogContent>
                    <Stack sx={ { [`& .MuiButton-root`]: { my: 1 } } }>

                        <Button variant="contained" color="success"
                            onClick={ handleClose }
                        >Add Vert Impost

                        </Button>
                        <Button variant="contained" color="success"
                            onClick={ handleClose }
                        >Add Hor  Impost

                        </Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose }>Disagree</Button>
                    <Button onClick={ handleClose } autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}