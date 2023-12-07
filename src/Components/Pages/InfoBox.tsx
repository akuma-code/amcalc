import { Box, Divider, Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { TextIconChip } from '../FlexForm/Output/TextIconChipProps';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { observer } from 'mobx-react-lite';
import { LABELS_LIST } from '../../Interfaces/Enums';


export type InfoBoxProps = {
    items?: {
        store_id: string;
        size: number;
    }[]
    active?: string
}

export const InfoBox: React.FC<InfoBoxProps> = observer(() => {
    const { RootStore, ViewConfig } = useStoresContext()
    const SS = ViewConfig.selected_store
    const StSizes = useMemo(() => {
        let s = RootStore.storesSize()
        return [...s] as const
    }, [RootStore])


    return (
        <Box sx={{ width: '90%', m: 'auto' }}

            component={Stack}
            useFlexGap
            rowGap={1}
        >
            <span className='text-center text-xl'> {LABELS_LIST[SS]} </span>
            <Divider variant='fullWidth'>stores size</Divider>
            {
                StSizes.map(s =>
                (s.size > 0 ?
                    <TextIconChip text={s.store_id} icon={s.size.toString()} key={s.store_id} />
                    : null)
                )}
        </Box>
    );
});
InfoBox.displayName = '***Info***'
