import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DrawCanvas } from "../../../Components/Pages/Router/DrawCanvas";
import { FrameCanvas } from "../../../Components/Pages/Router/DrawerImage/FrameView";
import { _Point, _SizeF, _log, _ss } from "../../../Helpers/HelpersFns";
import { useFrameData } from "../../../Hooks/useFrameData";
import FrameBordersBlock from "../FrameBorderBox";
import { FrameRamaContainer } from "../FrameRamaContainer";
import { GlsRect } from "../GlsRect";
import React, { useState } from "react";
import { IconButton } from "../../../Components/UI/IconButton";
import { TbFileSettings } from "react-icons/tb";

type FrameViewAProps = {
    rama_size: _SizeF
    rama_pos: _Point
}
export const FrameViewA: React.FC<FrameViewAProps> = ({ rama_pos, rama_size }) => {
    const [show, setShow] = useState(false)
    const [[rama],] = useFrameData({
        rama: {
            size: rama_size,
            pos: rama_pos
        }
    })
    function handleClick() {
        setShow(prev => !prev)
        console.log('rama', rama)
    }
    return (
        <React.Fragment>
            <FrameRamaContainer
                { ...rama.size }
                pos={ rama.pos }
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

            </FrameRamaContainer>
            <OnClickDialog
                toggleShow={ (s) => setShow(prev => s) }
                show={ show }
            >

            </OnClickDialog>
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