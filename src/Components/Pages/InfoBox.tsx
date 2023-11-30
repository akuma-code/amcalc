import { Box, Divider, Stack } from '@mui/material';
import React from 'react';
import { TextIconChip } from '../FlexForm/Output/TextIconChipProps';
import { useStoresContext } from '../Hooks/useStoresContext';
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
    const { RootStore } = useStoresContext()
    const selectedStore = RootStore.active_store
    const StSizeList = RootStore.storesSize

    const ss = StSizeList.sort((a, b) => b.size - a.size);
    return (
        <Box sx={{ width: '90%', m: 'auto' }}

            component={Stack}
            useFlexGap
            rowGap={1}
        >
            <span className='text-end text-xl'> {LABELS_LIST[selectedStore]} </span>
            <Divider variant='fullWidth'>stores size</Divider>
            {ss.map(s =>
                s.size > 0 ?
                    <TextIconChip text={s.store_id} icon={s.size.toString()} key={s.store_id} />
                    : null
            )}
        </Box>
    );
});

export const StoreSizeInfo: React.FC<Partial<InfoBoxProps>> = () => {
    const { RootStore } = useStoresContext()
    const selectedStore = RootStore.active_store
    const StSizeList = RootStore.storesSize
    return <InfoBox items={StSizeList} active={selectedStore} />
}