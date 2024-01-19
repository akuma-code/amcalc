import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStoresContext } from '../../Hooks/useStoresContext';

type SelectorProps = {
    options: { groupName: string; value: string; }[];
    title?: string;

};
export const _isoOptions: SelectorProps['options'] = [
    { value: 'isolite_A', groupName: 'группа А' },
    { value: 'isolite_B', groupName: 'группа Б' },
    { value: 'isolite_C', groupName: 'группа В' },
    { value: 'isolite_D', groupName: 'группа Г' },
    { value: 'isolite_E', groupName: 'группа Д' },
    { value: 'isolite_F', groupName: 'группа Е' },
    { value: 'isolite_G', groupName: 'группа Ж' },
    { value: 'isolite_H', groupName: 'группа З' },
    { value: 'isolite_I', groupName: 'группа И' },
    { value: 'isolite_J', groupName: 'группа К' },
    { value: 'isolite_K', groupName: 'группа Л' },
    { value: 'isolite_L', groupName: 'группа М' },
];
export const _viteoOptions: SelectorProps['options'] = [
    { groupName: "Viteo E", value: "viteo_E" },
    { groupName: "Viteo 1", value: "viteo_1" },
    { groupName: "Viteo 2", value: "viteo_2" },
    { groupName: "Viteo 3", value: "viteo_3" },
    { groupName: "Viteo 4", value: "viteo_4" },
    { groupName: "Viteo 5", value: "viteo_5" },
    { groupName: "Viteo 6", value: "viteo_6" },
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
