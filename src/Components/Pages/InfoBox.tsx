import { Box, Divider, Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { TextIconChip } from '../FlexForm/Output/TextIconChipProps';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { observer } from 'mobx-react-lite';
import { LABELS_LIST } from '../../Interfaces/Enums';
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector';
import { _log } from '../../Helpers/HelpersFns';


export type InfoBoxProps = {
    items?: {
        store_id: InputsTypeEnum;
        size: number;
    }[]

}

export const InfoBox: React.FC<InfoBoxProps> = ({ items }) => {
    const { ViewConfig } = useStoresContext()
    const SS = ViewConfig.selected_store

    // const StSizes = useMemo(() => {
    //     const sts = RootStore.traverse()

    //     const SS = sts.map(ds => ({ store_id: ds.store_id as InputsTypeEnum, size: ds.storeSize }))
    //     // console.log('SS', SS)
    //     return SS
    // }, [RootStore])


    return (
        <Box sx={{ width: '90%', m: 'auto' }}

            component={Stack}
            useFlexGap
            rowGap={1}
        >
            <span className='text-center text-lg'> {LABELS_LIST[SS]} </span>
            <Divider variant='fullWidth'>stores size</Divider>
            {
                items && items.map(s =>
                (s.size > 0 ?
                    <TextIconChip text={s.store_id} icon={s.size.toString()} key={s.store_id} />
                    : null)
                )}
        </Box>
    );
};
InfoBox.displayName = '***Info***'
