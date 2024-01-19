import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStoresContext } from '../../Hooks/useStoresContext';

type SelectorProps = {
    options: { groupName: string; value: string; }[];
    title?: string;

};
export const _isoOptions: SelectorProps['options'] = [
    { value: 'isolite_A', groupName: 'Isolite гр. А' },
    { value: 'isolite_B', groupName: 'Isolite гр. Б' },
    { value: 'isolite_C', groupName: 'Isolite гр. В' },
    { value: 'isolite_D', groupName: 'Isolite гр. Г' },
    { value: 'isolite_E', groupName: 'Isolite гр. Д' },
    { value: 'isolite_F', groupName: 'Isolite гр. Е' },
    { value: 'isolite_G', groupName: 'Isolite гр. Ж' },
    { value: 'isolite_H', groupName: 'Isolite гр. З' },
    { value: 'isolite_I', groupName: 'Isolite гр. И' },
    { value: 'isolite_J', groupName: 'Isolite гр. К' },
    { value: 'isolite_K', groupName: 'Isolite гр. Л' },
    { value: 'isolite_L', groupName: 'Isolite гр. М' },
];
export const _viteoOptions: SelectorProps['options'] = [
    { groupName: "Viteo гр. E", value: "viteo_E" },
    { groupName: "Viteo гр. 1", value: "viteo_1" },
    { groupName: "Viteo гр. 2", value: "viteo_2" },
    { groupName: "Viteo гр. 3", value: "viteo_3" },
    { groupName: "Viteo гр. 4", value: "viteo_4" },
    { groupName: "Viteo гр. 5", value: "viteo_5" },
    { groupName: "Viteo гр. 6", value: "viteo_6" },
];
export const ZGroupSelector: React.FC<SelectorProps> = ({ options, title }) => {
    const [group, setGroup] = useState("");
    const { ViewConfig } = useStoresContext();

    const handleChange = (e: SelectChangeEvent) => {
        setGroup(prev => e.target.value);
        // getState(e.target.value)
    };

    useEffect(() => {
        if (group === "") return;
        ViewConfig.setActive('zgroup', group);

    }, [ViewConfig, group]);
    return (
        <FormControl variant="filled" sx={ { m: 1, minWidth: 170 } }>
            <InputLabel id="demo-simple-select-filled-label">{ title || "Жалюзи" }</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={ group }
                onChange={ handleChange }
                variant='filled'
            >
                <MenuItem value=""></MenuItem>
                { options.map(o => <MenuItem value={ o.value } key={ o.groupName }>{ o.groupName }</MenuItem>

                ) }

            </Select>
        </FormControl>);
};
