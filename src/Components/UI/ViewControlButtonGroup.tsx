import React, { FC } from 'react';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LogoDevSharpIcon from '@mui/icons-material/LogoDevSharp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { Button, ButtonGroup, SvgIconTypeMap, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { observer } from 'mobx-react-lite';
import { IVisibileItems } from '../../Context/ThemeView';
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { LABELS_LIST } from '../../Interfaces/Enums';



type BtnGroupProps = {

};

type BtnItem = {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    name: string,
    view: keyof IVisibileItems,
}

const toggleBtns: BtnItem[] = [
    { icon: LogoDevSharpIcon, name: 'devtools', view: 'devtools', },
    { icon: AlignVerticalTopIcon, name: 'offset', view: 'showOffset5', },
    { icon: AspectRatioIcon, name: 'otkosi', view: 'showOtkosi', },
    { icon: ReceiptOutlinedIcon, name: 'simple', view: 'showSimple', },
    { icon: ReceiptIcon, name: 'skf', view: 'showSkf', },
]
const outView = {
    [InputsTypeEnum.size_full]: ['devtools', 'skf', 'simple', 'otkosi'],
    [InputsTypeEnum.offset5]: ['devtools', 'offset'],
    [InputsTypeEnum.sill]: ['devtools']
}

export const ViewControlButtonGroup: FC<BtnGroupProps> = observer(() => {
    const { ViewConfig, RootStore } = useStoresContext();

    const handleView = (
        e: React.MouseEvent<HTMLElement>,
        value: keyof IVisibileItems) => {
        ViewConfig.toggleVisible(value)
    }
    const isSelected = (item: keyof IVisibileItems) => ViewConfig.visible[item]
    return (
        <ButtonGroup
            sx={{ alignSelf: 'end', display: 'flex', maxWidth: 'fit-content' }}
            orientation='horizontal'
            variant="contained">
            <Button sx={{ display: 'flex', gap: 1, fontFamily: 'Fira Code' }}
                onClick={() => RootStore.clearStore(ViewConfig.selected_output)}
            >
                [{LABELS_LIST[ViewConfig.selected_output]}] Очистить
                <DeleteOutlinedIcon color='warning' />
            </Button>
            <ToggleButtonGroup
                value={ViewConfig.visible}
                exclusive
                onChange={handleView}
            >
                {
                    toggleBtns.map(btn =>
                        outView[ViewConfig.active.output].includes(btn.name) &&

                        <ToggleButton
                            key={btn.name}
                            value={btn.view}
                            selected={isSelected(btn.view)}
                            sx={{ display: 'flex', gap: 1, fontFamily: 'Fira Code' }}
                        >
                            {btn.name}
                            <btn.icon />
                        </ToggleButton>)
                }

            </ToggleButtonGroup>




        </ButtonGroup>);
});

ViewControlButtonGroup.displayName = "*** OutputControl ***"