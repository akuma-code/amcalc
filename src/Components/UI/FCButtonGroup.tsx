import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { LABELS_LIST } from '../../Interfaces/Enums';
import { observer } from 'mobx-react-lite';
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector';

export const FCButtonsGroup = observer(() => {

    const { ViewConfig: V } = useStoresContext()

    return (
        <ButtonGroup size='small'
            sx={{ maxWidth: 'fit-content' }}
            variant="contained"
            aria-label="Disabled elevation buttons"
        >
            <Button color='success'
                onClick={() => V.selectForm(InputsTypeEnum.size_full)}>
                {LABELS_LIST['size_full']}
            </Button>
            <Button disabled variant='text' sx={{ fontSize: 10, fontStyle: 'italic' }}>{LABELS_LIST[V.active.store]}</Button>
            <Button color='info'
                onClick={() => V.selectForm(InputsTypeEnum.offset5)}>
                {LABELS_LIST['offset5']}
            </Button>
        </ButtonGroup>
    );
})

FCButtonsGroup.displayName = '*** Form Control ButtonGroup***'